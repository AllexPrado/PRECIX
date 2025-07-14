import { createApp } from 'vue'
import './style.css'
import './assets/global.css'
import App from './App.vue'

createApp(App).mount('#app')

// Registrar o service worker para PWA/offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.warn('Erro ao registrar Service Worker:', err));
  });
}
