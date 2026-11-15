/* Não sou um Slime Malvado: guarda o jogo no aparelho para abrir e jogar sozinho sem internet.
   O jogo em si (index.html) vem da internet primeiro, para pegar as atualizações; sem internet, usa a cópia guardada.
   A fonte e a biblioteca da conexão online vêm da cópia guardada primeiro. */
const CACHE="nsm-v1";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
const EXT=/(^|\.)(unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/;
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* internet lenta ou "conectado sem internet": desiste da rede depois de alguns segundos */
const withTimeout=(p,ms)=>new Promise((ok,no)=>{const t=setTimeout(()=>no(new Error("timeout")),ms);p.then(r=>{clearTimeout(t);ok(r)},e=>{clearTimeout(t);no(e)})});
const keep=(req,res)=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(CACHE).then(c=>c.put(req,cp))}return res};
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET")return;const u=new URL(req.url);
 if(u.origin===self.location.origin){
  e.respondWith(withTimeout(fetch(req),8000).then(res=>keep(req,res)).catch(()=>caches.match(req,{ignoreSearch:true}).then(m=>m||caches.match("./index.html"))));return}
 if(EXT.test(u.hostname))e.respondWith(caches.match(req).then(m=>m||fetch(req).then(res=>keep(req,res))))});
