<template>
  <transition name="fade-carousel">
    <div v-if="visible" class="carousel-fullscreen" @click="nextSlide">
      <div class="carousel-img-wrapper" :class="{ 'fullscreen-mode': isFullscreen }">
        <img :src="banners[current].img" class="carousel-img" :alt="banners[current].alt" />
        <button v-if="!isFullscreen" class="fullscreen-btn" @click.stop="manualFullscreen">⛶</button>
      </div>
      <div class="carousel-indicator">
        <span v-for="(b, i) in banners" :key="i" :class="{active: i === current}"></span>
      </div>
    </div>
  </transition>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const banners = ref([])
const current = ref(0)
let interval = null
let idleTimer = null
let pollingInterval = null
const visible = ref(false)
const isFullscreen = ref(false)
const API_BASE = import.meta.env.VITE_API_URL || ''

function getStoreId() {
  // Sempre busca o código da loja padronizado
  let storeCodigo = localStorage.getItem('precix_store_codigo');
  if (!storeCodigo || storeCodigo === 'null' || storeCodigo === 'undefined') {
    // fallback: não retorna nada se não houver código válido
    return null;
  }
  return String(storeCodigo).trim();
}

async function fetchBanners() {
  try {
    const storeCode = getStoreId();
    let response;
    if (storeCode) {
      response = await axios.get(`${API_BASE}/admin/banners`, { params: { store_id: storeCode } });
    } else {
      response = await axios.get(`${API_BASE}/admin/banners`);
    }
    if (Array.isArray(response.data)) {
      banners.value = response.data.map(b => ({
        img: `${API_BASE}${b.url}`,
        alt: b.filename
      }))
    }
    // fallback: se não houver banners, mostra um default
    if (banners.value.length === 0) {
      banners.value = [
        { img: '/Promocao-aniversario-Sonda.jpeg', alt: 'Promoção Aniversário' },
        { img: '/sonda-frutas.jpeg', alt: 'Frutas Sonda' },
        { img: '/logo-sonda.png', alt: 'Logo Sonda' }
      ]
    }
  } catch (e) {
    // fallback em caso de erro
    banners.value = [
      { img: '/Promocao-aniversario-Sonda.jpeg', alt: 'Promoção Aniversário' },
      { img: '/sonda-frutas.jpeg', alt: 'Frutas Sonda' },
      { img: '/logo-sonda.png', alt: 'Logo Sonda' }
    ]
  }
}

function nextSlide() {
  current.value = (current.value + 1) % banners.value.length
}

function enableFullscreen() {
  const carouselElement = document.querySelector('.carousel-fullscreen');
  if (carouselElement && carouselElement.requestFullscreen) {
    carouselElement.requestFullscreen();
    isFullscreen.value = true;
  } else {
    // Fallback: força CSS
    isFullscreen.value = true;
  }
}

function manualFullscreen(e) {
  e.preventDefault();
  enableFullscreen();
}

function resetIdleTimer() {
  visible.value = false
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    current.value = 0
    visible.value = true
    enableFullscreen()
    if (interval) clearInterval(interval)
    interval = setInterval(nextSlide, 5000)
  }, 15000)
}


onMounted(async () => {
  await fetchBanners()
  // Polling para banners a cada 30s
  pollingInterval = setInterval(fetchBanners, 30000)
  resetIdleTimer()
  window.addEventListener('mousemove', resetIdleTimer, { passive: true })
  window.addEventListener('keydown', resetIdleTimer, { passive: true })
  window.addEventListener('touchstart', resetIdleTimer, { passive: true })
  window.addEventListener('click', resetIdleTimer, { passive: true })
})
onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (idleTimer) clearTimeout(idleTimer)
  if (pollingInterval) clearInterval(pollingInterval)
  window.removeEventListener('mousemove', resetIdleTimer)
  window.removeEventListener('keydown', resetIdleTimer)
  window.removeEventListener('touchstart', resetIdleTimer)
  window.removeEventListener('click', resetIdleTimer)
})
</script>

<style scoped>
.fade-carousel-enter-active, .fade-carousel-leave-active {
  transition: opacity 0.7s cubic-bezier(.4,1.4,.6,1);
}
.fade-carousel-enter-from, .fade-carousel-leave-to {
  opacity: 0;
}
.carousel-fullscreen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh; /* Altura dinâmica do viewport */
  background: #000; /* Fundo preto para imersão total */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
}
.carousel-img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Usa 'cover' para preencher a tela, evitando barras pretas */
  filter: brightness(1) contrast(1.05) saturate(1.05);
}

/* Oculta o botão de fullscreen quando já está em tela cheia */
.fullscreen-btn {
  display: none;
}

.carousel-indicator {
  position: absolute;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 32px);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1001;
}
.carousel-indicator span {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  transition: background 0.3s, transform 0.3s;
}
.carousel-indicator span.active {
  background: #FF6600;
  border-color: transparent;
  transform: scale(1.2);
}

/* Remove media queries desnecessárias, o layout agora é fluido */
</style>
