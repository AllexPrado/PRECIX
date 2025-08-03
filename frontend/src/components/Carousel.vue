<template>
  <transition name="fade-carousel">
    <div v-if="visible" class="carousel-fullscreen" @click="nextSlide">
      <div class="carousel-img-wrapper">
        <img :src="banners[current].img" class="carousel-img" :alt="banners[current].alt" />
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
const visible = ref(false)
const API_BASE = import.meta.env.VITE_API_URL || ''

async function fetchBanners() {
  try {
    const response = await axios.get(`/admin/banners`)
    if (Array.isArray(response.data)) {
      banners.value = response.data.map(b => ({
        img: b.url,
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

function resetIdleTimer() {
  visible.value = false
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    current.value = 0
    visible.value = true
    if (interval) clearInterval(interval)
    interval = setInterval(nextSlide, 5000)
  }, 15000)
}

function enableFullscreen() {
  const carouselElement = document.querySelector('.carousel-fullscreen');
  if (carouselElement.requestFullscreen) {
    carouselElement.requestFullscreen();
  } else if (carouselElement.webkitRequestFullscreen) {
    carouselElement.webkitRequestFullscreen();
  } else if (carouselElement.msRequestFullscreen) {
    carouselElement.msRequestFullscreen();
  }
}

onMounted(async () => {
  await fetchBanners()
  resetIdleTimer()
  window.addEventListener('mousemove', resetIdleTimer, { passive: true })
  window.addEventListener('keydown', resetIdleTimer, { passive: true })
  window.addEventListener('touchstart', resetIdleTimer, { passive: true })
  window.addEventListener('click', resetIdleTimer, { passive: true })
})
onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (idleTimer) clearTimeout(idleTimer)
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
  height: 100vh;
  background: linear-gradient(135deg, #fff 60%, #fff3e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
  transition: background 0.2s;
}
.carousel-img-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
}
  .carousel-img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    border-radius: 0;
    box-shadow: none;
    filter: brightness(1) contrast(1.08) saturate(1.1);
    transition: transform 0.7s cubic-bezier(.4,1.4,.6,1);
  }
.carousel-indicator {
  position: absolute;
  bottom: 32px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}
.carousel-indicator span {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff5;
  border: 2px solid #fff;
  transition: background 0.2s, border 0.2s, transform 0.2s;
}
.carousel-indicator span.active {
  background: #FF6600;
  border-color: #FF6600;
  transform: scale(1.2);
}
@media (max-width: 700px) {
  .carousel-img-wrapper {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
  }
  .carousel-img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    border-radius: 0;
    box-shadow: none;
  }
  .carousel-text {
    font-size: 1.2rem;
    padding: 18px 0 8px 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
