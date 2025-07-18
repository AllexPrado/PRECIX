// Service worker que se auto-remove para permitir debugging
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => caches.delete(k)) // Remove todos os caches
    )).then(() => {
      return self.registration.unregister(); // Remove o service worker
    })
  );
  self.clients.claim();
});
