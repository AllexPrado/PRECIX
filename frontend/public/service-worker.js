// Service worker placeholder for PWA. Replace with real implementation if needed.
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  self.clients.claim();
});
