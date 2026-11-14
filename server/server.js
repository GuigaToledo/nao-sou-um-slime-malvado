// Servidor online de "Não sou um Slime Malvado".
// Ele é a sala: recebe a conexão de cada jogador e repassa os dados entre eles.
// O primeiro jogador da sala hospeda o mundo (monstros, ondas, chefes). Se ele sair,
// o próximo da fila assume sozinho, sem derrubar ninguém.
"use strict";
const http = require("http");
const { WebSocketServer } = require("ws");

const PORT = +process.env.PORT || 8080;
const MAX_PLAYERS = +process.env.MAX_PLAYERS || 8;   // conexões por sala (cada uma pode ter jogadores locais)
const MAX_ROOMS = +process.env.MAX_ROOMS || 50;
const MAX_MSG = 256 * 1024;                          // tamanho máximo de uma mensagem

const rooms = new Map(); // nome -> { peers: Map(id -> ws), host: id }
let nextId = 1;

const cleanRoom = s => (String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "") || "principal").slice(0, 20);
const send = (ws, o) => { if (ws.readyState === 1) ws.send(typeof o === "string" ? o : JSON.stringify(o)); };
const broadcast = (room, o, except) => { const s = JSON.stringify(o); for (const [id, ws] of room.peers) if (id !== except) send(ws, s); };

const server = http.createServer((req, res) => {
  if (req.url === "/status") {
    const list = [...rooms].map(([n, r]) => ({ sala: n, jogadores: r.peers.size }));
    res.writeHead(200, { "content-type": "application/json", "access-control-allow-origin": "*" });
    res.end(JSON.stringify({ ok: true, salas: list }));
    return;
  }
  res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  res.end("Servidor de Não sou um Slime Malvado funcionando.\n");
});

const wss = new WebSocketServer({ server, maxPayload: MAX_MSG });

wss.on("connection", (ws, req) => {
  const url = new URL(req.url, "http://x");
  const name = cleanRoom(url.searchParams.get("sala"));
  let room = rooms.get(name);
  if (!room) {
    if (rooms.size >= MAX_ROOMS) { send(ws, { t: "full", why: "servidor" }); ws.close(); return; }
    room = { peers: new Map(), host: null };
    rooms.set(name, room);
  }
  if (room.peers.size >= MAX_PLAYERS) { send(ws, { t: "full", max: MAX_PLAYERS }); ws.close(); return; }

  const id = "j" + (nextId++).toString(36);
  ws.id = id; ws.alive = true;
  room.peers.set(id, ws);
  const isHost = !room.host;
  if (isHost) room.host = id;
  send(ws, { t: "role", role: isHost ? "host" : "client", id, host: room.host, max: MAX_PLAYERS });
  console.log(`[${name}] entrou ${id} (${isHost ? "servidor" : "jogador"}) - ${room.peers.size} na sala`);

  ws.on("pong", () => { ws.alive = true; });

  ws.on("message", (data, isBinary) => {
    if (isBinary) return;
    let m; try { m = JSON.parse(data); } catch (e) { return; }
    if (!m || typeof m !== "object") return;
    if (m.t === "p" && m.d && typeof m.d === "object") {
      // só quem hospeda pode mandar o mundo (w)
      if (m.d.w && id !== room.host) delete m.d.w;
      broadcast(room, { t: "u", peer: id, d: m.d }, id);
    } else if (m.t === "bye") {
      ws.close();
    }
  });

  ws.on("close", () => leave(name, room, id));
  ws.on("error", () => leave(name, room, id));
});

function leave(name, room, id) {
  if (!room.peers.has(id)) return;
  room.peers.delete(id);
  broadcast(room, { t: "bye", peer: id });
  console.log(`[${name}] saiu ${id} - ${room.peers.size} na sala`);
  if (room.host === id) {
    room.host = room.peers.size ? room.peers.keys().next().value : null; // o mais antigo assume
    if (room.host) {
      send(room.peers.get(room.host), { t: "role", role: "host", id: room.host, host: room.host, max: MAX_PLAYERS });
      broadcast(room, { t: "host", host: room.host }, room.host);
      console.log(`[${name}] novo servidor: ${room.host}`);
    }
  }
  if (!room.peers.size) rooms.delete(name);
}

// conexões que caíram sem avisar são encerradas em até 20s
setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.alive) { ws.terminate(); continue; }
    ws.alive = false;
    try { ws.ping(); } catch (e) {}
  }
}, 10000);

server.listen(PORT, () => console.log(`Servidor do slime ouvindo na porta ${PORT} (até ${MAX_PLAYERS} por sala)`));
