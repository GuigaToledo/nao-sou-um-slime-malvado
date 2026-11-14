# Não sou um Slime Malvado

Jogo no navegador: você renasce como um slime e cada monstro derrotado é devorado e vira uma forma nova e uma invocação. Atravesse as cavernas dos insetos, faça amizade com o Dragão do Vendaval e explore o mundo aberto até a Vila Goblin e a Fortaleza do Lorde Orc.

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
| Trocar forma | Q / E | LB / LT | setas da roda |
| Trocar invocação | Z / C | RB / RT | setas da roda |
| Habilidades e visuais | K ou Tab | Select | ÁRVORE |
| Menu, mapa do mundo e salvar | Esc ou P | Start | MENU |

## O mundo

- **Cavernas dos insetos:** Gruta do Despertar (morcegos), Túneis Úmidos (lagartas), Ninho das Aranhas (com a Rainha Aranha) e Colmeia dos Ankhegs.
- **Santuário do Vendaval:** com Nível 5, faça amizade com o dragão. Ele vira sua invocação e também uma forma (voa e lança raios, tornados e vendavais), e abre a passagem para o mundo aberto.
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
