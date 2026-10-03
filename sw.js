var C="apex-parents-v2";
var F=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return c.add(u).catch(function(){})}))}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET"||r.url.indexOf(self.location.origin)!==0)return;
e.respondWith(fetch(r).then(function(res){if(res&&res.status===200){var c=res.clone();caches.open(C).then(function(x){x.put(r,c)})}return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("./index.html")})}))});
