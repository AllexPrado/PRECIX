<template>
  <div class="price-check-container">
    <!-- Ícone de configurações e Modal UUID (sem alterações) -->
    <button class="settings-btn" @click="showUUIDModal = true" title="Configurações">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .66.39 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.66 0 1.26.39 1.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.26.39-1.51 1z"/></svg>
    </button>
    <div v-if="showUUIDModal" class="uuid-modal-bg" @click.self="showUUIDModal = false">
      <div class="uuid-modal">
        <h3>Identificador do Dispositivo</h3>
        <div class="uuid-box">
          <template v-if="uuidLocal && uuidLocal.length > 0">{{ uuidLocal }}</template>
          <template v-else><span style="color:#aaa;">UUID não gerado</span></template>
        </div>
        <button class="copy-btn" @click="copyUUID" :disabled="!uuidLocal">{{ copied ? 'Copiado!' : 'Copiar UUID' }}</button>
        <button class="close-btn" @click="showUUIDModal = false">Fechar</button>
      </div>
    </div>

    <!-- Status de conexão -->
    <div class="connection-status-top" :class="{ online: isOnline, offline: !isOnline }">
      <span v-if="isOnline">● Online</span>
      <span v-else>● Offline</span>
    </div>

    <!-- Conteúdo principal centralizado -->
    <main class="main-content">
      <div class="glass-card">
        <div class="logo-mascot-row">
          <img src="/logo-sonda.png" alt="Sonda Supermercados" class="main-logo" />
          <img src="/mascote-sonda.jpg" alt="Mascote Sonda" class="mascot" />
        </div>
        <div class="input-row">
          <input 
            type="text" 
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="Escaneie ou digite o código" 
            v-model="barcode"
            @keyup.enter="handleConsult"
            @focus="onInputFocus"
            @blur="onInputBlur"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            ref="barcodeInput"
          />
          <button @click="handleConsult">
            <span>Consultar</span>
          </button>
        </div>
        <transition name="fade">
          <div v-if="product" class="result-card">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">
              <span>R$</span>{{ product.price.split(',')[0] }}<span>,{{ product.price.split(',')[1] }}</span>
            </div>
            <div v-if="product.promo" class="promo-badge">{{ product.promo }}</div>
          </div>
        </transition>
      </div>
    </main>

    <!-- Rodapé fixo -->
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Sonda Supermercados</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, watch } from 'vue'
import axios from 'axios'
import { getProduct, saveProduct, saveProducts, clearProducts } from '../indexeddb.js'

const deviceUUID = inject('deviceUUID')
const showUUIDModal = ref(false)
const copied = ref(false)
const uuidLocal = ref('')

watch(deviceUUID, (val) => {
  uuidLocal.value = val
}, { immediate: true })

function copyUUID() {
  if (uuidLocal.value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(uuidLocal.value)
      copied.value = true
      setTimeout(() => copied.value = false, 1200)
    } else {
      // Fallback para dispositivos sem clipboard API
      const el = document.createElement('textarea')
      el.value = uuidLocal.value
      document.body.appendChild(el)
      el.select()
      try {
        document.execCommand('copy')
        copied.value = true
        setTimeout(() => copied.value = false, 1200)
      } catch (e) {
        alert('Copie manualmente o UUID selecionado.')
      }
      document.body.removeChild(el)
    }
  }
}

const barcode = ref('')
const product = ref(null)
const API_BASE = import.meta.env.VITE_API_URL || ''
const isOnline = ref(navigator.onLine)
const barcodeInput = ref(null)
window.addEventListener('online', () => isOnline.value = true)
window.addEventListener('offline', () => isOnline.value = false)

function onInputFocus() {
  if (barcodeInput.value) {
    barcodeInput.value.setAttribute('inputmode', 'numeric')
    barcodeInput.value.setAttribute('pattern', '[0-9]*')
  }
}
function onInputBlur() {}

function handleConsult() {
  checkPrice();
  nextTick(() => {
    if (barcodeInput.value) barcodeInput.value.focus();
  });
}

// Sincroniza todo o catálogo do backend para o IndexedDB
async function syncCatalog() {
  try {
    const url = `${API_BASE}/product/all`
    const response = await axios.get(url)
    if (Array.isArray(response.data)) {
      await clearProducts()
      await saveProducts(response.data)
      // Notifica backend sobre sync do catálogo
      try {
        const identifier = deviceUUID?.value || ''
        if (identifier) {
          await fetch(`${API_BASE}/admin/devices/events/catalog-sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, total_products: response.data.length })
          })
        }
      } catch {}
    } else {
      // debug removido
    }
  } catch (e) {
    // debug removido
  }
}

let syncInterval = null
onMounted(() => {
  barcode.value = ''
  product.value = null
  syncCatalog()
  syncInterval = setInterval(syncCatalog, 12 * 60 * 60 * 1000)
})
onUnmounted(() => {
  if (syncInterval) clearInterval(syncInterval)
})

async function checkPrice() {
  const code = barcode.value.trim()
  if (!code) {
    product.value = null
    return
  }
  // Consulta IndexedDB primeiro
  const localProduct = await getProduct(code)
  if (localProduct && localProduct.name) {
    product.value = localProduct
    // Emite evento de consulta OK (offline/local)
    try {
      const identifier = deviceUUID?.value || ''
      if (identifier) {
        await fetch(`${API_BASE}/admin/devices/events/price-query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, barcode: code, ok: true, price: localProduct.price })
        })
      }
    } catch {}
    return
  }
  // Se offline, nunca tenta consultar API
  if (!isOnline.value) {
    product.value = null
    alert('Produto não encontrado! (offline)')
    // Emite evento de consulta FAIL (offline)
    try {
      const identifier = deviceUUID?.value || ''
      if (identifier) {
        await fetch(`${API_BASE}/admin/devices/events/price-query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, barcode: code, ok: false, error: 'offline' })
        })
      }
    } catch {}
    return
  }
  // Consulta API se online
  try {
    const url = `${API_BASE}/product/${code}`
    const response = await axios.get(url)
    if (response.data && response.data.name) {
      product.value = response.data
      await saveProduct(response.data)
      // Emite evento OK (API)
      try {
        const identifier = deviceUUID?.value || ''
        if (identifier) {
          await fetch(`${API_BASE}/admin/devices/events/price-query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, barcode: code, ok: true, price: response.data.price })
          })
        }
      } catch {}
    } else {
      product.value = null
      alert('Produto não encontrado!')
      try {
        const identifier = deviceUUID?.value || ''
        if (identifier) {
          await fetch(`${API_BASE}/admin/devices/events/price-query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, barcode: code, ok: false, error: 'not_found' })
          })
        }
      } catch {}
    }
  } catch (error) {
    product.value = null
    alert('Produto não encontrado! (erro de rede)')
    try {
      const identifier = deviceUUID?.value || ''
      if (identifier) {
        await fetch(`${API_BASE}/admin/devices/events/price-query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, barcode: code, ok: false, error: 'network' })
        })
      }
    } catch {}
  }
}
</script>

<style scoped>
.price-check-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #fff 60%, #fff3e0 100%);
  padding: 
    env(safe-area-inset-top, 18px)
    env(safe-area-inset-right, 24px)
    env(safe-area-inset-bottom, 10px)
    env(safe-area-inset-left, 24px);
}

.main-content {
  flex: 1; /* Ocupa todo o espaço disponível */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.connection-status-top {
  position: absolute;
  top: calc(env(safe-area-inset-top, 0px) + 18px);
  right: calc(env(safe-area-inset-right, 0px) + 24px);
  font-size: 1em;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 12px;
  z-index: 10;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 2px 8px #0001;
  color: #008000;
  transition: color 0.2s, background 0.2s;
}
.connection-status-top.offline {
  color: #d00000;
  background: #ffeaea;
}

.glass-card {
  background: rgba(255,255,255,0.85);
  border-radius: 32px;
  box-shadow: 0 8px 40px 0 #ff66002a, 0 1.5px 8px #ff66001a;
  padding: 48px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  backdrop-filter: blur(2.5px);
  animation: glassIn 0.7s cubic-bezier(.4,1.4,.6,1) 1;
}

.logo-mascot-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  justify-content: center;
}

.main-logo {
  width: 160px;
  height: auto;
  filter: drop-shadow(0 2px 8px #ff66001a);
}

.mascot {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px #ff66001a;
  border: 2px solid #FF6600;
  background: #fff3e0;
}

.input-row {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-bottom: 16px;
}

input {
  flex-grow: 1;
  padding: 15px 18px;
  font-size: 1.1rem;
  border: 2px solid #FF6600;
  border-radius: 12px;
  background: #fff;
  color: #333;
  box-shadow: 0 2px 8px #ff66001a;
  transition: border 0.2s, box-shadow 0.2s;
  outline: none;
  min-width: 0; /* Previne overflow em flex container */
}

input:focus {
  border-color: #FF4500;
  box-shadow: 0 4px 12px #ff66002a;
}

.input-row button {
  background: linear-gradient(90deg, #FF6600 60%, #FF9900 100%);
  color: #fff;
  border-radius: 12px;
  padding: 0 28px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px #ff66001a;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.input-row button:hover {
  background: linear-gradient(90deg, #FF4500 60%, #FF9900 100%);
  box-shadow: 0 4px 16px #ff66002a;
  transform: translateY(-2px) scale(1.03);
}

.result-card {
  margin-top: 24px;
  background: transparent;
  border-radius: 18px;
  border: none;
  box-shadow: none;
  padding: 0;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.2px;
}

.product-price {
  font-size: 4.5rem;
  font-weight: 800;
  color: #FF6600;
  line-height: 1;
}

.product-price span:first-child {
  font-size: 2rem;
  font-weight: 600;
  vertical-align: super;
  margin-right: 4px;
}
.product-price span:last-child {
  font-size: 2.5rem;
  font-weight: 700;
}

.promo-badge {
  background: linear-gradient(90deg, #FF6600 60%, #FF9900 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 8px;
  padding: 7px 18px;
  margin-top: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 8px #ff66001a;
  display: inline-block;
}

.footer {
  width: 100%;
  padding: 10px 0 0 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  flex-shrink: 0; /* Impede que o rodapé encolha */
}

@media (max-width: 600px) {
  .glass-card {
    padding: 24px 18px;
    border-radius: 24px;
  }
  
  .main-logo {
    width: 140px;
  }
  
  .mascot {
    width: 40px;
    height: 40px;
  }
  
  .input-row {
    flex-direction: column;
    align-items: center; /* Centraliza o conteúdo */
    gap: 16px;
  }

  .input-row input {
    text-align: center;
  }

  .input-row button {
    width: 80%; /* Define uma largura para o botão */
    max-width: 280px;
  }

  .product-name {
    font-size: 1.3rem;
  }

  .product-price {
    font-size: 3.5rem;
  }

  .product-price span:first-child {
    font-size: 1.5rem;
  }
  .product-price span:last-child {
    font-size: 2rem;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glassIn {
  from { opacity: 0; transform: scale(0.95) translateY(30px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.settings-btn {
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 18px);
  right: calc(env(safe-area-inset-right, 0px) + 18px);
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px #ff66001a;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  transition: box-shadow 0.2s, background 0.2s;
}
.settings-btn:hover {
  background: #fff3e0;
  box-shadow: 0 4px 16px #ff66002a;
}
.uuid-modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.uuid-modal {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 40px #ff66002a;
  padding: 32px 24px 24px 24px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  animation: fadeIn 0.3s;
}
.uuid-box {
  font-family: monospace;
  font-size: 1.1em;
  background: #fff8e0;
  border: 1px solid #ff6600;
  border-radius: 8px;
  padding: 12px 8px;
  margin: 18px 0 18px 0;
  word-break: break-all;
  user-select: all;
  color: #FF6600;
  font-weight: bold;
}
.copy-btn {
  background: linear-gradient(90deg, #FF6600 60%, #FF9900 100%);
  color: #fff;
  border-radius: 8px;
  padding: 8px 22px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-right: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px #ff66001a;
  transition: background 0.2s, box-shadow 0.2s;
}
.copy-btn:disabled {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
}
.copy-btn:hover:enabled {
  background: linear-gradient(90deg, #FF4500 60%, #FF9900 100%);
  box-shadow: 0 4px 16px #ff66002a;
}
.close-btn {
  background: #eee;
  color: #333;
  border-radius: 8px;
  padding: 8px 22px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px #ff66001a;
  transition: background 0.2s, box-shadow 0.2s;
}
.close-btn:hover {
  background: #fff3e0;
  box-shadow: 0 4px 16px #ff66002a;
}
</style>
