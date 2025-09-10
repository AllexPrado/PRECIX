<template>
  <transition name="fade-carousel">
    <div v-if="visible" class="carousel-fullscreen" @click="nextSlide">
      <div class="carousel-img-wrapper" :class="{ 'fullscreen-mode': isFullscreen }">
        <img 
          :src="banners[current].img" 
          class="carousel-img" 
          :alt="banners[current].alt"
          loading="eager"
          :style="imageStyles"
        />
        <div class="carousel-overlay"></div>
        <button v-if="!isFullscreen" class="fullscreen-btn" @click.stop="manualFullscreen">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </div>
      <div class="carousel-indicator">
        <span v-for="(b, i) in banners" :key="`indicator-${i}`" 
              :class="{active: i === current}"
              @click.stop="goToSlide(i)"
              :aria-label="`Slide ${i + 1}`"></span>
      </div>
      <div class="carousel-progress">
        <div class="progress-bar" :style="progressStyle"></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import axios from 'axios'

const banners = ref([])
const current = ref(0)
const isFullscreen = ref(false)
const visible = ref(false)
const progress = ref(0)
const aspectRatio = ref('16/9') // Padrão
const slideInterval = 5000 // 5 segundos por slide

let interval = null
let idleTimer = null
let pollingInterval = null
let progressTimer = null

const API_BASE = import.meta.env.VITE_API_URL || ''

// Computed properties para responsividade avançada
const imageStyles = computed(() => ({
  objectFit: getOptimalObjectFit(),
  aspectRatio: aspectRatio.value,
  filter: 'brightness(1.05) contrast(1.1) saturate(1.1)'
}))

const progressStyle = computed(() => ({
  width: `${progress.value}%`,
  transition: progress.value === 0 ? 'none' : `width ${slideInterval / 10}ms linear`
}))

// Função para determinar o melhor object-fit baseado no aspect ratio da imagem
function getOptimalObjectFit() {
  const viewportRatio = window.innerWidth / window.innerHeight
  // Se a viewport for muito wide ou muito tall, usar contain para evitar crops extremos
  if (viewportRatio > 2.5 || viewportRatio < 0.5) {
    return 'contain'
  }
  return 'cover'
}

// Detecta aspect ratio da imagem carregada
function detectImageAspectRatio(imgSrc) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const ratio = `${img.naturalWidth}/${img.naturalHeight}`
      resolve(ratio)
    }
    img.onerror = () => resolve('16/9') // fallback
    img.src = imgSrc
  })
}

function getStoreId() {
  let storeCodigo = localStorage.getItem('precix_store_codigo');
  if (!storeCodigo || storeCodigo === 'null' || storeCodigo === 'undefined') {
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
    
    // Preload de imagens e detecção de aspect ratio
    if (banners.value.length > 0) {
      const firstImageRatio = await detectImageAspectRatio(banners.value[0].img)
      aspectRatio.value = firstImageRatio
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
  resetProgress()
}

function goToSlide(index) {
  current.value = index
  resetProgress()
}

function resetProgress() {
  progress.value = 0
  if (progressTimer) clearInterval(progressTimer)
  startProgress()
}

function startProgress() {
  const stepTime = slideInterval / 100
  progressTimer = setInterval(() => {
    progress.value += 1
    if (progress.value >= 100) {
      progress.value = 0
      nextSlide()
    }
  }, stepTime)
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
  progress.value = 0
  if (idleTimer) clearTimeout(idleTimer)
  if (interval) clearInterval(interval)
  if (progressTimer) clearInterval(progressTimer)
  
  idleTimer = setTimeout(() => {
    current.value = 0
    visible.value = true
    enableFullscreen()
    startProgress()
  }, 15000)
}

// Watch para mudanças no slide atual
watch(current, async (newIndex) => {
  if (banners.value[newIndex]) {
    const newRatio = await detectImageAspectRatio(banners.value[newIndex].img)
    aspectRatio.value = newRatio
  }
})

// Listeners para responsividade
function handleResize() {
  // Reajusta object-fit quando a viewport muda
  aspectRatio.value = aspectRatio.value // força recompute
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
  window.addEventListener('resize', handleResize, { passive: true })
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (idleTimer) clearTimeout(idleTimer)
  if (pollingInterval) clearInterval(pollingInterval)
  if (progressTimer) clearInterval(progressTimer)
  
  window.removeEventListener('mousemove', resetIdleTimer)
  window.removeEventListener('keydown', resetIdleTimer)
  window.removeEventListener('touchstart', resetIdleTimer)
  window.removeEventListener('click', resetIdleTimer)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.fade-carousel-enter-active, .fade-carousel-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-carousel-enter-from, .fade-carousel-leave-to {
  opacity: 0;
}

.carousel-fullscreen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh; /* Altura dinâmica do viewport */
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
}

.carousel-img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-position: center;
  transition: transform 0.5s ease, filter 0.3s ease;
  will-change: transform; /* Otimização de performance */
}

.carousel-img:hover {
  transform: scale(1.02);
}

.carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(0,0,0,0.1) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0,0,0,0.1) 100%
  );
  pointer-events: none;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.carousel-fullscreen:hover .carousel-overlay {
  opacity: 0.1;
}

.fullscreen-btn {
  position: absolute;
  top: clamp(16px, 3vw, 32px);
  right: clamp(16px, 3vw, 32px);
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px;
  cursor: pointer;
  z-index: 1002;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.fullscreen-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.carousel-indicator {
  position: absolute;
  bottom: clamp(20px, 4vh, 40px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: clamp(8px, 2vw, 16px);
  z-index: 1001;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.carousel-indicator span {
  display: inline-block;
  width: clamp(10px, 2.5vw, 16px);
  height: clamp(10px, 2.5vw, 16px);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.carousel-indicator span::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(45deg, #FF6600, #FF4500);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel-indicator span.active {
  background: transparent;
  border-color: #FF6600;
  transform: scale(1.3);
  box-shadow: 
    0 4px 12px rgba(255, 102, 0, 0.4),
    0 0 0 2px rgba(255, 102, 0, 0.2);
}

.carousel-indicator span.active::before {
  opacity: 1;
}

.carousel-indicator span:hover:not(.active) {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

.carousel-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 1001;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #FF6600, #FF4500, #FF9900);
  width: 0%;
  transition: width 50ms linear;
  box-shadow: 0 0 8px rgba(255, 102, 0, 0.6);
}

/* Responsividade avançada */

/* Dispositivos muito pequenos */
@media (max-width: 480px) {
  .carousel-indicator {
    gap: 6px;
    padding: 6px 12px;
    bottom: 16px;
  }
  
  .fullscreen-btn {
    top: 12px;
    right: 12px;
    padding: 8px;
  }
  
  .carousel-progress {
    height: 3px;
  }
}

/* Tablets */
@media (min-width: 768px) and (max-width: 1024px) {
  .carousel-indicator {
    gap: 12px;
    padding: 10px 20px;
    bottom: 32px;
  }
  
  .fullscreen-btn {
    top: 24px;
    right: 24px;
    padding: 14px;
  }
}

/* Desktop grande */
@media (min-width: 1440px) {
  .carousel-indicator {
    gap: 18px;
    padding: 12px 24px;
    bottom: 48px;
  }
  
  .fullscreen-btn {
    top: 40px;
    right: 40px;
    padding: 16px;
  }
  
  .carousel-progress {
    height: 6px;
  }
}

/* Orientação landscape em mobiles */
@media (orientation: landscape) and (max-height: 600px) {
  .carousel-indicator {
    bottom: 12px;
    gap: 6px;
    padding: 4px 12px;
  }
  
  .fullscreen-btn {
    top: 8px;
    right: 8px;
    padding: 8px;
  }
}

/* Alto contraste */
@media (prefers-contrast: high) {
  .carousel-indicator span {
    border-width: 3px;
    background: rgba(255, 255, 255, 0.8);
  }
  
  .carousel-indicator span.active {
    border-color: #fff;
    box-shadow: 0 0 0 3px #FF6600;
  }
  
  .fullscreen-btn {
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid #fff;
  }
}

/* Movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  .carousel-img,
  .carousel-indicator span,
  .progress-bar,
  .fullscreen-btn {
    transition: none !important;
  }
  
  .carousel-img:hover {
    transform: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .carousel-indicator {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .carousel-indicator span {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  .fullscreen-btn {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .carousel-img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}
</style>
