# Não sou um Slime Malvado

Jogo de pixel art que roda no navegador. Você renasce como um slime: cada monstro derrotado é devorado e vira uma forma nova e uma invocação. Explore 18 regiões, faça amizade com o Dragão Tempestade e defenda a Vila Goblin dos orcs.

**Jogar:** https://guigatoledo.github.io/nao-sou-um-slime-malvado/

## Personagens

A tela inicial tem 3 vagas de personagem. Em cada uma você escolhe o nome e a cor do slime ali mesmo. Cada personagem tem o próprio progresso, e o botão **Excluir** apaga um personagem quando você quiser.

## Jogar online com amigos (até 4)

1. Todos abrem o link acima e escolhem **Jogar online**.
2. Quem entrar primeiro vira o servidor: o mundo dele (capítulo, vila, cristais) é o mundo de todos.
3. Os outros entram no mundo do servidor. Cada um mantém o próprio nível, as formas e as habilidades.
4. Se o servidor sair, os outros escolhem **Jogar online** de novo, e o primeiro a entrar vira o novo servidor.

Para um grupo separado, use uma sala com outro nome colocando `#nomedasala` no fim do link, por exemplo `.../nao-sou-um-slime-malvado/#turma2`.

A conexão é direta entre os navegadores (WebRTC, via [PeerJS](https://peerjs.com/)). Em algumas redes muito fechadas (redes de empresa ou alguns roteadores 4G) ela pode não funcionar.

## Controles

| Ação | Teclado | Controle Xbox |
|---|---|---|
| Mover | WASD / setas | Analógico / direcional |
| Atacar (o Sábio também ataca sozinho) | Espaço | A |
| Habilidade da forma atual | R | X |
| Interagir (dragão, Ancião) | F | B |
| Magia de cura | H | Y |
| Dash · correr | Shift (segure para correr) | L3 (clique no analógico) |
| Trocar forma | Q / E | LB / RB |
| Trocar invocação | Z / C | LT / RT |
| Árvore de habilidades | K ou Tab | Select |
| Menu, mapa do mundo e salvar | Esc ou P | Start |
| Entrar como jogador 2 a 4 no mesmo PC | — | Start no controle novo |

## O mundo

São 18 regiões, cada uma com um único tipo de monstro: Gruta do Despertar (morcegos), Túneis Goblin, Ninho das Aranhas (com a Rainha Aranha), Pântano Fétido, Dunas Subterrâneas, Penhascos do Trovão, Fornalha, Gruta Gelada, Covil dos Ogros, Labirinto do Minotauro, Ruínas de Pedra, Santuário da Tempestade, Colinas dos Gigantes, Bosque Sombrio, Vila Goblin, Planícies Orc, Acampamento Xamã e Fortaleza do Lorde.

- Os monstros renascem 1 minuto depois de derrotados, no mesmo lugar.
- Cerca de 1 em cada 10 monstros é Elite: brilha em dourado, é bem mais forte e dá o triplo de XP.
- Os monstros usam ataques especiais com aviso no chão (área vermelha): fuja da área antes do golpe.
- O Dragão Tempestade não vira forma. Ao fazer amizade com ele (Nível 5), ele passa a lutar ao seu lado como invocação.

## Elementos

Devorar um monstro de um elemento deixa você imune a ele: Cão Infernal e Orc Xamã (fogo), Lobo Invernal (gelo), Lobo-Chifre e Dragão (raio), aranhas e Lagarta (veneno), Ankheg (ácido), Ogro e Gigante (terra), Lobo Sombrio (trevas).

Os monstros também não sofrem dano do próprio elemento. Por exemplo, o fogo não fere o Cão Infernal: troque de forma para atacá-lo com outro elemento.

## Árvore de habilidades

São 32 melhorias em 4 ramos: Ataque, Defesa, Invocação e Magia. Ganhe pontos subindo de nível, abrindo baús secretos e devorando chefes.

## Salvamento

O jogo salva sozinho a cada 5 minutos, quando você fecha ou troca de aba, e quando você escolhe **Salvar agora** no menu. O progresso de cada personagem fica no navegador de cada jogador.

## Novidades da v1.2.0

- 3 vagas de personagem na tela inicial, com nome, cor e opção de excluir.
- Mapa 10 vezes maior, com 18 regiões e um tipo de monstro por região.
- Monstros mais fortes, com ataques especiais avisados e monstros Elite.
- Monstros renascem 1 minuto depois de derrotados.
- Monstros não sofrem dano do próprio elemento.
- Dragão Tempestade redesenhado, agora só como invocação amiga.
- Árvore com 32 habilidades e magia de cura.
- Música: minimal techno nas cavernas e drum and bass nas lutas contra chefes.
- Visual novo: janelas azuladas, números de dano que pulam, nomes e vida embaixo dos personagens e círculos de magia.
- Novos botões no controle Xbox (veja a tabela acima).
