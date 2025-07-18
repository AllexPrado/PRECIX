// Service worker funcional para PWA offline
const CACHE_NAME = 'precix-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/logo-sonda.png',
  '/mascote-sonda.jpg',
  '/assets/global.css',
  '/src/style.css',
  '/product/all',
  '/Promocao-aniversario-Sonda.jpeg',
  '/sonda-frutas.jpeg',
  '/portfolio-sonda.jpg',
  // Adicione outros arquivos essenciais aqui
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Se offline e não achou no cache, retorna index.html para SPA
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
