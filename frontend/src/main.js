import { createApp } from 'vue'
import './style.css'
import './assets/global.css'
import App from './App.vue'
import { saveDeviceUUID, getDeviceUUID } from './indexeddb.js'


// ID do equipamento: só envia heartbeat se for dispositivo real
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Gera e salva um UUID único para identificar o dispositivo
async function ensureDeviceUUID() {
  let uuid = localStorage.getItem('precix_device_id');
  if (!uuid) {
    uuid = generateUUID();
    localStorage.setItem('precix_device_id', uuid);
    await saveDeviceUUID(uuid);
  } else {
    // Sincroniza IndexedDB se necessário
    const dbUuid = await getDeviceUUID();
    if (!dbUuid) {
      await saveDeviceUUID(uuid);
    }
  }
  return uuid;
}

// Função para registrar dispositivo no backend
async function registerDeviceIfNeeded(deviceId) {
  try {
    // Verifica se já existe no backend
    const res = await fetch(`http://192.168.18.7:8000/admin/devices`);
    const devices = await res.json();
    if (!devices.find(d => d.identifier === deviceId)) {
      // Registrar novo dispositivo
      await fetch(`http://192.168.18.7:8000/admin/devices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          store_id: 1, // Ajuste para a loja correta
          name: navigator.userAgent,
          identifier: deviceId
        })
      });
    }
  } catch (e) {
    // Exibe erro no console para debug
    console.warn('Erro ao registrar dispositivo:', e);
  }
}

let DEVICE_ID;
ensureDeviceUUID().then(async id => {
  DEVICE_ID = id;
  await registerDeviceIfNeeded(DEVICE_ID);
  // Heartbeat: só envia se DEVICE_ID estiver definido e não for ambiente admin/PC
  function sendHeartbeat() {
    if (DEVICE_ID && DEVICE_ID !== 'admin' && DEVICE_ID !== 'pc') {
      fetch(`http://192.168.18.7:8000/device/heartbeat/${DEVICE_ID}`, { method: 'POST' })
        .catch(() => {})
    }
  }
  if (DEVICE_ID && DEVICE_ID !== 'admin' && DEVICE_ID !== 'pc') {
    setInterval(sendHeartbeat, 30000)
    sendHeartbeat()
  }
})

// Registrar o service worker para PWA/offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.warn('Erro ao registrar Service Worker:', err));
  });
}

createApp(App).mount('#app')
