# Não sou um Slime Malvado

Jogo no navegador: você renasce como um slime e cada monstro derrotado é devorado e vira uma forma nova e uma invocação. Atravesse as cavernas dos insetos, faça amizade com o Dragão do Vendaval e explore o mundo aberto, do nível 1 ao 100.

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

- **Todos os jogadores podem construir na cidade:** fale com o Ancião. O ouro sai do tesouro da cidade, que é o mesmo para todos, e todos veem a construção nova na hora.
- **Até 10 jogadores** online na mesma sala, tanto na conexão direta quanto no servidor dedicado.
- **Cada jogador dá o próprio nome à cidade**, e só ele vê esse nome. O nome fica salvo no personagem e pode ser trocado em "Renomear a cidade", no menu do Ancião.

## Novidades da v2.5.0 (cidade medieval)

- **Ouro:** os monstros derrotados soltam moedas que voam até você e vão para o tesouro da vila. Monstros de nível maior dão mais ouro, elites dão o triplo e chefes 20 vezes mais.
- **6 construções com 3 níveis cada**, que mudam o visual da cidade (fale com o Ancião):

  | Construção | Nível 1 | Nível 2 | Nível 3 |
  |---|---|---|---|
  | Muralha | paliçada (+700 de vida da vila) | pedra (+2.200) | castelo com ameias, tochas e portões (+5.200) |
  | Torres | 2 com arqueiros | 4 | 4 de pedra com bestas (dano x2) |
  | Quartel | 4 guardas | 8 | 12 cavaleiros |
  | Templo | tenda (cura 5/s) | capela (10/s) | catedral com vitrais (20/s e a vila se reconstrói) |
  | Casas | madeira (+20% de ouro) | pedra com telhado e postes de luz (+40%) | sobrados com bandeiras e praça de pedra (+70%) |
  | Ferreiro | forja (+25% de dano dos defensores) | armas de aço (+50%) | armas encantadas (+100%) |

- **Todos defendem:** na invasão, os moradores (um de cada monstro devorado), os slimes da vila e os guardas atacam os invasores, e as torres atiram.
- **Invasões depois da missão das 4 ondas** (a cada 10 minutos desde a v2.7.0), com 7 tipos de exército vindo de lados diferentes: Horda Orc, Matilha Sombria, Tribo Goblin, Gigantes das Colinas, Enxame do Ninho, Feras de Fogo e Gelo, e Revoada de Dragões.
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
- **Dragão do Vendaval com 10 habilidades:** Raio, Corrente de Relâmpagos, Tempestade, Vendaval, Vento a Favor, Sopro do Trovão, Tornado, Escudo de Vento, Fúria da Tempestade e Julgamento Celestial.
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
