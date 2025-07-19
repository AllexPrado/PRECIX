const CACHE_NAME = 'precix-cache-v4';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo-sonda.png',
  '/mascote-sonda.jpg',
  '/Promocao-aniversario-Sonda.jpeg',
  '/sonda-frutas.jpeg',
  '/vite.svg',
  // ...existing code...
];

// Cache dinâmico de todos os assets do build (JS/CSS/etc)
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(FILES_TO_CACHE);
      // Busca todos os assets da pasta /assets/ (JS/CSS)
      try {
        const assets = [
          '/assets/index-B2qM5wkQ.js',
          '/assets/index-og7CZllX.css',
          // Adicione outros arquivos do build aqui se necessário
        ];
        await cache.addAll(assets);
      } catch (e) {
        // ignora erro se algum asset não existir
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Serve assets do cache (cache first)
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
    return;
  }
  // Navegação SPA: sempre retorna index.html do cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((response) => {
        if (response) return response;
        return caches.match(self.registration.scope + 'index.html').then((alt) => {
          if (alt) return alt;
          return fetch(event.request).catch(() => new Response('Offline', { status: 503, statusText: 'Offline' }));
        });
      })
    );
    return;
  }
  // Demais arquivos: cache first
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
