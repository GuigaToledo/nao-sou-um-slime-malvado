# Não sou um Slime Malvado

Jogo no navegador: você renasce como um slime e cada monstro derrotado é devorado e vira uma forma nova e uma invocação. Atravesse as cavernas dos insetos, faça amizade com o Dragão do Vendaval e explore o mundo aberto, do nível 1 ao 100.

**Jogar:** https://guigatoledo.github.io/nao-sou-um-slime-malvado/

Funciona no computador e no celular. Na tela inicial, escolha **Jogar no: Computador** ou **Jogar no: Celular**. No celular aparecem um joystick e botões na tela.

## Personagens

A tela inicial tem 3 vagas de personagem. Em cada uma você escolhe o nome e a cor do slime. Cada personagem tem o próprio progresso, e o botão **Excluir** apaga um personagem quando você quiser.

## Jogar online com amigos (até 4)

1. Todos abrem o link e escolhem **Jogar online**.
2. Quem entrar primeiro vira o servidor: o mundo dele é o mundo de todos.
3. Os outros entram no mundo do servidor e mantêm o próprio nível, as formas e as invocações.
4. Se o servidor sair, os outros escolhem **Jogar online** de novo, e o primeiro a entrar vira o novo servidor.

Para um grupo separado, coloque `#nomedasala` no fim do link. A conexão é direta entre os navegadores (WebRTC, via [PeerJS](https://peerjs.com/)) e pode falhar em redes muito fechadas.

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
