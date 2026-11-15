# Não sou um Slime Malvado

Jogo no navegador: você renasce como um slime e cada monstro derrotado é devorado e vira uma forma nova e uma invocação. Explore um continente cercado de mar, com a cidade dos slimes no centro da selva tropical, e enfrente os chefes de cada região até o Dragão do Vendaval, nível 150.

**Jogar:** https://guigatoledo.github.io/nao-sou-um-slime-malvado/

Funciona no computador e no celular. Na tela inicial, escolha **Jogar no: Computador** ou **Jogar no: Celular**. No celular aparecem um joystick e botões na tela.

## Personagens

A tela inicial tem 3 vagas de personagem. Em cada uma você escolhe o nome e a cor do slime. Cada personagem tem o próprio progresso, e o botão **Excluir** apaga um personagem quando você quiser.

## Jogar online com amigos (até 10)

1. Todos abrem o link e escolhem **Jogar online**.
2. Quem entrar primeiro vira o servidor: o mundo dele é o mundo de todos.
3. Os outros entram no mundo do servidor e mantêm o próprio nível, as formas e as invocações.
4. Se o servidor sair, os outros escolhem **Jogar online** de novo, e o primeiro a entrar vira o novo servidor. Com o servidor dedicado (abaixo), isso não é preciso.

Para um grupo separado, coloque `#nomedasala` no fim do link. A conexão é direta entre os navegadores (WebRTC, via [PeerJS](https://peerjs.com/)) e pode falhar em redes muito fechadas.

## Servidor dedicado na Oracle Cloud (até 10 por sala)

Com o servidor dedicado, ninguém precisa "ser o servidor":
- Todo mundo se conecta à mesma máquina, que fica ligada o tempo todo.
- Se quem hospeda o mundo sair, o próximo da sala assume sozinho, sem derrubar ninguém.
- Funciona melhor em redes fechadas do que a conexão direta.

A pasta `server/` tem o programa (`server.js`) e um instalador (`setup.sh`).

**1. Criar a máquina (grátis, plano Always Free)**
1. Crie uma conta em https://www.oracle.com/cloud/free/ (ela pede cartão só para confirmar; o plano Always Free não cobra).
2. No painel, vá em **Compute → Instances → Create instance**.
3. Em **Image**, escolha **Ubuntu 22.04** (ou 24.04).
4. Em **Shape**, escolha uma marcada como **Always Free** (VM.Standard.E2.1.Micro ou Ampere A1).
5. Em **Add SSH keys**, clique em **Save private key** e guarde o arquivo.
6. Clique em **Create** e anote o **Public IP address**.

**2. Abrir as portas 80 e 443**
1. Na página da instância, clique na **Subnet** e depois na **Security List** (a "Default Security List").
2. Clique em **Add Ingress Rules** e crie duas regras, com Source CIDR `0.0.0.0/0`, IP Protocol TCP e Destination Port `80` e depois `443`.

**3. Instalar o servidor**
Entre na máquina pelo terminal (no Windows, o PowerShell já tem `ssh`):
```
ssh -i caminho/da/chave.key ubuntu@SEU_IP
```
Depois rode:
```
git clone https://github.com/GuigaToledo/nao-sou-um-slime-malvado
sudo bash nao-sou-um-slime-malvado/server/setup.sh
```
- No fim, o script mostra o endereço, por exemplo `wss://123-45-67-89.sslip.io`.
- O certificado https é automático, pelo Caddy com o sslip.io, então não precisa comprar domínio.
- Abra `https://123-45-67-89.sslip.io/status` no navegador para conferir se o servidor está no ar.

**4. Ligar o jogo ao servidor**
- **Para testar antes:** abra o jogo com `?servidor=` no link, por exemplo `https://guigatoledo.github.io/nao-sou-um-slime-malvado/?servidor=wss://123-45-67-89.sslip.io`.
- **Para valer para todos:** coloque o endereço em `SERVER_DEFAULT`, no `index.html`, e publique.

**Comandos úteis na máquina**
- Ver o que está acontecendo: `sudo journalctl -u slime-servidor -f`
- Atualizar: `cd nao-sou-um-slime-malvado && git pull && sudo bash server/setup.sh`
- Mudar o limite por sala: edite `MAX_PLAYERS` em `/etc/systemd/system/slime-servidor.service` e rode `sudo systemctl daemon-reload && sudo systemctl restart slime-servidor`.

## Controles

O golpe de perto e a magia da forma são **automáticos**. Na forma de Slime, a magia é sorteada entre todas as que você já aprendeu.

| Ação | Teclado | Controle Xbox | Celular |
|---|---|---|---|
| Mover | WASD / setas | Analógico / direcional | Joystick |
| Agir: interagir, quebrar paredes rachadas | Espaço ou F | A | AGIR |
| Dash (segure para correr) | Shift | B | DASH |
| Magia de cura | H | Y | CURA |
| Trocar visual (e poder) | Q / E | LB / LT | setas da roda |
| Invocação 1 · Invocação 2 | C · Z | RT · RB | setas das rodas |
| Habilidades e visuais | K ou Tab | Select | ÁRVORE |
| Menu, mapa do mundo e salvar | Esc ou P | Start | MENU |

## O mundo

- **Cavernas dos insetos:** Gruta do Despertar (morcegos), Túneis Úmidos (lagartas), Ninho das Aranhas (com a Rainha Aranha) e Colmeia dos Ankhegs.
- **Santuário do Vendaval:** o caminho para o mundo aberto fica livre. Com Nível 5, você pode fazer amizade com o dragão: ele vira sua invocação e também uma forma (voa e lança raios, tornados e vendavais).
- **Mundo aberto:** cada monstro vive no seu habitat, e há insetos espalhados por todo o mapa.

  | Região | Monstros |
  |---|---|
  | Floresta | goblins |
  | Penhascos do Trovão | lobos-chifre |
  | Campos Vulcânicos | cães infernais |
  | Tundra Gelada | lobos invernais |
  | Brejo | basiliscos |
  | Colinas | ogros e gigantes |
  | Labirinto | minotauro |
  | Bosque Sombrio | lobos sombrios |
  | Terras dos orcs | orcs |

- **Renascimento:** os monstros renascem 1 minuto depois de derrotados.
- **Elite:** cerca de 1 em cada 10 monstros é Elite. Fique fora da área vermelha no chão quando eles atacam.

## Invocações

- Cada invocação tem o próprio nível, mostrado na roda de invocação, e fica mais forte ao subir.
- O XP é dividido entre você e a invocação ativa, mesmo se ela estiver caída. A invocação nunca passa do seu nível.
- Ela desvia de obstáculos para voltar até você. Se ficar travada por mais de 5 segundos, se teletransporta.

## Visuais do slime

Os baús espalhados pelo mapa (nas cavernas e no mundo aberto) e os chefes dão visuais para o slime: chapéu de festa, asas de anjo, óculos escuros, coroa de rei e mais, 24 no total. Para vestir, abra Select (ou K) e vá na aba **Visual**. No controle, troque de aba com LB/RB.

## Gráficos

Em **Gráficos: Automático**, o jogo usa a resolução da sua tela (até 3 vezes mais pixels) e baixa a qualidade sozinho se o computador não aguentar. Também dá para escolher **Ultra**, **Alto** ou **Baixo (PC fraco)**.

## Salvamento

O jogo salva a cada 5 minutos, ao fechar ou trocar de aba, e em **Salvar agora** no menu. O progresso fica no navegador de cada jogador.

## Novidades da v3.8.0 (reconstrução e batida eletrônica)

- **Reconstrução automática:** quando a invasão acaba (ou a cidade cai), os **guardas pegam martelos** e reconstroem sozinhos a muralha e as torres, **de graça**. Cada um martela o pedaço mais estragado que ninguém está consertando, com faíscas, som de martelo e uma barra de progresso. Sem quartel, dois slimes da cidade fazem o serviço. A velocidade se ajusta ao estrago para **sempre terminar antes da próxima invasão** (no pior caso, cerca de 7,5 minutos; com o quartel no 10, uns 2 minutos).
- O menu do cristal mostra o andamento da reconstrução no lugar do antigo conserto pago.
- **Música com base eletrônica de novo:** bumbo, chimbal, palmas, caixa e baixo de sintetizador em cada estilo, pad sintetizado, subidas de ruído nas viradas e o efeito "sidechain" (a música respira junto com o bumbo). Os instrumentos medievais continuam por cima, com as melodias.

## Novidades da v3.7.0 (som medieval, skins novas e rebalanceamento)

- **Música nova:** os mesmos estilos eletrônicos (Minimal, Dub, House, Tech House, Acid, Techno, Drum and Bass, Jungle, Breakbeat…) agora tocados **como se fossem feitos na Idade Média**: alaúde, harpa, flauta doce, charamela, rabeca, sanfona de roda, sinos, tabor e pandeiro, com melodias em modos medievais, reverberação de salão e compressor para um som mais cheio.
- **Sons novos:** cada família de monstros tem voz própria (grunhido de orc, uivo de lobo, rugido de dragão, chocalho de esqueleto…) para atacar, se ferir e morrer, e **todo ataque e toda magia** (sua, das invocações e dos monstros) tem som, mais alto quando está perto e do lado em que acontece.
- **34 skins novas**, uma para cada monstro, cada uma com uma **magia nova** (Eco Sônico, Chuva de Lanças, Casulo, Nevasca, Chuva de Meteoros, Olho da Tempestade, Erupção…). Saem ao devorar um **Elite** daquele monstro, o **chefe gigante** da região dele ou o próprio chefe. As skins antigas continuam. A tela de visuais agora rola.
- **O slime passa por cima das pedras.**
- **Defesa da cidade:** na invasão, os monstros moradores ficam **em volta da muralha, por fora**, e procuram alvos como as invocações. Só os **slimes guerreiros** vão para perto do cristal.
- **Menos cristais** espalhados pelo mapa.
- **Rebalanceamento por simulação** (pensando em 2 invocações + skin): monstros comuns mais resistentes, cada chefe calibrado para lutas de cerca de 45 s a 1 min, chefes com **tenacidade** (prender e paralisar dura menos neles), força de cada skin e de cada invocação ajustada e invasões recalibradas.
- **Mais leve em celulares e PCs lentos:** se o jogo ficar lento, primeiro desliga efeitos e depois baixa a resolução aos poucos (até 60%); reverberação mais leve nesses aparelhos.

## Novidades da v3.6.0 (continente novo)

- **Mapa novo, bem maior** (720 × 720 blocos, quase o dobro do anterior), no formato de um **continente cercado de mar**, com praias em volta.
- **A cidade fica no centro, na selva tropical.** Em volta dela:
  - **Noroeste:** neve (Tundra Gelada, Geleira do Dragão Glacial e Picos Gelados, com os Guerreiros de Gelo).
  - **Nordeste:** o deserto dos orcs (Acampamento Xamã, Planícies Orc, o **Labirinto do Minotauro** em ruínas e a **Fortaleza do Lorde Orc**).
  - **Oeste:** o **Lago do Vendaval**. O dragão fica na **ilha no meio do lago**, que só se alcança por uma passarela de terra que sai da Floresta Assombrada (esqueletos, zumbis, cavaleiros negros e magos sombrios).
  - **Leste:** savana dos Ankhegs, Colinas dos Ogros, Penhascos do Trovão e as Montanhas do Dragão de Pedra.
  - **Sudeste:** Bosque Sombrio e o Abismo do Dragão Negro.
  - **Sudoeste:** brejos (Basiliscos e Dragão Verde), o Bosque Carmesim dos druidas e a Caldeira Infernal.
  - **Sul:** as **terras de fogo dos dragões**, um deserto de pedra com rios de lava: Campos Vulcânicos, Picos do Dragão Vermelho e o Covil do Dragão Ancião.
- **Sem cavernas por enquanto.** As criaturas fortes que moravam nelas agora vivem nas regiões mais distantes da cidade.
- **Rios rasos** cortam o mapa e dá para atravessá-los andando.
- **Cristais e cogumelos brilhantes** iluminam a noite: cristais na neve, no deserto e nas montanhas, e cogumelos nas matas e nos brejos.
- O mapa do mundo mostra o nome de cada região já visitada.
- Como os lugares mudaram, **os baús, o mapa descoberto e as missões do Ancião recomeçam**. Nível, formas, habilidades e a cidade continuam.

## Novidades da v3.5.0 (sem internet e reconexão)

- **Jogar sozinho sem internet:** depois de abrir o jogo uma vez com internet, o navegador guarda uma cópia. Sem internet, o jogo abre e roda normalmente no modo sozinho. Com internet, ele sempre baixa a versão mais nova.
- **Dá para instalar no celular:** no Chrome, menu ⋮ → **Adicionar à tela inicial** (ou **Instalar app**). O jogo ganha um ícone e abre em tela cheia, deitado.
- **Caiu a internet jogando online?** O jogo **não para**: continua só com você no mesmo mundo, com os monstros que já estavam lá. Quando a internet volta, ele **reconecta sozinho** à sala, sem precisar voltar ao menu. O progresso do personagem é salvo antes de reconectar.
- Se for você quem hospeda a sala, o seu mundo continua normalmente e a sala abre de novo para os amigos quando a internet volta.

## Novidades da v3.4.0 (missões do Ancião)

- **O Ancião agora dá missões de chefe**, do mais fraco ao mais forte: começa pela **Rainha Aranha (nível 12)** e vai até o **Dragão do Vendaval (nível 150)**, passando pelo chefe de cada área, o Lorde Orc e o Dragão Ancião. São 23 missões.
- **Uma missão de cada vez:** fale com o Ancião para pegar a missão, derrote o chefe e **volte para falar com ele** para receber a recompensa (XP e ouro para a cidade). A próxima missão só aparece quando você fala com ele de novo.
- **Seta da missão:** com uma missão ativa, uma **seta amarela na tela** aponta para o chefe, com a distância em metros. Quando o chefe aparece na tela, a seta fica pulando em cima dele. Depois de vencer, a seta aponta de volta para o Ancião. O alvo também aparece no minimapa.
- Sobre o Ancião, **“!”** quer dizer que há missão nova e **“?”** que há recompensa para pegar.
- Cada personagem tem o próprio progresso de missões, salvo junto com ele.
- **As melhorias da cidade saíram do Ancião e agora ficam no cristal central.** Chegue perto do cristal e aperte o botão de agir. Um **“!”** ao lado do cristal avisa quando dá para construir algo.

## Novidades da v3.3.1

- **Cavernas escuras de verdade:** o que ilumina são **os cristais e a luz do próprio slime** (cogumelos, baús e plantas não iluminam mais lá dentro).
- **Defensores caídos numa onda só voltam quando a onda acaba**, antes do começo da próxima.

## Novidades da v3.3.0 (mundo reorganizado)

- **Você nasce na cidade.** As ondas iniciais da vila saíram, e as **invasões só começam quando alguém chega ao nível 30**.
- **O nome da cidade** é escolhido na **primeira conversa com o Ancião**.
- **A caverna do começo virou o covil do Vendaval**, o **chefe final, nível 150**. Ele fica onde o slime nascia, e o caminho até lá tem as **criaturas mais fortes do jogo, do nível 100 ao 140** (esqueletos, zumbis, cavaleiros negros, magos sombrios, demônios, druidas, guerreiros de gelo, gigantes musgosos, gárgulas e golens de lava). Elas não aparecem mais nas invasões.
- **Em volta da cidade** ficam os bichos fracos para começar: **insetos de dia e morcegos à noite**.
- **Um chefe em cada área** (fora a cidade): versões gigantes, com muito mais vida, XP e ouro, que **voltam 5 minutos depois** de derrotados. A **Rainha Aranha** mudou-se para a Floresta dos Goblins.
- **Defensores independentes:** cada um só ataca quem entra no seu alcance e depois volta ao posto. Não sai mais todo mundo de uma vez.
- **A seta de missão saiu**; o quadro no alto mostra só o objetivo em texto.

## Novidades da v3.2.0 (muralha, torres e cidadela do Lorde)

- **Título novo** em estilo grafite: uma linha só, letras do mesmo tamanho, arco-íris brilhante com contorno preto.
- **Quartel:** cada nível dá **1 guarda** (nível 0 = nenhum, nível 10 = 10 guardas).
- **Torres:** cada nível põe **mais uma torre**, até **6**: duas em cada portão (oeste e leste), uma ao norte e uma ao sul. Os níveis 7 a 10 continuam melhorando (vida dobrada, raio, dano e meteoro). **As torres têm vida e podem ser destruídas.**
- **Muralha em segmentos:** cada pedaço tem vida e pode ser **rompido**. Pelo buraco passam os invasores, e os guardas também saem por ali sem dar a volta até o portão. Cada nível dá **mais vida e resistência** a cada segmento.
- **O material evolui com o nível:** sacos de areia → madeira com espinhos → paliçada → paliçada reforçada → pedra rústica → pedra talhada → pedra com ameias → granito → basalto → **obsidiana** (pedra preta com brilho verde). Portões e torres seguem o material.
- **Conserto:** no menu da cidade, pague em ouro e um guarda reconstrói a muralha e as torres em **20 segundos**, só fora de batalha.
- **Voadores** ignoram a muralha, mas atacam **primeiro as torres**. Quem anda quebra a muralha (ou uma torre) se não houver portão ou buraco por perto.
- **Fosso** só com a **muralha de obsidiana (nível 10)**. Antes disso, a muralha pode ser rompida. O choque contra voadores saiu; o fosso nível 10 agora **dobra o dano das armadilhas e do óleo**.
- **Cidadela do Lorde:** a fortaleza ganhou a **muralha de obsidiana**, torres de vigia (só decoração, não ferem ninguém) e uma **mini cidade de cabanas orc com moradores inimigos**.
- **Rebalanceamento das invasões** para o sistema novo.

## Novidades da v3.1.0 (dia e noite)

- **Dia e noite:** o tempo passa (ciclo de 16 minutos: 12 de dia e 4 de noite, com entardecer e amanhecer). Um **relógio com sol/lua** fica ao lado do minimapa. À noite, lá fora, **só se vê o que está iluminado**: a luz própria do slime, **tochas espalhadas pelo mapa** e as luzes da cidade. Os nomes dos monstros longe da luz somem.
- **Cavernas mais escuras**, iluminadas por **mais cristais**, com mais brilho.
- **Ponte e portão também do lado leste** da cidade, com estrada. Defensores e invasores usam o portão mais perto.
- **Bigode (e óculos e máscaras)** acompanham o rosto quando o slime vira de lado.
- **Asas de Morcego** agora têm a **Mordida Vampírica**: dano e roubo de vida crescem com o nível (cura 15% do dano no nível 1, até 70% no nível 100). Fraca no começo, ótima para se sustentar no fim. O morcego inimigo continua fraco nos níveis baixos.
- **Nome da cidade:** tocar na caixa abre o **teclado do celular**; as setas **◄ ►** sorteiam **nomes aleatórios**.

## Novidades da v3.0.0 (parte 2: cidade, balanceamento e criaturas)

- **Construções até o nível 10**, com efeitos de verdade (estilo tower defense):

  | Construção | Níveis 4 a 10 |
  |---|---|
  | Muralha | mais vida no cristal, **espinhos no portão** (nv5), **reparo** do cristal entre as ondas (nv8), muralha encantada com -15% de dano nos defensores (nv10) |
  | Torres | até 8 torres e 4 tipos: **flecha**, **gelo** que deixa lento (nv4), **canhão** em área (nv6) e **raio** em 3 inimigos (nv8); **meteoro** a cada 25 s (nv10) |
  | Quartel | até 20 guardas, **arqueiros** (nv5), **clérigos** que curam (nv7), **capitão** com +25% de dano (nv10) |
  | Templo | cura maior, **escudo sagrado** com -30% de dano no cristal (nv6), **pulso** que empurra (nv9), **explosão de luz** quando o cristal fica com menos de 25% (nv10) |
  | Casas | até +200% de ouro, **juros** de 3% por onda (nv5), **mercado** com construções 15% mais baratas (nv8) |
  | Ferreiro | dano dos defensores, **crítico** (nv6), armas lendárias (nv10) |
  | Fosso | **armadilhas** na ponte (nv5/nv8), **óleo fervente** no portão (nv7), **água elétrica** contra voadores (nv10) |

- **Balanceamento:** sem você, as invasões conseguem derrubar as defesas e quebrar o cristal. As invasões ficam mais fortes conforme a cidade evolui e a cada invasão vencida.
  - Nas simulações sem o jogador, a cidade nível 3 caiu na 5ª onda.
  - A cidade nível 10 perdeu todos os defensores na 5ª onda.
  - Com você lá, dá para segurar.
- Invasores atravessam a mata em volta da cidade. Quem fica parado longe do cristal é levado até a ponte, para a invasão nunca travar.
- **10 criaturas novas e originais**, só nas invasões, cada uma com 5 magias próprias:

  | Criatura | Algumas magias |
  |---|---|
  | Esqueleto Guerreiro | Golpe Ósseo, Escudo de Ossos, Tempestade de Ossos |
  | Zumbi Pútrido | Mordida Infectada, Vômito Ácido, Despertar dos Mortos |
  | Cavaleiro Negro | Investida Sombria, Lâmina Sombria, Execução |
  | Mago Sombrio | Orbe Sombrio, Maldição, Corrente Negra |
  | Demônio Menor | Sopro Infernal, Fúria Demoníaca, Anel de Fogo |
  | Guerreiro de Gelo | Golpe Congelante, Nevasca, Estilhaços |
  | Gigante Musgoso | Pisão Musgoso, Raízes, Terremoto |
  | Druida Sombrio | Espinhos, Cura da Floresta, Enxame |
  | Gárgula de Pedra | Mergulho, Grito de Pedra, Chuva de Pedras |
  | Golem de Lava | Punho de Magma, Erupção, Terremoto Vulcânico |

- **3 exércitos novos** com essas criaturas: Legião Morta-Viva, Hordas do Abismo e Exército do Inverno Eterno.

## Novidades da v3.0.0 (parte 1: visuais)

- **Cartola:** deixa você **invisível por 5 segundos** (os monstros não te veem nem te acertam) e depois tem 5 segundos de recarga.
- **Asas de Anjo:** curam todo mundo na tela e têm uma **aura dourada brilhante** em volta do slime.
- **Visual novo: Chapéu do Mago Louco**, com **corrente de relâmpagos** que pula em até 5 monstros (sai dos baús).
- **Sem poderes repetidos** nos visuais de baú. Os repetidos ganharam poderes novos:

  | Visual | Poder novo |
  |---|---|
  | Chapéu de Festa | explosão de confete ao redor |
  | Auréola | raio de luz sagrada que também cura você |
  | Laço Rosa | encanto que paralisa os inimigos em volta |
  | Orelhas de Gato | fúria felina (3 arranhões rápidos) |
  | Brotinho | raízes que prendem e ferem |
  | Óculos de Nerd | mísseis arcanos teleguiados |
  | Bigode | espirro que arremessa os inimigos |
  | Pirata | canhonaço que explode em área |
  | Asas de Fada | pó de fada que acelera você e as invocações |
  | Antenas de Abelha | enxame de abelhas teleguiadas |
  | Cachecol | escudo de gelo que congela em volta |
  | Tiara de Flores | jardim que cura quem fica dentro |
  | Boné | bumerangue que vai e volta |
  | Máscara de Herói | grito heroico (+40% de dano) |
  | Gorro de Natal | presente que explode |

## Novidades da v2.9.6

- **Moradores passeiam pelo mapa em volta da cidade** (saem e voltam pela ponte), e os guardas fazem ronda por dentro da muralha. Quando chega o alerta de invasão, todos correm para dentro e ocupam **postos de defesa em anéis ao redor do cristal**, de onde atacam os invasores que entram na cidade ou chegam perto. Quem fica preso numa árvore ou pedra contorna o obstáculo.
- **Rodas de visual e de invocação giram para os dois lados**: tocar no quadrado da esquerda volta para o anterior, e tocar no da direita vai para o próximo.
- **Botão "Teleportar ao cristal"** embaixo do painel de vida, que aparece só durante a invasão. No teclado, a tecla é T. Ele leva você e as suas invocações até o cristal.
- **Invasões a cada 15 minutos.**
- **Slimes da cidade com cor e visual diferentes:** cada um usa uma cor própria (24 cores) e um visual diferente, só entre os visuais que você já liberou. Quem sobra fica sem visual.

## Novidades da v2.9.5

- Saiu o aviso "CORRENDO", que aparecia no painel durante o dash e bagunçava a tela.
- **Dragão do Vendaval com 10 magias do tema dele:**
  - Mordida do Trovão (dreno de vida);
  - Arranhão (cone curto);
  - **Golpe de Cauda** (acerta tudo ao redor dele, uns 8 quadrados em volta);
  - Raio (linha);
  - Corrente de Relâmpagos (pula em até 5 inimigos);
  - Rajada de Vento (onda ao redor que empurra e deixa lento);
  - Tornado;
  - Chuva Torrencial (área grande que deixa lento);
  - Chuva de Raios;
  - Tempestade do Vendaval (onda enorme ao redor dele).
  - A cura automática continua.
- **Corrigido: entrar e sair da cidade.**
  - Os invasores que andam contornam o fosso por fora até a ponte e entram pelo portão oeste, venham de qualquer lado.
  - Os defensores saem pelo portão para lutar com invasores do lado de fora e, quando a invasão acaba, voltam para dentro pela ponte.

## Novidades da v2.9.4

- **Corrigido:** o topo das árvores só aparecia perto do personagem em telas largas. Agora as copas cobrem a tela inteira, de qualquer largura.
- **Tela cheia automática no celular:** com o celular na horizontal, o jogo entra em tela cheia (sem a barra de endereço) no primeiro toque. Na vertical, volta ao normal.
- **iPhone:** o Safari não deixa sites usarem tela cheia. Para jogar sem a barra de endereço, use **Compartilhar → Adicionar à Tela de Início** e abra o jogo pelo ícone.

## Novidades da v2.9.3

- **Celular:** as setas das rodas de visual e de invocação saíram. Para girar a roda, toque no quadrado vizinho da esquerda ou da direita.
- **Celular:** o joystick de movimento ficou 20% maior.
- **Minimapa** 15% maior.
- **O mapa já descoberto fica salvo** com o seu personagem: ao voltar ao jogo, o minimapa e o mapa do mundo mostram tudo o que você já explorou. Excluir o personagem apaga esse mapa junto.

## Novidades da v2.9.2

- **Entrada só pelo lado esquerdo (oeste):** o portão do sul foi fechado, com muralha e fosso inteiros, e o caminho de terra que saía pela direita da cidade foi apagado.
- **Ponte de verdade sobre o fosso:** tábuas (ou pedra), corrimão dos dois lados, pilares de pedra na água, cabeceiras e sombra. No nível 3 do fosso, a ponte tem runas que brilham.
- **Portão do oeste:** duas torres, passarela por cima da passagem, portas de madeira abertas com faixas de ferro e argolas, e bandeira e tochas na muralha de castelo.
- A abertura da muralha e do fosso tem a largura exata da ponte: quem anda só entra ou sai atravessando a ponte, e quem voa continua passando por cima.

## Novidades da v2.9.1

- No modo celular, as rodas de visual e de invocação ficaram maiores: cada quadrado tem o tamanho do botão DASH. Em telas estreitas, elas diminuem só o necessário para não encostar no joystick nem nos botões.

## Novidades da v2.9.0

- **Fosso de água com pontes** em volta da cidade (construção nova, 3 níveis): pontes de madeira, pontes de pedra e, no nível 3, água encantada que deixa os invasores lentos na ponte. Bichos voadores passam voando direto. Os que andam têm que entrar pela ponte e pelo portão do oeste.
- **Muralha fechada e imponente:** contínua, alta, com ameias, tochas e portões com torres. Ninguém atravessa a pé, só voando.
- **Quem voa passa por cima das árvores**, da muralha e do fosso (mas não pelas paredes das cavernas).
- **Torres fazem parte da muralha** (2, 4 ou 6). Em cima delas ficam só atiradores: moradores que atacam à distância (Orc Xamã, Gigante, Goblin, Ankheg, Lagarta, Aranha) ou slimes arqueiros.
- **Cristal mágico no lugar da fogueira:** é a vida da cidade, com aura que muda de cor quando enfraquece. Os inimigos só atacam o cristal depois de derrotar todos os defensores.
- **Defensores com vida e nível:** os moradores usam o nível da sua invocação daquele bicho, e os slimes e guardas usam o nível das suas invocações. Quem cai volta no fim da invasão.
- **Invasões em 5 ondas**, de todos os lados:
  - 10 segundos entre uma onda e outra;
  - o nível sobe a cada onda, e a última fica 10 níveis acima do jogador mais forte;
  - cada onda mistura bichos corpo a corpo e à distância;
  - voadores a partir da 3ª onda;
  - na 5ª, um **chefe gigante** do bicho principal do exército.
- **Mensagem do Sábio** sem caixa, só o texto, centralizada no alto da tela, abaixo do objetivo. O nome do lugar aparece por 5 segundos e some, e os dois não se sobrepõem.
- **Otimização para celulares fracos e PCs lentos:**
  - O **modo leve** liga sozinho em aparelhos com poucos núcleos ou pouca memória, no "Gráficos: Baixo" ou quando o jogo começa a travar.
  - Ele desliga o brilho suave, os raios de sol, o chão pintado e a poeira no ar, e limita partículas e brilhos.
  - No celular, a resolução fica limitada.
  - Nos testes, o tempo de cada quadro caiu pela metade.

## Novidades da v2.8.0

- **O jogo ocupa a tela inteira** no computador e no celular na horizontal. A altura é sempre a mesma, e a largura acompanha o formato da tela (4:3, 16:9, ultrawide), sem faixas pretas nas laterais. Em telas largas você vê mais do mapa dos lados.
- Os menus e a tela de título ficam centralizados.
- **Tela cheia de verdade** (sem as barras do navegador): pela opção "Tela cheia" no menu (Start/Esc) ou pela tecla F11 do navegador. No modo celular, o jogo entra em tela cheia e trava na horizontal no primeiro toque, quando o celular permite.
- Ao mudar o tamanho da janela ou girar o celular, o jogo se ajusta sozinho.

## Novidades da v2.7.0

- **Invasões a cada 10 minutos**, com aviso e contagem regressiva de 1 minuto.
- **Minimapa redondo** com o norte marcado ("N" com seta vermelha).
  - Objetivos fora do círculo aparecem como seta na borda.
  - Durante a invasão e no aviso de 1 minuto, uma seta vermelha piscando aponta para a cidade.
- **Recarga da magia:** barra logo abaixo do quadro do visual, com o tempo escrito embaixo do nome.
- **Salas automáticas:** se a sala tiver 10 jogadores, o 11º abre sozinho a sala seguinte ("principal2", "principal3"...) e vira o anfitrião dela, para os próximos 10.
- Saiu o texto "Online · sala · você hospeda o mundo" do canto da tela.

## Novidades da v2.6.0

- **Todos os jogadores podem construir na cidade:** use o cristal central. O ouro sai do tesouro da cidade, que é o mesmo para todos, e todos veem a construção nova na hora.
- **Até 10 jogadores** online na mesma sala, tanto na conexão direta quanto no servidor dedicado.
- **Cada jogador dá o próprio nome à cidade**, e só ele vê esse nome. O nome fica salvo no personagem e pode ser trocado em "Renomear a cidade", no menu do cristal central.

## Novidades da v2.5.0 (cidade medieval)

- **Ouro:** os monstros derrotados soltam moedas que voam até você e vão para o tesouro da vila. Monstros de nível maior dão mais ouro, elites dão o triplo e chefes 20 vezes mais.
- **6 construções com 3 níveis cada**, que mudam o visual da cidade (use o cristal central):

  | Construção | Nível 1 | Nível 2 | Nível 3 |
  |---|---|---|---|
  | Muralha | paliçada (+700 de vida da vila) | pedra (+2.200) | castelo com ameias, tochas e portões (+5.200) |
  | Torres | 2 com arqueiros | 4 | 4 de pedra com bestas (dano x2) |
  | Quartel | 4 guardas | 8 | 12 cavaleiros |
  | Templo | tenda (cura 5/s) | capela (10/s) | catedral com vitrais (20/s e a vila se reconstrói) |
  | Casas | madeira (+20% de ouro) | pedra com telhado e postes de luz (+40%) | sobrados com bandeiras e praça de pedra (+70%) |
  | Ferreiro | forja (+25% de dano dos defensores) | armas de aço (+50%) | armas encantadas (+100%) |

- **Todos defendem:** na invasão, os moradores (um de cada monstro devorado), os slimes da vila e os guardas atacam os invasores, e as torres atiram.
- **Invasões depois da missão das 4 ondas** (a cada 15 minutos desde a v2.9.6), com 7 tipos de exército vindo de lados diferentes: Horda Orc, Matilha Sombria, Tribo Goblin, Gigantes das Colinas, Enxame do Ninho, Feras de Fogo e Gelo, e Revoada de Dragões.
  - Aviso antes da invasão, com contagem regressiva na tela em qualquer lugar do mapa.
  - Vencer dá ouro extra. Se a cidade cair, perde 25% do ouro.

## Novidades da v2.4.0

- **Animação de corpo inteiro:** cada criatura tem 10 poses (parada, 6 de caminhada e 3 de ataque).
  - **Asas batendo:** morcegos, dragões e o Dragão do Vendaval.
  - **Pernas em passo alternado:** lobos, orcs, ogros, minotauro, goblins, aranhas, lagarta, ankheg e basilisco.
  - **Braços:** balançam ao andar.
  - **Ataque:** o braço com a arma recua e golpeia (machado, clava, lança e cajado), e os bichos que mordem avançam a cabeça abrindo a boca.
  - **Caudas:** balançam ao andar.
  - Funciona para monstros, invocações e moradores da vila.
- **Chefes renascem 5 minutos depois de derrotados**, no mesmo lugar: Rainha Aranha, Lorde Orc e Dragão Ancião.

## Novidades da v2.3.0 (visual estilo anime)

- **Cel shading:** personagens, monstros, invocações e visuais têm sombra em faixas nítidas, como em anime, com cores mais vivas e contorno escuro mais marcado.
- **Olhos de anime** nas criaturas, com íris grande e dois brilhos.
- **Iluminação de cenário:**
  - brilho suave (bloom) em magias, fogo e luzes;
  - raios de sol entrando na floresta;
  - tom quente ao ar livre e frio nas cavernas;
  - manchas grandes de luz e sombra pelo chão, como cenário pintado à mão.
- O brilho suave fica desligado no modo "Gráficos: Baixo (PC fraco)".

## Novidades da v2.2.0

- **Gráficos em alta resolução:**
  - Personagens, monstros, invocações e visuais são gerados com 3 vezes mais detalhe, com sombreado suave e contorno fino. No modo "PC fraco", são 2 vezes.
  - O chão foi refeito com tufos de grama, flores, pedras, poças, brasas e neve desenhados.
  - As árvores ganharam copa com mais folhas, luz do sol, frutinhas e tronco com casca e raízes.
- **Seu slime vira para todos os lados:** de frente quando desce, de costas quando sobe e de perfil para a esquerda ou a direita. Os slimes da vila e os amigos online também.
- **Monstros, invocações e moradores** giram ao trocar de lado e inclinam o corpo quando sobem ou descem.
- **Dragão do Vendaval com 10 habilidades** (refeitas na v2.9.5).
  - Ele libera 2 a cada 10 níveis, nunca tendo menos de 4.
  - Ele se cura sozinho: regenera o tempo todo e, com pouca vida, solta uma cura forte (a cada 20 s).
- **Volume no menu (Start ou Esc):** música e efeitos separados, de 0% (mudo) a 100%. Use as setas para ajustar ou aperte o item para ir descendo.

## Novidades da v2.1.0

- **Animações para todas as criaturas:**
  - Ao andar: passo com balanço e inclinação, e as criaturas voadoras batem asas.
  - No ataque básico: investida na direção do alvo.
  - Ao lançar magia: círculo mágico na cor do elemento, com brilho e faíscas.
  - Vale para o slime, as invocações, os monstros e os amigos online.
- **Toda criatura tem ataque básico.** As magias e os ataques especiais dependem do nível:

  | Nível | Habilidades além do ataque básico |
  |---|---|
  | 1 a 9 | nenhuma |
  | 10 a 19 | 1 |
  | 20 a 29 | 2 |
  | 30 a 39 | 3 |
  | 40 a 49 | 4 |
  | 50 ou mais | 5 |

  Os chefes sempre têm pelo menos 3.
- **Tipos de magia**, inspirados em RPGs de mesa:
  - de ataque: projéteis, sopro em cone, raio em linha, onda ao redor, explosão no chão (meteoro, nevasca, poça de veneno que fica) e corrente de relâmpagos que pula de alvo em alvo;
  - de controle: dreno de vida e prender o alvo;
  - de apoio: cura de aliado, pressa (mais velocidade de ataque e de movimento), escudo (menos dano) e fúria;
  - de movimento e reforço: investida, teleporte e chamar crias.
- **Invocações usam as mesmas magias a seu favor:** atacam os monstros, curam você e as outras invocações, e dão pressa e escudo ao grupo. Quando a invocação aprende uma magia nova, aparece uma mensagem.
- **Habilidades de cada criatura**, na ordem em que liberam:

| Criatura | Habilidades (nível 10 → 50) |
|---|---|
| Morcego Gigante | Mordida Vampírica · Grito Sônico · Frenesi da Revoada · Nuvem de Morcegos · Voo Sombrio |
| Goblin | Lança Arremessada · Rajada de Lanças · Rede de Caça · Grito de Guerra Goblin · Bomba Goblin |
| Aranha Gigante | Teia · Picada Venenosa · Chuva de Teias · Casulo · Ninhada |
| Lagarta Carniceira | Fumaça Venenosa · Cuspe Venenoso · Casulo Regenerador · Pele Urticante · Nuvem Pestilenta |
| Ankheg | Cuspe Ácido · Escavar · Jorro Ácido · Tremor · Carapaça |
| Lobo-Chifre | Raio · Investida Elétrica · Uivo da Matilha · Corrente de Relâmpagos · Tempestade |
| Cão Infernal | Sopro de Fogo · Bola de Fogo · Uivo Infernal · Mordida Flamejante · Explosão Infernal |
| Lobo Invernal | Sopro Gélido · Lança de Gelo · Uivo da Matilha · Nevasca · Armadura de Gelo |
| Ogro | Pancada Sísmica · Arremesso de Pedra · Fúria do Ogro · Investida · Terremoto |
| Minotauro | Investida · Golpe Giratório · Grito Aterrorizante · Pisotear · Fúria do Labirinto |
| Basilisco | Olhar Petrificante · Cuspe Venenoso · Pele de Pedra · Petrificar · Regeneração |
| Gigante das Colinas | Arremesso de Rocha · Pisão · Chuva de Rochas · Terremoto · Pele de Pedra |
| Rainha Aranha | Teia Tripla · Ninhada · Poça de Veneno · Casulo · Frenesi |
| Orc Saqueador | Golpe Giratório · Investida · Grito de Guerra · Machado Arremessado · Berserk |
| Orc Xamã | Bola de Fogo · Cura Tribal · Bênção de Guerra · Escudo Espiritual · Chuva de Fogo |
| Lobo Sombrio | Passo Sombrio · Mordida Drenante · Uivo do Terror · Garras das Sombras · Trevas |
| Lorde Orc | Investida · Terremoto · Grito de Guerra · Golpe Giratório · Berserk |
| Dragão do Vendaval | Raio · Corrente de Relâmpagos · Tempestade · Vendaval · Vento a Favor |
| Dragão Verde | Sopro Venenoso · Nuvem Ácida · Rajada Venenosa · Rugido · Regeneração Dracônica |
| Dragão Vermelho | Sopro de Fogo · Bolas de Fogo · Chuva de Meteoros · Rugido · Asas Flamejantes |
| Dragão Glacial | Sopro Gélido · Lanças de Gelo · Nevasca · Armadura de Gelo · Rugido |
| Dragão Negro | Sopro Sombrio · Passo Sombrio · Drenar Vida · Maldição · Trevas Profundas |
| Dragão de Pedra | Chuva de Rochas · Terremoto · Pele de Pedra · Investida · Pisão |
| Dragão Ancião | Sopro Ancestral · Tempestade de Relâmpagos · Chuva de Meteoros · Terremoto · Fúria Ancestral |

## Novidades da v2.0.0

- **Quem sai do jogo some da tela.**
  - Fechar a aba avisa a sala na hora.
  - Se alguém cair sem avisar (internet caiu, jogo travou), o personagem e as invocações dele somem depois de 6 segundos sem sinal.
  - Minimizar o jogo não derruba ninguém: o jogo continua mandando sinal em segundo plano.
- **Servidor dedicado** para rodar na Oracle Cloud, com até 8 conexões por sala. Se quem hospeda o mundo sair, outro jogador assume sem derrubar ninguém. Sem servidor configurado, o jogo continua com a conexão direta entre navegadores.

## Novidades da v1.9.1

- **Botão de cura** (Y no controle, H no teclado): cura você e as suas duas invocações, mesmo se elas estiverem longe.
- **Visuais de cura** (Asas de Anjo, Auréola, Asas de Fada e Tiara de Flores): lançam a cura sozinhos assim que a recarga termina, mesmo sem inimigos. A cura vale para todos os jogadores e invocações na tela, inclusive os amigos online. Inimigos nunca são curados; os que estiverem perto levam dano da luz.

## Novidades da v1.9.0

- **Música que muda a cada 4 minutos** enquanto você explora. Os estilos são Minimal Techno, Dub Techno, House, Tech House, Acid House e Techno, sem repetir o anterior, e a troca acontece no fim do compasso. O nome da música aparece embaixo do minimapa.
- **Cada chefe tem a sua música:**

  | Chefe | Música |
  |---|---|
  | Rainha Aranha | Jungle |
  | Lorde Orc | Breakbeat |
  | Dragão Ancião | Drum and Bass |

- As ondas de orcs na vila e a festa do DJ continuam com as músicas próprias.

## Novidades da v1.8.0

- **Níveis até 100.** Cada nível dá mais vida e mais dano, e o mesmo vale para as invocações.
- **XP linear:** cerca de 20 monstros do seu nível para subir cada nível.
- **Os monstros têm nível.** Cada região tem uma faixa de níveis, que vai do 1 (morcegos) ao 100 (Dragão Ancião). O Elite tem 3 níveis a mais que o monstro comum.
- **Cor do nome conforme a diferença de nível:**

  | Cor | Nível do monstro | Dano que você toma | XP |
  |---|---|---|---|
  | Verde | até 4 acima do seu | normal | normal |
  | Amarelo | 5 ou mais acima | +50% | +50% |
  | Vermelho | 10 ou mais acima | dobro | dobro |

- **Árvore de habilidades com pontos:** cada habilidade aceita vários pontos, por exemplo o Retorno Rápido, que começa em 10 segundos e perde 1 segundo por ponto até 5. Você ganha 1 ponto por nível, e a árvore inteira (99 pontos) fecha no nível 100.
- **Resistência no lugar da imunidade:** devorar um monstro de um elemento dá 25% de resistência a ele. O Escudo Elemental, na árvore, leva até 75%.
- **Invocação nova** começa no nível do monstro devorado (sem passar do seu).
- **Saves antigos:** o nível é mantido e os pontos de habilidade são devolvidos para você distribuir na árvore nova.

## Novidades da v1.7.0

- Você é sempre slime: não existe mais transformação. LB/LT trocam o visual, e cada visual dá poderes. Devorar um monstro libera o visual dele (por exemplo, os Chifres de Diabinho dão sopro de fogo e o Capacete Viking dá a pancada que quebra pedras). Baús e chefes dão 18 visuais especiais, como os Fones de DJ, as Asas de Anjo e o Brotinho.
- Duas invocações ao mesmo tempo: RT escolhe a primeira e RB a segunda (no teclado, C e Z).
- Vila dos Slimes: a base agora é uma vila de slimes amigos, e cada tipo de monstro devorado aparece morando lá.
- Com os Fones de DJ dentro da vila, todo mundo dança, com luzes e música de pista.
- Chefes mais fortes: mais que o dobro de vida, mais dano e fúria abaixo de 50% de vida.

## Novidades da v1.6.0

- Mundo aberto de verdade: depois do Santuário do Vendaval, todas as regiões formam um único terreno contínuo, sem paredes de árvores e sem caminho único. As bordas entre biomas se misturam.
- A Vila Goblin fica logo na saída do Santuário e serve de base. A oeste ficam florestas, colinas e pântanos; ao sul, as terras orc, o vulcão, o gelo e os dragões. Quanto mais longe da vila, mais perigoso.
- Os monstros ficam perto do seu habitat e voltam para ele quando se afastam.
- Os orcs atacam a vila vindos do sul.
- Botão X para fechar todos os menus com mouse, toque no celular ou teclado.

## Novidades da v1.5.0

- Visual de RPG clássico em pixel art: contorno de 1px, paleta retrô com pontilhado, chão e paredes desenhados pixel a pixel e painéis de pedra com cantos de bronze.
- Terras dos Dragões: 6 regiões novas com Dragão Verde (veneno), Vermelho (fogo), Glacial (gelo), Negro (trevas) e de Pedra (terra), e o chefe Dragão Ancião. Cada um tem sopro com aviso no chão e pode ser devorado como forma e invocação.
- Mapa com 24 regiões.

## Novidades da v1.4.0

- Slime redesenhado: mais redondo e fofo, com olhos brilhantes e bochechas coradas, e pula ao andar.
- 24 visuais para o slime, ganhos em baús e chefes, com a nova aba Visual.
- Baús agora também no mundo aberto. Eles dão visuais em vez de pontos de habilidade.
- Controle: LB/LT trocam a forma, RB/RT trocam a invocação.
- Gráficos com até 3 vezes mais pixels (opção Ultra) e texturas mais detalhadas.

## Novidades da v1.3.0

- Gráficos refeitos em resolução dobrada: personagens com sombreamento, texturas detalhadas por região e luzes mais leves.
- Modo celular com joystick e botões na tela, além de modo de gráficos para PC fraco.
- Golpe e magia automáticos. Na forma de Slime, a magia é aleatória entre as aprendidas.
- Novo mapa: cavernas de insetos, depois o Dragão do Vendaval, depois o mundo aberto com habitats.
- Invocações com nível próprio, que desviam de obstáculos e se teletransportam se travarem.
- Subir de nível agora leva 3 vezes mais tempo.

## Novidades da v3.9.0 (cidade que evolui)
- Todas as construções agora passam pelos mesmos 10 materiais da muralha: barro, madeira, toras, madeira reforçada, pedra, pedra talhada, ameias, granito, basalto e obsidiana (com runas verdes brilhando).
- Cada nível acrescenta detalhes: floreiras, segundo andar, anexos, chaminés, bandeiras, mansardas, lampiões e telhados com borda dourada.
- Cada construção tem seu tema: **Moradias** (casas), **Ferreiro** (forja, bigorna, armas expostas, segunda fornalha, roda de afiar e fogo mágico azul no máximo), **Guilda de Aventureiros** (antigo Quartel: espadas cruzadas, mural de missões, troféu de monstro, torres e brasão dourado), **Mercador** (barraca com toldo listrado que vira loja de dois andares com cúpula dourada) e **Templo** (tenda, capela, igreja com vitrais, torres, sino, cúpula dourada e aura sagrada).
- A muralha ficou maior para caber a cidade nova (o fosso e as pontes acompanham).
- Com **todas** as construções no nível 10, surge um pequeno **castelo de obsidiana** no norte da cidade.

## Novidades da v3.10.0 (músicas de 1 minuto)
- Todas as músicas agora têm forma completa e passam de 1 minuto antes de recomeçar: começo → A → B → A (com segunda voz) → B → **virada** (a batida some e volta com rufar de caixa) → A → B → final igual ao começo, para o loop emendar perfeito. As mais rápidas ganham mais um A e B.
- O Minimal Techno ficou idêntico no começo; só ganhou as partes novas.
- A antiga Drum and Bass foi refeita como **Drum and Breaks (UK)**: bateria quebrada com swing no estilo UK breakbeat, baixo reese ondulando, acordes curtos na parte B e a rabeca medieval por cima.
- Música de chefe começa assim que o chefe aparece na tela; quando ele morre ou fica bem longe, volta a música que estava tocando antes, do ponto em que ela parou.
- A troca automática de estilo enquanto você explora espera a música atual terminar.

## Novidades da v3.11.0 (nova música de chefe)
- A Drum and Breaks foi substituída por uma música nova, **Jungle Drum and Bass** (172 BPM, 61 s de loop): quebras picotadas no estilo Amen, sub grave rolando, reese na parte B, pads de clima, harpa e sino, e uma melodia nova de flauta doce.
- O Minimal Techno não foi alterado.

## v3.11.1
- Cada música toca no seu próprio canal de áudio: ao trocar (por exemplo, quando aparece um chefe), a música anterior é cortada em 0,15 s, incluindo pads, eco e reverberação. Nada fica tocando junto por trás.

## v3.11.2
- Morcego (**Asas de Morcego**) e a skin **Capa do Vampiro**: o golpe básico agora rouba vida — você cura exatamente o dano que causou (número rosa "+X" em cima do slime).
- A Mordida Vampírica automática das Asas de Morcego também passou a curar 100% do dano que causa (antes curava só 15% no começo, quase nada).

## v3.11.3

- **A cidade se defende de qualquer monstro:** guardas, moradores (as invocações que vivem na cidade) e torres atacam **qualquer monstro que chegar perto da muralha**, não só os invasores. Fora das invasões eles vigiam um raio maior.
- **A kill conta para o seu personagem,** esteja onde estiver: você ganha o XP e a devoração (invocação, visual e resistência) do monstro que a cidade abateu. Isso ajuda a subir os primeiros níveis.

## v3.12.0 (sítios, cristais e minas)

- **4 sítios de erva curativa** do lado de fora da cidade (nas diagonais), cada um com casinha, cerca e 6 pés de erva que **voltam a crescer em 1 minuto**. Um **fazendeiro slime com o Brotinho** na cabeça cuida e rega a plantação.
- **Cristais azuis coletáveis:** encoste num cristal do mapa (no chão ou nas cavernas) para ganhar **50 de ouro**. Ele volta a crescer em 5 minutos. No online, o ouro vai para o tesouro de quem hospeda.
- **10 minas de cristal** espalhadas perto das montanhas, das rochas e da neve, cada uma com entrada na pedra, vigas, lanterna, carrinho e **7 cristais** para coletar.
- **A magia de cura recarrega na metade do tempo** (6 s em vez de 12 s).

## v3.13.0 (slimes da cidade, mudo e cidade no mapa)

- **A cidade começa só com o Ancião e 1 slime.** Cada nível das **Casas** traz mais 1 slime, até 11.
- **Os slimes da cidade usam só skins que você já liberou**, com **o poder daquela skin** em combate (como o seu). Eles pegam **as mais fortes primeiro** e trocam sozinhos quando você libera uma mais forte. A ordem de força vem da simulação de vitórias. **Fones de DJ é só seu.**
- **Botões de mudo** para a música e para os efeitos no menu de pausa. Agora o mudo (ou o volume no zero) silencia de verdade, inclusive o eco da reverberação.
- **A cidade aparece no minimapa** (castelinho, ou seta dourada na borda quando está longe) **e no mapa do mundo**, com o nome dela.

## v3.14.0

- **Monstros em movimento constante:** quando não estão caçando, os monstros do mapa fazem uma ronda sem parar, de um ponto a outro, **perto de onde nasceram** (até 6 blocos). Se travam numa pedra ou árvore, escolhem outro caminho na hora. Chefes andam mais devagar.

## v3.15.0 (habilidades novas)

- **Aba de habilidades redesenhada:** 4 trilhas, cada uma com um slime desenhado e o contador de níveis (ex.: **12/50**):
  - **Ataque** (slime com espada), **Defesa** (slime com escudo), **Invocação** (slime com uma bola de energia em cada mão) e **Cura** (o antigo grupo "Magia", com chapéu de mágico e livro de magia).
  - Clique (ou ENTER/A) para evoluir a trilha escolhida: cada nível libera o próximo efeito, e o efeito do próximo nível aparece embaixo.
- **Ordem da Cura:** 1º **regeneração por segundo**; 2º **Cura Compartilhada** (suas invocações recebem 25% de toda cura que você recebe, até 100%). Depois vêm cura maior, recarga menor, Cura Potente (+2% em toda cura recebida), absorção, cura em área, bênção, XP e renascer.
- **Efeitos novos que completam as trilhas:** Força Gosmenta (+1,5% de dano), Gosma Robusta (+1,5% de vida), Elo do Bando (+2% de vida e dano das invocações).
- Saves antigos: os pontos que você tinha em cada grupo viram níveis na trilha correspondente.

## v3.16.0 (cavaleiros da Guilda e Ancião dourado)

- **Na base fica só 1 slime;** os outros moradores-slime são os **cavaleiros da Guilda** (1 por nível).
- **Cada cavaleiro usa uma skin que você liberou, sem repetir**, da mais forte para a mais fraca, e **cada um tem uma cor diferente**. As **Asas de Anjo** têm prioridade: assim que você as libera, o primeiro cavaleiro já as equipa e **cura todos os cavaleiros, moradores e invocações da base** (20% da vida a cada 6 s, quando alguém está ferido). Os outros cavaleiros usam o poder da própria skin em combate.
- **O Ancião agora é dourado e brilhante**, com uma **aura que sobe do chão**, como um guerreiro lendário.
