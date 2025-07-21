<template>
  <div class="price-check">
    <!-- Ícone de configurações -->
    <button class="settings-btn" @click="showUUIDModal = true" title="Configurações">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .66.39 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.66 0 1.26.39 1.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.26.39-1.51 1z"/></svg>
    </button>
    <!-- Modal UUID -->
    <div v-if="showUUIDModal" class="uuid-modal-bg" @click.self="showUUIDModal = false">
      <div class="uuid-modal">
        <h3>Identificador do Dispositivo</h3>
        <div class="uuid-box">
          <template v-if="uuidLocal && uuidLocal.length > 0">
            {{ uuidLocal }}
          </template>
          <template v-else>
            <span style="color:#aaa;">UUID não gerado</span>
          </template>
        </div>
        <button class="copy-btn" @click="copyUUID" :disabled="!uuidLocal">{{ copied ? 'Copiado!' : 'Copiar UUID' }}</button>
        <button class="close-btn" @click="showUUIDModal = false">Fechar</button>
      </div>
    </div>
    <!-- Status de conexão discreto no topo direito -->
    <div class="connection-status-top" :class="{ online: isOnline, offline: !isOnline }">
      <span v-if="isOnline">● Online</span>
      <span v-else>● Offline</span>
    </div>
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
          <div class="product-price">Preço: <span>R$ {{ product.price }}</span></div>
          <div v-if="product.promo" class="promo-badge">{{ product.promo }}</div>
        </div>
      </transition>
    </div>
    <div class="footer">
      <p>© {{ new Date().getFullYear() }} Sonda Supermercados</p>
    </div>
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
    return
  }
  // Se offline, nunca tenta consultar API
  if (!isOnline.value) {
    product.value = null
    alert('Produto não encontrado! (offline)')
    return
  }
  // Consulta API se online
  try {
    const url = `${API_BASE}/product/${code}`
    const response = await axios.get(url)
    if (response.data && response.data.name) {
      product.value = response.data
      await saveProduct(response.data)
    } else {
      product.value = null
      alert('Produto não encontrado!')
    }
  } catch (error) {
    product.value = null
    alert('Produto não encontrado! (erro de rede)')
  }
}
</script>

<style scoped>
.connection-status-top {
  position: absolute;
  top: 18px;
  right: 24px;
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
.price-check {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff 60%, #fff3e0 100%);
  box-sizing: border-box;
  overflow: hidden;
}

.glass-card {
  background: rgba(255,255,255,0.85);
  border-radius: 32px;
  box-shadow: 0 8px 40px 0 #ff66002a, 0 1.5px 8px #ff66001a;
  padding: 48px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 420px;
  width: 100vw;
  margin: 0 auto;
  backdrop-filter: blur(2.5px);
  animation: glassIn 0.7s cubic-bezier(.4,1.4,.6,1) 1;
}

.logo-mascot-row {
  display: flex;
  align-items: center;
  gap: 2vw;
  margin-bottom: 3vh;
  justify-content: center;
}

.main-logo {
  width: 160px;
  max-width: 40vw;
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

.connection-status {
  font-weight: bold;
  margin-bottom: 12px;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-block;
}
.connection-status.online {
  background: #e6ffe6;
  color: #008000;
}
.connection-status.offline {
  background: #ffeaea;
  color: #d00000;
}

.input-row {
  display: flex;
  flex-direction: row;
  gap: 1vw;
  width: 100%;
  max-width: 350px;
  margin-bottom: 2vh;
  justify-content: center;
}

input {
  flex: 1 1 0;
  padding: 15px 18px;
  font-size: 1.1rem;
  border: 2px solid #FF6600;
  border-radius: 12px;
  background: #fff;
  color: #333;
  box-shadow: 0 2px 8px #ff66001a;
  transition: border 0.2s, box-shadow 0.2s;
  outline: none;
}

input:focus {
  border-color: #FF4500;
  box-shadow: 0 4px 12px #ff66002a;
}

button {
  background: linear-gradient(90deg, #FF6600 60%, #FF9900 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0 28px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px #ff66001a;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background: linear-gradient(90deg, #FF4500 60%, #FF9900 100%);
  box-shadow: 0 4px 16px #ff66002a;
  transform: translateY(-2px) scale(1.03);
}

.result-card {
  margin-top: 2vh;
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  border: 2px solid #FF6600;
  box-shadow: 0 6px 24px #ff66001a;
  padding: 22px 18px 14px 18px;
  min-width: 180px;
  max-width: 320px;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #FF6600;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.product-price {
  font-size: 1.1rem;
  color: #222;
  margin-bottom: 10px;
}

.product-price span {
  font-weight: 700;
  color: #2d3a4a;
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
  margin-top: 2vh;
  background: #f0f0f0;
  width: 100vw;
  padding: 10px 0 6px 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 600px) {
  .glass-card {
    padding: 18px 2vw 12px 2vw;
    min-width: unset;
    max-width: 98vw;
  }
  
  .main-logo {
    width: 110px;
    max-width: 60vw;
  }
  
  .mascot {
    width: 32px;
    height: 32px;
  }
  
  .input-row {
    flex-direction: column;
    gap: 12px;
    max-width: 98vw;
  }
  
  .result-card {
    padding: 12px 2vw 8px 2vw;
    min-width: unset;
    max-width: 98vw;
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
  bottom: 18px;
  right: 18px;
  background: #fff;
  border: none;
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
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.uuid-modal {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 40px #ff66002a;
  padding: 32px 24px 24px 24px;
  min-width: 320px;
  max-width: 90vw;
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
  color: #FF6600; /* Deixa o UUID bem visível */
  font-weight: bold;
}
.copy-btn {
  background: linear-gradient(90deg, #FF6600 60%, #FF9900 100%);
  color: #fff;
  border: none;
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
  border: none;
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
