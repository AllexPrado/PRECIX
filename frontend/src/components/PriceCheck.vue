<template>
  <div class="price-check-container">
    <!-- Ícone de configurações e Modal UUID (sem alterações) -->
    <button class="settings-btn" @click="showUUIDModal = true" title="Configurações">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .66.39 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.66 0 1.26.39 1.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.26.39-1.51 1z"/></svg>
    </button>
    <div v-if="showUUIDModal" class="uuid-modal-bg" @click.self="showUUIDModal = false">
      <div class="uuid-modal">
        <div class="modal-header">
          <h3>Configurações do Dispositivo</h3>
        </div>
        
        <!-- Status do Scanner integrado no modal -->
        <div class="scanner-info-section">
          <div class="scanner-indicator" :class="{ connected: scannerConnected }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="16" rx="2"/>
              <path d="M7 8h10"/>
              <path d="M7 12h4"/>
              <path d="M7 16h2"/>
            </svg>
            <span v-if="scannerConnected">Scanner Bluetooth Conectado</span>
            <span v-else>Scanner Aguardando Conexão</span>
          </div>
        </div>

        <div class="uuid-section">
          <label>Identificador Único:</label>
          <div class="uuid-box">
            <template v-if="uuidLocal && uuidLocal.length > 0">{{ uuidLocal }}</template>
            <template v-else><span style="color:#aaa;">UUID não gerado</span></template>
          </div>
        </div>

        <div class="modal-actions">
          <button class="copy-btn" @click="copyUUID" :disabled="!uuidLocal">{{ copied ? 'Copiado!' : 'Copiar UUID' }}</button>
          <button class="close-btn" @click="showUUIDModal = false">Fechar</button>
        </div>
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

    <!-- Modal para resultado do produto - Experiência tecnológica e profissional -->
    <transition name="modal-fade">
      <div v-if="product && showProductModal" class="product-modal-overlay" @click="closeProductModal">
        <div class="product-modal" @click.stop>
          <!-- Barra de progresso de fechamento automático -->
          <div class="auto-close-progress"></div>
          
          <!-- Ícone de sucesso animado -->
          <div class="success-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          
          <div class="modal-product-info">
            <div class="modal-product-name">{{ product.name }}</div>
            <div class="modal-product-price">
              <span class="currency">R$</span>
              <span class="price-value">{{ formatPrice(product.price) }}</span>
            </div>
            <div v-if="product.promo" class="modal-promo-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9 8.91 8.26 12 2"/>
              </svg>
              {{ product.promo }}
            </div>
          </div>
          
          <!-- Timer visual de fechamento -->
          <div class="auto-close-timer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            <span>Fechando automaticamente...</span>
          </div>
        </div>
      </div>
    </transition>

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
const showProductModal = ref(false)
const autoCloseTimeout = ref(null)

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
const scannerConnected = ref(false)
const lastInputTime = ref(0)
const inputBuffer = ref('')

window.addEventListener('online', () => isOnline.value = true)
window.addEventListener('offline', () => isOnline.value = false)

// Detecta scanner Bluetooth através do padrão de entrada rápida
function detectScannerInput(event) {
  const currentTime = Date.now()
  const timeDiff = currentTime - lastInputTime.value
  
  // Scanner Bluetooth típico: entrada muito rápida (< 50ms entre caracteres)
  if (timeDiff < 50 && event.data && event.data.length === 1) {
    scannerConnected.value = true
    inputBuffer.value += event.data
  } else if (timeDiff > 100) {
    // Reset buffer se pausa for muito longa (digitação manual)
    inputBuffer.value = ''
    scannerConnected.value = false
  }
  
  lastInputTime.value = currentTime
}

// Otimizações específicas para tablets e leitores Bluetooth
function onInputFocus() {
  if (barcodeInput.value) {
    barcodeInput.value.setAttribute('inputmode', 'numeric')
    barcodeInput.value.setAttribute('pattern', '[0-9]*')
    // Adiciona listener para detectar padrão de scanner
    barcodeInput.value.addEventListener('input', detectScannerInput)
    
    // Otimizações para tablets
    barcodeInput.value.style.fontSize = '16px' // Evita zoom no iOS
    barcodeInput.value.style.userSelect = 'none' // Evita seleção acidental
  }
}
function onInputBlur() {
  // Remove listener ao perder foco
  if (barcodeInput.value) {
    barcodeInput.value.removeEventListener('input', detectScannerInput)
  }
}

function resetScreen() {
  barcode.value = ''
  product.value = null
  inputBuffer.value = ''
  scannerConnected.value = false
  if (barcodeInput.value) {
    barcodeInput.value.focus()
    // Pequeno delay para garantir foco em tablets
    setTimeout(() => {
      if (barcodeInput.value) barcodeInput.value.focus()
    }, 100)
  }
}

function handleConsult() {
  // Feedback tátil para tablets (vibração)
  if (navigator.vibrate && scannerConnected.value) {
    navigator.vibrate([50, 30, 50]) // Padrão de vibração dupla
  }
  
  // Feedback sonoro opcional (pode ser configurado)
  if (window.AudioContext || window.webkitAudioContext) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime) // Frequência do beep
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime) // Volume baixo
      
      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.1) // Beep curto
    } catch (e) {
      // Falha silenciosa se áudio não disponível
    }
  }
  
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
let bluetoothMonitor = null

// Funcionalidade avançada de auto-sensing para scanner Bluetooth
function initBluetoothMonitoring() {
  // Monitora eventos de teclado para detectar scanner Bluetooth
  document.addEventListener('keydown', (event) => {
    // Scanner Bluetooth típico envia códigos muito rapidamente
    const now = performance.now()
    const timeSinceLastKey = now - lastInputTime.value
    
    if (timeSinceLastKey < 30) { // Menos de 30ms = provavelmente scanner
      scannerConnected.value = true
    }
    
    lastInputTime.value = now
  })
  
  // Monitora se há dispositivos Bluetooth conectados (se suportado)
  if (navigator.bluetooth) {
    navigator.bluetooth.getAvailability().then(available => {
      if (available) {
        console.log('[PRECIX] Bluetooth disponível para scanners')
        // Tenta detectar dispositivos HID já conectados
        detectConnectedHIDDevices()
      }
    }).catch(err => {
      console.log('[PRECIX] Bluetooth não disponível:', err.message)
    })
  }
  
  // Auto-focus inteligente para tablets
  const focusField = () => {
    if (barcodeInput.value && document.visibilityState === 'visible') {
      barcodeInput.value.focus()
    }
  }
  
  // Reativa foco quando tablet volta do sleep/background
  document.addEventListener('visibilitychange', focusField)
  window.addEventListener('focus', focusField)
  
  // Foco inicial com delay para tablets
  setTimeout(focusField, 500)
}

// Detecta dispositivos HID (scanners) já conectados
function detectConnectedHIDDevices() {
  if (navigator.hid) {
    navigator.hid.getDevices().then(devices => {
      const scanners = devices.filter(device => 
        device.productName?.toLowerCase().includes('scanner') ||
        device.productName?.toLowerCase().includes('barcode') ||
        device.vendorId === 0x1234 // ID típico de scanners genéricos
      )
      
      if (scanners.length > 0) {
        console.log('[PRECIX] Scanner HID detectado:', scanners[0].productName)
        scannerConnected.value = true
      }
    }).catch(err => {
      console.log('[PRECIX] HID API não disponível:', err.message)
    })
  }
}

onMounted(() => {
  barcode.value = ''
  product.value = null
  syncCatalog()
  initBluetoothMonitoring()
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
    // Abre modal automaticamente (otimização tablet kiosk)
    showProductModal.value = true
    // Fecha automaticamente após 5 segundos
    if (autoCloseTimeout.value) {
      clearTimeout(autoCloseTimeout.value)
    }
    autoCloseTimeout.value = setTimeout(() => {
      closeProductModal()
    }, 5000)
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
      // Abre modal automaticamente (otimização tablet kiosk)
      showProductModal.value = true
      // Fecha automaticamente após 5 segundos
      if (autoCloseTimeout.value) {
        clearTimeout(autoCloseTimeout.value)
      }
      autoCloseTimeout.value = setTimeout(() => {
        closeProductModal()
      }, 5000)
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

function closeProductModal() {
  // Limpa o timeout se ainda estiver ativo
  if (autoCloseTimeout.value) {
    clearTimeout(autoCloseTimeout.value)
    autoCloseTimeout.value = null
  }
  showProductModal.value = false
  // Auto-reset após fechar modal para operação hands-free
  setTimeout(() => {
    resetScreen()
  }, 500)
}

function startNewConsultation() {
  // Limpa o timeout se ainda estiver ativo
  if (autoCloseTimeout.value) {
    clearTimeout(autoCloseTimeout.value)
    autoCloseTimeout.value = null
  }
  showProductModal.value = false
  resetScreen()
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
    top: clamp(20px, 3vw, 30px);
    right: clamp(20px, 3vw, 30px);
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    padding: clamp(6px, 1.5vw, 10px) clamp(12px, 2.5vw, 16px);
  }

  .main-content {
    padding: clamp(24px, 4vw, 40px);
    gap: clamp(20px, 3vw, 32px);
  }

  .glass-card {
    padding: clamp(32px, 5vw, 48px) clamp(28px, 4.5vw, 40px) clamp(24px, 4vw, 36px);
    border-radius: clamp(20px, 4vw, 32px);
    max-width: min(580px, 85vw);
    box-shadow: 
      0 12px 48px 0 rgba(255, 102, 0, 0.18),
      0 4px 16px rgba(255, 102, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.25) inset;
  }
  
  .input-row {
    gap: clamp(12px, 2.5vw, 20px);
    flex-direction: row;
    max-width: min(520px, 90vw);
  }

  .input-row input {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    padding: clamp(14px, 2.5vw, 18px) clamp(16px, 3vw, 20px);
    min-height: clamp(52px, 10vw, 64px);
    text-align: left;
  }

  .input-row button {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    padding: clamp(14px, 2.5vw, 18px) clamp(20px, 4vw, 28px);
    min-width: clamp(110px, 20vw, 140px);
    min-height: clamp(52px, 10vw, 64px);
    width: auto;
    max-width: none;
  }

  .logo-mascot-row {
    gap: clamp(16px, 3vw, 24px);
    margin-bottom: clamp(20px, 4vw, 32px);
  }

  .main-logo {
    width: clamp(160px, 30vw, 220px);
  }

  .mascot {
    width: clamp(48px, 9vw, 72px);
    height: clamp(48px, 9vw, 72px);
  }

  .settings-btn {
    width: clamp(52px, 10vw, 64px);
    height: clamp(52px, 10vw, 64px);
    bottom: clamp(20px, 3vw, 32px);
    right: clamp(20px, 3vw, 32px);
  }

  /* Modal específico para tablets */
  .product-modal {
    max-width: min(650px, 90vw);
    padding: clamp(36px, 6vw, 56px);
  }

  .modal-product-name {
    font-size: clamp(1.6rem, 4.5vw, 2.4rem);
  }

  .modal-product-price .price-value {
    font-size: clamp(2.8rem, 7vw, 4.2rem);
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

/* Tablet kiosk specific - Portrait mode optimizations */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) and (min-height: 900px) {
  .main-content {
    padding: clamp(32px, 5vw, 56px);
    gap: clamp(24px, 4vw, 40px);
    justify-content: flex-start;
    padding-top: clamp(80px, 12vw, 120px);
  }

  .glass-card {
    padding: clamp(40px, 6vw, 64px) clamp(32px, 5vw, 48px) clamp(32px, 5vw, 48px);
    max-width: min(640px, 85vw);
    border-radius: clamp(24px, 4vw, 36px);
    box-shadow: 
      0 16px 64px 0 rgba(255, 102, 0, 0.2),
      0 6px 24px rgba(255, 102, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  }

  .logo-mascot-row {
    margin-bottom: clamp(28px, 5vw, 44px);
    gap: clamp(20px, 4vw, 32px);
  }

  .main-logo {
    width: clamp(180px, 32vw, 260px);
  }

  .mascot {
    width: clamp(56px, 10vw, 80px);
    height: clamp(56px, 10vw, 80px);
  }

  .input-row {
    margin-bottom: clamp(20px, 4vw, 32px);
    gap: clamp(16px, 3vw, 24px);
    max-width: min(560px, 90vw);
  }

  .input-row input {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    padding: clamp(16px, 3vw, 22px) clamp(20px, 4vw, 28px);
    min-height: clamp(60px, 12vw, 76px);
    border-radius: clamp(12px, 2.5vw, 18px);
  }

  .input-row button {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    padding: clamp(16px, 3vw, 22px) clamp(24px, 5vw, 36px);
    min-height: clamp(60px, 12vw, 76px);
    min-width: clamp(140px, 25vw, 180px);
    border-radius: clamp(12px, 2.5vw, 18px);
  }

  .scanner-status {
    top: clamp(24px, 4vw, 36px);
    font-size: clamp(1rem, 2.2vw, 1.2rem);
    padding: clamp(8px, 1.8vw, 12px) clamp(16px, 3vw, 20px);
    border-radius: clamp(10px, 2vw, 16px);
  }

  .connection-status-top {
    top: clamp(24px, 4vw, 36px);
    right: clamp(24px, 4vw, 36px);
    font-size: clamp(1rem, 2.2vw, 1.2rem);
    padding: clamp(8px, 1.8vw, 12px) clamp(16px, 3vw, 20px);
    border-radius: clamp(10px, 2vw, 16px);
  }

  .settings-btn {
    width: clamp(60px, 12vw, 76px);
    height: clamp(60px, 12vw, 76px);
    bottom: clamp(32px, 5vw, 48px);
    right: clamp(32px, 5vw, 48px);
  }

  /* Modal otimizado para tablet kiosk portrait */
  .product-modal {
    max-width: min(700px, 88vw);
    padding: clamp(48px, 8vw, 72px);
    border-radius: clamp(20px, 3vw, 32px);
  }

  .modal-product-name {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    margin-bottom: clamp(20px, 4vw, 32px);
  }

  .modal-product-price .currency {
    font-size: clamp(1.4rem, 3.5vw, 2rem);
  }

  .modal-product-price .price-value {
    font-size: clamp(3.2rem, 8vw, 4.8rem);
  }

  .modal-promo-badge {
    font-size: clamp(1.1rem, 2.8vw, 1.4rem);
    padding: clamp(10px, 2.5vw, 16px) clamp(20px, 4vw, 32px);
    margin: clamp(16px, 3vw, 24px) auto;
  }

  .new-consultation-btn {
    padding: clamp(18px, 3.5vw, 26px) clamp(32px, 6vw, 48px);
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    min-width: clamp(200px, 38vw, 260px);
    border-radius: clamp(12px, 2.5vw, 20px);
  }

  .modal-close-btn {
    width: clamp(44px, 9vw, 56px);
    height: clamp(44px, 9vw, 56px);
    top: clamp(16px, 3vw, 24px);
    right: clamp(16px, 3vw, 24px);
  }
}

/* Landscape orientation adjustments */
@media (orientation: landscape) and (max-height: 600px) {
  .main-content {
    padding: clamp(12px, 2vw, 20px);
    gap: clamp(12px, 2vw, 20px);
  }
  
  .glass-card {
    padding: clamp(20px, 3vw, 32px) clamp(24px, 4vw, 40px) clamp(16px, 2.5vw, 28px);
    max-width: min(500px, 85vw);
  }
  
  .logo-mascot-row {
    margin-bottom: clamp(12px, 2vw, 20px);
    gap: clamp(12px, 2vw, 18px);
  }

  .main-logo {
    width: clamp(100px, 18vw, 160px);
  }

  .mascot {
    width: clamp(32px, 6vw, 48px);
    height: clamp(32px, 6vw, 48px);
  }

  .input-row {
    margin-bottom: clamp(8px, 1.5vw, 16px);
    gap: clamp(8px, 1.5vw, 16px);
  }

  .input-row input {
    font-size: clamp(1rem, 2vw, 1.2rem);
    padding: clamp(10px, 2vw, 16px) clamp(14px, 2.5vw, 18px);
    min-height: clamp(40px, 8vw, 52px);
  }

  .input-row button {
    font-size: clamp(1rem, 2vw, 1.2rem);
    padding: clamp(10px, 2vw, 16px) clamp(16px, 3vw, 24px);
    min-height: clamp(40px, 8vw, 52px);
    min-width: clamp(90px, 16vw, 120px);
  }

  .scanner-status {
    top: clamp(8px, 1.5vw, 16px);
    font-size: clamp(0.8rem, 1.8vw, 0.9rem);
    padding: clamp(4px, 1vw, 8px) clamp(8px, 1.8vw, 12px);
  }

  .connection-status-top {
    top: clamp(8px, 1.5vw, 16px);
    right: clamp(8px, 1.5vw, 16px);
    font-size: clamp(0.8rem, 1.8vw, 0.9rem);
    padding: clamp(4px, 1vw, 8px) clamp(8px, 1.8vw, 12px);
  }

  .settings-btn {
    width: clamp(40px, 8vw, 52px);
    height: clamp(40px, 8vw, 52px);
    bottom: clamp(12px, 2vw, 20px);
    right: clamp(12px, 2vw, 20px);
  }

  /* Modal em landscape para tablets */
  .product-modal {
    max-width: min(600px, 90vw);
    max-height: 85vh;
    padding: clamp(20px, 3vw, 36px);
  }

  .modal-product-name {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    margin-bottom: clamp(10px, 2vw, 16px);
  }

  .modal-product-price .price-value {
    font-size: clamp(2rem, 5vw, 3rem);
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

/* Foldable devices and dual screens */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) and (min-height: 600px) {
  .main-content {
    max-width: 800px;
    padding: clamp(32px, 5vw, 64px);
  }
  
  .glass-card {
    max-width: 600px;
    padding: clamp(40px, 6vw, 60px);
  }
  
  .input-row {
    max-width: 500px;
  }
}

/* Large tablets in landscape */
@media (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape) {
  .product-modal {
    max-width: min(700px, 85vw);
    padding: clamp(48px, 6vw, 64px);
  }
  
  .modal-product-name {
    font-size: clamp(2rem, 4vw, 2.8rem);
  }
  
  .modal-product-price .price-value {
    font-size: clamp(3.5rem, 6vw, 5.5rem);
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
  border-radius: 20px;
  box-shadow: 0 12px 48px rgba(255, 102, 0, 0.2);
  padding: 0;
  width: 100%;
  max-width: 520px;
  text-align: center;
  animation: fadeIn 0.3s;
  border: 1px solid rgba(255, 102, 0, 0.1);
  overflow: hidden;
}

/* Header do modal UUID com contraste adequado */
.modal-header {
  background: linear-gradient(135deg, #FF6600 0%, #FF9900 100%);
  padding: 20px 28px;
  margin-bottom: 0;
}

.modal-header h3 {
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Padding para o conteúdo do modal */
.scanner-info-section,
.uuid-section,
.modal-actions {
  margin-left: 28px;
  margin-right: 28px;
}

.modal-actions {
  margin-bottom: 28px;
}

/* Scanner integrado no modal UUID */
.scanner-info-section {
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 102, 0, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 102, 0, 0.15);
}

.scanner-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.scanner-indicator.connected {
  color: #008000;
}

.scanner-indicator svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.uuid-section {
  margin-bottom: 24px;
}

.uuid-section label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: left;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
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

/* Modal do produto - Experiência tecnológica e profissional */
.product-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 24px);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.product-modal {
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border-radius: clamp(20px, 5vw, 28px);
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.4),
    0 12px 40px rgba(255, 102, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.4) inset;
  padding: clamp(36px, 7vw, 56px);
  width: 100%;
  max-width: min(500px, 90vw);
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 102, 0, 0.2);
  overflow: hidden;
}

/* Barra de progresso de fechamento automático */
.auto-close-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #FF6600, #FF9900);
  border-radius: 0 0 2px 2px;
  animation: progressBar 5s linear forwards;
  z-index: 1;
}

@keyframes progressBar {
  from { width: 100%; }
  to { width: 0%; }
}

/* Ícone de sucesso animado */
.success-icon {
  margin-bottom: clamp(24px, 5vw, 32px);
  animation: successPulse 1.5s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes successPulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 1; 
  }
  50% { 
    transform: scale(1.05); 
    opacity: 0.9;
    filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.3));
  }
}

.modal-product-name {
  font-size: clamp(1.6rem, 5.5vw, 2.4rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: clamp(20px, 4vw, 28px);
  line-height: 1.1;
  text-align: center;
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textSlideUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes textSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-product-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: clamp(6px, 1.5vw, 10px);
  margin-bottom: clamp(20px, 4vw, 28px);
  padding: clamp(16px, 3vw, 24px);
  background: linear-gradient(135deg, rgba(255, 102, 0, 0.08) 0%, rgba(255, 153, 0, 0.05) 100%);
  border-radius: clamp(12px, 3vw, 16px);
  border: 1px solid rgba(255, 102, 0, 0.15);
  animation: priceZoomIn 0.8s ease-out 0.3s forwards;
  opacity: 0;
  transform: scale(0.9);
}

@keyframes priceZoomIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-product-price .currency {
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 700;
  color: #FF6600;
}

.modal-product-price .price-value {
  font-size: clamp(3rem, 9vw, 5rem);
  font-weight: 900;
  color: #FF6600;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  text-shadow: 0 2px 4px rgba(255, 102, 0, 0.2);
}

.modal-promo-badge {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: clamp(10px, 2.5vw, 14px) clamp(20px, 4vw, 28px);
  border-radius: clamp(20px, 4vw, 25px);
  font-weight: 700;
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  margin: clamp(16px, 3vw, 20px) auto;
  display: inline-flex;
  align-items: center;
  gap: clamp(6px, 1.5vw, 8px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
  animation: promoPulse 3s ease-in-out infinite;
}

@keyframes promoPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3); }
  50% { transform: scale(1.02); box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4); }
}

/* Timer visual de fechamento */
.auto-close-timer {
  position: absolute;
  bottom: clamp(16px, 3vw, 20px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.5vw, 8px);
  font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  color: #64748b;
  opacity: 0.7;
  font-weight: 500;
}

.auto-close-timer svg {
  width: clamp(16px, 3vw, 18px);
  height: clamp(16px, 3vw, 18px);
  animation: timerRotate 5s linear forwards;
}

@keyframes timerRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.modal-close-btn {
  position: absolute;
  top: clamp(12px, 2vw, 16px);
  right: clamp(12px, 2vw, 16px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: clamp(36px, 8vw, 44px);
  height: clamp(36px, 8vw, 44px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
  z-index: 1;
}

.modal-close-btn:hover {
  background: #fff3e0;
  color: #FF6600;
  box-shadow: 0 4px 12px rgba(255, 102, 0, 0.2);
}

.modal-product-info {
  margin-bottom: clamp(24px, 5vw, 32px);
}

.modal-product-name {
  font-size: clamp(1.4rem, 5vw, 2.2rem);
  font-weight: 700;
  color: #333;
  margin-bottom: clamp(16px, 3vw, 20px);
  line-height: 1.2;
  text-align: center;
}

.modal-product-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: clamp(4px, 1vw, 8px);
  margin-bottom: clamp(16px, 3vw, 20px);
}

.modal-product-price .currency {
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 600;
  color: #FF6600;
}

.modal-product-price .price-value {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 800;
  color: #FF6600;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

.modal-promo-badge {
  background: linear-gradient(135deg, #FF6600, #FF9900);
  color: white;
  padding: clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px);
  border-radius: clamp(12px, 3vw, 16px);
  font-weight: 700;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  margin: clamp(12px, 3vw, 16px) auto;
  display: inline-block;
  box-shadow: 0 4px 16px rgba(255, 102, 0, 0.3);
}

.modal-product-description {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  color: #666;
  margin: clamp(16px, 3vw, 20px) 0;
  line-height: 1.5;
}

.modal-barcode-info {
  font-size: clamp(0.9rem, 2vw, 1rem);
  color: #888;
  margin: clamp(16px, 3vw, 20px) 0;
  font-family: monospace;
  background: rgba(255, 102, 0, 0.05);
  padding: clamp(8px, 2vw, 12px);
  border-radius: clamp(6px, 1.5vw, 8px);
  border: 1px solid rgba(255, 102, 0, 0.15);
}

/* Animações do modal aprimoradas */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

.modal-fade-enter-from .product-modal,
.modal-fade-leave-to .product-modal {
  transform: scale(0.85) translateY(60px);
  opacity: 0;
}

.modal-fade-enter-from .product-modal,
.modal-fade-leave-to .product-modal {
  transform: scale(0.8) translateY(40px);
  opacity: 0;
}

/* Melhorias para tablets em landscape */
@media (orientation: landscape) and (max-height: 700px) {
  .product-modal {
    max-height: 90vh;
    padding: clamp(20px, 4vw, 32px);
  }
  
  .modal-product-name {
    font-size: clamp(1.2rem, 4vw, 1.8rem);
    margin-bottom: clamp(12px, 2vw, 16px);
  }
  
  .modal-product-price .price-value {
    font-size: clamp(2rem, 6vw, 3rem);
  }
}
</style>
