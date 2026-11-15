#!/usr/bin/env bash
# Instala o servidor online do slime numa máquina Ubuntu (ex.: Oracle Cloud "Always Free").
# Uso:   sudo bash setup.sh
# Opcional: sudo DOMINIO=meujogo.duckdns.org bash setup.sh   (se tiver um domínio próprio)
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then echo "Rode com sudo:  sudo bash setup.sh"; exit 1; fi
DIR="$(cd "$(dirname "$0")" && pwd)"
APP=/opt/slime-servidor
export DEBIAN_FRONTEND=noninteractive
# no primeiro boot o Ubuntu ainda pode estar atualizando sozinho: espera em vez de falhar
echo 'DPkg::Lock::Timeout "900";' > /etc/apt/apt.conf.d/99slime-lock

echo "==> Atualizando pacotes"
apt-get update -y
apt-get install -y curl ca-certificates gnupg debian-keyring debian-archive-keyring apt-transport-https iptables-persistent

echo "==> Instalando Node.js 20"
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 18 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "==> Copiando o servidor para $APP"
id slime >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin slime
mkdir -p "$APP"
cp "$DIR/server.js" "$DIR/package.json" "$APP/"
cd "$APP" && npm install --omit=dev --no-audit --no-fund
chown -R slime:slime "$APP"

echo "==> Criando o serviço (liga sozinho quando a máquina reinicia)"
cat >/etc/systemd/system/slime-servidor.service <<EOF
[Unit]
Description=Servidor online - Nao sou um Slime Malvado
After=network.target

[Service]
User=slime
WorkingDirectory=$APP
Environment=PORT=8080
Environment=MAX_PLAYERS=10
ExecStart=/usr/bin/node $APP/server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable --now slime-servidor
systemctl restart slime-servidor

echo "==> Liberando as portas 80 e 443 no firewall da máquina"
for P in 80 443; do
  if ! iptables -C INPUT -p tcp -m state --state NEW --dport $P -j ACCEPT 2>/dev/null; then
    N="$(iptables -L INPUT --line-numbers -n | awk '/REJECT/{print $1; exit}')"   # antes da regra que bloqueia tudo
    if [ -n "$N" ]; then iptables -I INPUT "$N" -p tcp -m state --state NEW --dport $P -j ACCEPT
    else iptables -A INPUT -p tcp -m state --state NEW --dport $P -j ACCEPT; fi
  fi
done
netfilter-persistent save

echo "==> Endereço com https (exigido pelo GitHub Pages)"
IP="$(curl -fsS https://api.ipify.org || curl -fsS https://ifconfig.me)"
DOMINIO="${DOMINIO:-$(echo "$IP" | tr . -).sslip.io}"

echo "==> Instalando o Caddy (certificado https automático)"
if ! command -v caddy >/dev/null; then
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -y && apt-get install -y caddy
fi
cat >/etc/caddy/Caddyfile <<EOF
$DOMINIO {
    reverse_proxy localhost:8080
}
EOF
systemctl restart caddy

echo
echo "=============================================================="
echo " Pronto! Endereço do servidor:   wss://$DOMINIO"
echo " Teste no navegador:             https://$DOMINIO/status"
echo " (o certificado pode levar 1 minuto para sair na primeira vez)"
echo " Lembrete: libere as portas 80 e 443 na Security List da Oracle."
echo "=============================================================="
