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


// Função para buscar a loja vinculada ao UUID do dispositivo
async function fetchStoreByDeviceUUID(deviceId) {
  if (!navigator.onLine) return;
  try {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://192.168.18.7:8000';
    const resp = await fetch(`${API_BASE}/device/store/${deviceId}`);
    if (resp.ok) {
      const data = await resp.json();
      // Compatibilidade: aceita tanto store_code quanto store_codigo
      const codigo = data.store_code || data.store_codigo;
      if (data && codigo) {
        localStorage.setItem('precix_store_codigo', codigo);
        localStorage.setItem('precix_store_nome', data.store_name);
        return codigo;
      } else {
        alert('Este equipamento não está vinculado a uma loja. Solicite ao administrador.');
      }
    }
  } catch (e) {
    console.warn('Erro ao buscar loja vinculada ao dispositivo:', e);
  }
}

let DEVICE_ID;
ensureDeviceUUID().then(async id => {
  DEVICE_ID = id;
  await fetchStoreByDeviceUUID(DEVICE_ID);
  // Heartbeat: só envia se DEVICE_ID estiver definido e não for ambiente admin/PC
  function sendHeartbeat() {
    if (DEVICE_ID && DEVICE_ID !== 'admin' && DEVICE_ID !== 'pc' && navigator.onLine) {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://192.168.18.7:8000';
      fetch(`${API_BASE}/device/heartbeat/${DEVICE_ID}`, { method: 'POST' })
        .catch(() => {})
    }
  }
  if (DEVICE_ID && DEVICE_ID !== 'admin' && DEVICE_ID !== 'pc') {
    setInterval(sendHeartbeat, 30000)
    sendHeartbeat()
  }
})

// Registrar o service worker para PWA/offline (temporariamente desabilitado para debug)
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.warn('Erro ao registrar Service Worker:', err));
  });
}
*/


// --- PING PERIÓDICO PARA DETECTAR RETORNO DO FRONTEND ---
// Só executa em ambiente de dispositivo (não admin/pc)
if (typeof window !== 'undefined') {
  let wasOffline = false;
  const API_BASE = import.meta.env.VITE_API_URL || 'http://192.168.18.7:8000';
  // Função para checar se o frontend está acessível
  async function checkFrontendOnline() {
    try {
      // Tenta buscar um arquivo estático do frontend
      const res = await fetch('/index.html', { cache: 'no-store' });
      if (res.ok) {
        if (wasOffline) {
          // Se estava offline e voltou, força reload
          window.location.reload();
        }
        wasOffline = false;
      } else {
        wasOffline = true;
      }
    } catch (e) {
      wasOffline = true;
    }
  }
  // Checa a cada 10 segundos
  setInterval(checkFrontendOnline, 10000);
}

createApp(App).mount('#app')
