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
              <span>R$</span>{{ formatPrice(product.price) }}
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
const resetTimeout = ref(null)
window.addEventListener('online', () => isOnline.value = true)
window.addEventListener('offline', () => isOnline.value = false)

function onInputFocus() {
  if (barcodeInput.value) {
    barcodeInput.value.setAttribute('inputmode', 'numeric')
    barcodeInput.value.setAttribute('pattern', '[0-9]*')
  }
}
function onInputBlur() {}

function resetScreen() {
  barcode.value = ''
  product.value = null
  if (barcodeInput.value) barcodeInput.value.focus()
}

function handleConsult() {
  checkPrice();
  nextTick(() => {
    if (barcodeInput.value) barcodeInput.value.focus();
  });
  if (resetTimeout.value) clearTimeout(resetTimeout.value)
  resetTimeout.value = setTimeout(() => {
    resetScreen()
  }, 10000) // 10 segundos
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
// Limpa o timer ao desmontar
onUnmounted(() => {
  if (syncInterval) clearInterval(syncInterval)
  if (resetTimeout.value) clearTimeout(resetTimeout.value)
})

function formatPrice(price) {
  if (typeof price === 'number') {
    return price.toFixed(2).replace('.', ',');
  }
  if (typeof price === 'string') {
    // Se já está no formato correto
    if (price.includes(',')) return price;
    // Se está com ponto decimal
    if (price.includes('.')) return price.replace('.', ',');
    // Se é inteiro
    return price + ',00';
  }
  return '--';
}

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
  min-height: 100vh;
  min-height: 100dvh; /* Altura dinâmica do viewport */
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #fff 60%, #fff3e0 100%);
  padding: 
    clamp(12px, env(safe-area-inset-top) + 3vw, 24px)
    clamp(16px, env(safe-area-inset-right) + 4vw, 32px)
    clamp(8px, env(safe-area-inset-bottom) + 2vw, 16px)
    clamp(16px, env(safe-area-inset-left) + 4vw, 32px);
  container-type: inline-size; /* Habilita container queries */
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: min(1200px, 95vw); /* Responsivo e limita largura */
  margin: 0 auto;
  width: 100%;
  padding: clamp(16px, 4vw, 40px); /* Padding responsivo */
  box-sizing: border-box;
  gap: clamp(16px, 3vw, 32px); /* Espaçamento responsivo */
}

.connection-status-top {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 1em;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 12px;
  z-index: 100;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  color: #008000;
  transition: color 0.2s, background 0.2s;
  backdrop-filter: blur(4px);
}
.connection-status-top.offline {
  color: #d00000;
  background: #ffeaea;
}

.glass-card {
  background: rgba(255,255,255,0.9);
  border-radius: clamp(20px, 5vw, 40px); /* Border radius responsivo */
  box-shadow: 
    0 8px 40px 0 rgba(255, 102, 0, 0.15),
    0 1.5px 8px rgba(255, 102, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset; /* Borda interna sutil */
  padding: clamp(24px, 6vw, 56px) clamp(20px, 5vw, 48px) clamp(20px, 5vw, 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: min(480px, 90vw); /* Largura responsiva */
  backdrop-filter: blur(8px) saturate(1.2); /* Efeito glass melhorado */
  -webkit-backdrop-filter: blur(8px) saturate(1.2); /* Safari */
  animation: glassIn 0.8s cubic-bezier(.2,1.2,.3,1) 1;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.3); /* Borda glass effect */
}

.logo-mascot-row {
  display: flex;
  align-items: center;
  gap: clamp(12px, 3vw, 20px); /* Gap responsivo */
  margin-bottom: clamp(16px, 4vw, 32px); /* Margin responsivo */
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.main-logo {
  width: clamp(120px, 25vw, 200px); /* Tamanho responsivo */
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(255, 102, 0, 0.2));
  max-width: 100%;
  transition: transform 0.3s ease, filter 0.3s ease; /* Animação suave */
}

.main-logo:hover {
  transform: scale(1.02); /* Micro-interação */
  filter: drop-shadow(0 6px 16px rgba(255, 102, 0, 0.3));
}

.mascot {
  width: clamp(36px, 8vw, 64px); /* Tamanho responsivo */
  height: clamp(36px, 8vw, 64px);
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 
    0 4px 12px rgba(255, 102, 0, 0.2),
    0 0 0 2px #FF6600,
    0 0 0 4px rgba(255, 255, 255, 0.5); /* Múltiplas sombras */
  border: 2px solid #fff;
  background: #fff3e0;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mascot:hover {
  transform: scale(1.05);
  box-shadow: 
    0 6px 16px rgba(255, 102, 0, 0.3),
    0 0 0 2px #FF4500,
    0 0 0 4px rgba(255, 255, 255, 0.7);
}

.input-row {
  display: flex;
  gap: clamp(8px, 2vw, 16px); /* Gap responsivo */
  width: 100%;
  max-width: min(600px, 85vw); /* Largura máxima responsiva */
  margin-bottom: clamp(12px, 3vw, 24px);
  align-items: stretch;
  flex-direction: row; /* Sempre horizontal, melhor UX */
}

/* Container queries para input-row quando disponível */
@container (max-width: 400px) {
  .input-row {
    flex-direction: column;
    gap: 12px;
  }
}

input {
  flex-grow: 1;
  padding: clamp(12px, 3vw, 18px) clamp(14px, 3.5vw, 22px);
  font-size: clamp(1rem, 2.5vw, 1.2rem); /* Font size responsivo */
  border: 2px solid #FF6600;
  border-radius: clamp(8px, 2vw, 16px);
  background: #fff;
  color: #333;
  box-shadow: 
    0 2px 8px rgba(255, 102, 0, 0.1),
    0 0 0 0 rgba(255, 102, 0, 0.2) inset; /* Sombra interna inicial */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Transição suave */
  outline: none;
  min-width: 0;
  height: auto;
  font-weight: 500;
  letter-spacing: 0.5px;
}

input::placeholder {
  color: #999;
  font-weight: 400;
  transition: opacity 0.3s ease;
}

input:focus {
  border-color: #FF4500;
  box-shadow: 
    0 4px 16px rgba(255, 102, 0, 0.2),
    0 0 0 4px rgba(255, 102, 0, 0.1) inset;
  transform: translateY(-1px); /* Micro elevação */
}

input:focus::placeholder {
  opacity: 0.6;
}

.input-row button {
  background: linear-gradient(135deg, #FF6600 0%, #FF4500 100%);
  color: #fff;
  border-radius: clamp(8px, 2vw, 16px);
  padding: clamp(12px, 3vw, 18px) clamp(20px, 5vw, 32px);
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 700;
  cursor: pointer;
  box-shadow: 
    0 4px 12px rgba(255, 102, 0, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: clamp(100px, 20vw, 140px);
  border: none;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  position: relative;
  overflow: hidden;
}

.input-row button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.input-row button:hover {
  background: linear-gradient(135deg, #FF4500 0%, #FF6600 100%);
  box-shadow: 
    0 6px 20px rgba(255, 102, 0, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px) scale(1.02);
}

.input-row button:hover:before {
  left: 100%;
}

.input-row button:active {
  transform: translateY(0) scale(0.98);
  transition: transform 0.1s;
}

.result-card {
  margin-top: clamp(16px, 4vw, 32px);
  background: rgba(255, 255, 255, 0.6);
  border-radius: clamp(12px, 3vw, 24px);
  border: 1px solid rgba(255, 102, 0, 0.1);
  box-shadow: 
    0 8px 32px rgba(255, 102, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  padding: clamp(20px, 5vw, 40px) clamp(16px, 4vw, 32px);
  width: 100%;
  text-align: center;
  animation: slideUpFade 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(8px, 2vw, 16px);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.product-name {
  font-size: clamp(1.2rem, 4vw, 2rem);
  font-weight: 600;
  color: #333;
  letter-spacing: 0.3px;
  line-height: 1.3;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.product-price {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  color: #FF6600;
  line-height: 1;
  margin: clamp(8px, 2vw, 16px) 0;
  text-shadow: 0 2px 4px rgba(255, 102, 0, 0.2);
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: clamp(2px, 0.5vw, 6px);
}

.product-price span:first-child {
  font-size: clamp(1.2rem, 3vw, 2.2rem);
  font-weight: 600;
  opacity: 0.8;
}

.product-price span:last-child {
  font-size: clamp(1.5rem, 4vw, 2.8rem);
  font-weight: 700;
  opacity: 0.9;
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

/* Micro devices - Smartwatches, very small phones */
@media (max-width: 280px) {
  .glass-card {
    padding: 16px 12px;
    border-radius: 16px;
  }
  
  .logo-mascot-row {
    flex-direction: column;
    gap: 8px;
  }
  
  .input-row {
    flex-direction: column;
    gap: 8px;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .price-check-container {
    padding: 8px 12px;
  }
  
  .main-content {
    padding: 12px;
    gap: 16px;
  }
  
  .input-row {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .input-row input {
    text-align: center;
    min-height: 44px; /* Touch target mínimo */
  }

  .input-row button {
    width: 100%;
    max-width: 280px;
    min-height: 44px;
  }
}

/* Medium mobile devices - padrão */
@media (min-width: 481px) and (max-width: 768px) {
  .input-row {
    flex-direction: row;
    max-width: 100%;
  }
  
  .input-row input {
    text-align: left;
  }
}

/* Tablet portrait */
@media (min-width: 769px) and (max-width: 1024px) {
  .connection-status-top {
    top: 25px;
    right: 25px;
    font-size: 1em;
    padding: 7px 15px;
  }

  .main-content {
    padding: 32px;
    gap: 24px;
  }

  .glass-card {
    padding: 40px 36px 32px;
    border-radius: 28px;
    max-width: 520px;
  }
  
  .input-row {
    gap: 16px;
    flex-direction: row;
    max-width: 500px;
  }

  .input-row input {
    font-size: 1.1rem;
    padding: 14px 18px;
    text-align: left;
  }

  .input-row button {
    font-size: 1.1rem;
    padding: 14px 24px;
    min-width: 120px;
    width: auto;
    max-width: none;
  }
}

/* Desktop and large screens */
@media (min-width: 1025px) {
  .connection-status-top {
    top: 30px;
    right: 30px;
    font-size: 1.1em;
    padding: 8px 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }

  .main-content {
    padding: 48px;
    gap: 32px;
  }

  .glass-card {
    padding: 56px 48px 40px;
    border-radius: 40px;
    max-width: 600px;
    box-shadow: 
      0 12px 48px 0 rgba(255, 102, 0, 0.2),
      0 2px 12px rgba(255, 102, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  }

  .input-row {
    max-width: 500px;
    gap: 20px;
    flex-direction: row;
  }

  .input-row input {
    font-size: 1.2rem;
    padding: 16px 20px;
    min-height: 56px;
    text-align: left;
  }

  .input-row button {
    font-size: 1.2rem;
    padding: 16px 32px;
    min-height: 56px;
    min-width: 140px;
    width: auto;
    max-width: none;
  }

  .settings-btn {
    width: 56px;
    height: 56px;
    bottom: 32px;
    right: 32px;
  }

  .uuid-modal {
    max-width: 600px;
    padding: 48px 40px 32px 40px;
  }
}

/* Ultra-wide and 4K displays */
@media (min-width: 1920px) {
  .main-content {
    max-width: 1400px;
    padding: 64px;
  }
  
  .glass-card {
    max-width: 700px;
    padding: 64px 56px 48px;
  }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .main-logo, .mascot {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}

/* Landscape orientation adjustments */
@media (orientation: landscape) and (max-height: 600px) {
  .main-content {
    padding: 16px;
    gap: 16px;
  }
  
  .glass-card {
    padding: 24px 32px 20px;
  }
  
  .logo-mascot-row {
    margin-bottom: 16px;
  }
}

/* Reduced motion accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .glass-card {
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid #FF6600;
  }
  
  input {
    border-width: 3px;
  }
  
  .connection-status-top {
    background: rgba(255, 255, 255, 1);
    border: 2px solid currentColor;
  }
}

@keyframes slideUpFade {
  from { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glassIn {
  from { 
    opacity: 0; 
    transform: scale(0.9) translateY(40px);
    backdrop-filter: blur(0px);
  }
  to { 
    opacity: 1; 
    transform: scale(1) translateY(0);
    backdrop-filter: blur(8px);
  }
}

/* Fade transition melhorada */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
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
