<template>
  <div class="price-check">
    <!-- Painel de debug temporário -->
    <div class="debug-panel" style="position:fixed;bottom:0;left:0;width:100vw;background:#fff8e0;color:#333;padding:8px 12px;font-size:0.95em;z-index:999;border-top:1px solid #ff6600;">
      <div><b>DEBUG:</b></div>
      <div>Sync status: {{ debug.syncStatus }}</div>
      <div>Consulta IndexedDB: {{ debug.indexeddbResult }}</div>
      <div>Consulta API: {{ debug.apiResult }}</div>
      <div>Erro: {{ debug.error }}</div>
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
import { ref, onMounted, onUnmounted, nextTick, reactive } from 'vue'
import axios from 'axios'
import { getProduct, saveProduct, saveProducts, clearProducts } from '../indexeddb.js'

const barcode = ref('')
const product = ref(null)
const API_BASE = import.meta.env.VITE_API_URL || ''
const isOnline = ref(navigator.onLine)
const barcodeInput = ref(null)
window.addEventListener('online', () => isOnline.value = true)
window.addEventListener('offline', () => isOnline.value = false)

// Painel de debug
const debug = reactive({
  syncStatus: 'Aguardando...',
  indexeddbResult: '',
  apiResult: '',
  error: ''
})

function onInputFocus() {
  // Força teclado numérico em iOS/Safari
  if (barcodeInput.value) {
    barcodeInput.value.setAttribute('inputmode', 'numeric')
    barcodeInput.value.setAttribute('pattern', '[0-9]*')
  }
}
function onInputBlur() {}


// Garantir consulta ao clicar no botão e ao pressionar enter
function handleConsult() {
  checkPrice();
  // Força foco no input após consulta para facilitar uso em dispositivos móveis
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
      debug.syncStatus = `Catálogo sincronizado: ${response.data.length} produtos.`
    } else {
      debug.syncStatus = 'Falha ao sincronizar catálogo: resposta inválida.'
    }
  } catch (e) {
    debug.syncStatus = 'Falha ao sincronizar catálogo.'
    debug.error = e.message || e
  }
}


let syncInterval = null
onMounted(() => {
  barcode.value = ''
  product.value = null
  // Sincroniza catálogo ao iniciar
  syncCatalog()
  // Sincronização periódica: 2x ao dia (a cada 12 horas)
  syncInterval = setInterval(syncCatalog, 12 * 60 * 60 * 1000)
})
onUnmounted(() => {
  if (syncInterval) clearInterval(syncInterval)
})

async function checkPrice() {
  const code = barcode.value.trim()
  debug.error = ''
  debug.indexeddbResult = ''
  debug.apiResult = ''
  if (!code) {
    product.value = null
    debug.indexeddbResult = 'Código vazio.'
    return
  }
  // Consulta IndexedDB primeiro
  const localProduct = await getProduct(code)
  debug.indexeddbResult = localProduct ? JSON.stringify(localProduct) : 'Produto não encontrado no IndexedDB.'
  if (localProduct && localProduct.name) {
    product.value = localProduct
    return
  }
  // Se offline, nunca tenta consultar API
  if (!isOnline.value) {
    product.value = null
    debug.apiResult = 'Modo offline: não consultou API.'
    alert('Produto não encontrado! (offline)')
    return
  }
  // Consulta API se online
  try {
    const url = `${API_BASE}/product/${code}`
    const response = await axios.get(url)
    debug.apiResult = response.data ? JSON.stringify(response.data) : 'Produto não encontrado na API.'
    if (response.data && response.data.name) {
      product.value = response.data
      await saveProduct(response.data)
    } else {
      product.value = null
      alert('Produto não encontrado!')
    }
  } catch (error) {
    debug.error = error.message || error
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
</style>
