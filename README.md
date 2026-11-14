# Não sou um Slime Malvado

Jogo de pixel art que roda no navegador. Você renasce como um slime: cada monstro derrotado é devorado e vira uma forma nova e uma invocação. Explore a Caverna Selada, devore o Dragão Tempestade e defenda a Vila Goblin dos orcs.

**Jogar:** https://guigatoledo.github.io/nao-sou-um-slime-malvado/

## Jogar online com amigos (até 4)

1. Todos abrem o link acima e escolhem **Jogar online**.
2. Quem entrar primeiro vira o servidor: o mundo dele (capítulo, vila, cristais) é o mundo de todos.
3. Os outros entram automaticamente no mundo do servidor. Cada um mantém o próprio nível, as formas e as habilidades.
4. Se o servidor sair, os outros escolhem **Jogar online** de novo, e o primeiro a entrar vira o novo servidor.

Para um grupo separado, use uma sala com outro nome colocando `#nomedasala` no fim do link, por exemplo `.../nao-sou-um-slime-malvado/#turma2`.

A conexão é direta entre os navegadores (WebRTC, via [PeerJS](https://peerjs.com/)). Em algumas redes muito fechadas (redes de empresa ou alguns roteadores 4G) a conexão pode não funcionar.

## Controles

| Ação | Teclado | Controle Xbox |
|---|---|---|
| Mover | WASD / setas | Analógico / direcional |
| Atacar (o Sábio também ataca sozinho) | Espaço | A |
| Interagir | F | X |
| Trocar forma | Q / E | LB / RB |
| Trocar invocação | Z / C | LT / RT |
| Árvore de habilidades | K ou Tab | Y |
| Pausa e salvar | Esc ou P | START |
| Minimapa · Som | N · M | — |
| Entrar como jogador 2 a 4 no mesmo PC | — | START no controle novo |

## Salvamento

O jogo salva sozinho a cada 5 minutos, quando você fecha ou troca de aba, e quando você escolhe **Salvar agora** na pausa. O progresso fica no navegador de cada jogador.
