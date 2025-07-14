
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

// Banners apenas com imagem
const banners = ref([
  { img: '/Promocao-aniversario-Sonda.jpeg', alt: 'Promoção Aniversário' },
  { img: '/sonda-frutas.jpeg', alt: 'Frutas Sonda' },
  { img: '/logo-sonda.png', alt: 'Logo Sonda' }
])
const current = ref(0)
let interval = null
let idleTimer = null
const visible = ref(false) // Inicialmente invisível

function nextSlide() {
  current.value = (current.value + 1) % banners.value.length
}

function resetIdleTimer() {
  visible.value = false // Resetar visibilidade
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    current.value = 0
    visible.value = true // Tornar visível após 15s
    if (interval) clearInterval(interval)
    interval = setInterval(nextSlide, 5000)
  }, 15000)
}

onMounted(() => {
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
  width: 80vw;
  height: 60vh;
  max-width: 700px;
  max-height: 420px;
  background: rgba(255,255,255,0.95);
  border-radius: 32px;
  box-shadow: 0 8px 40px 0 #ff66002a, 0 1.5px 8px #ff66001a;
  overflow: hidden;
}
  .carousel-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #fff;
    border-radius: 32px;
    box-shadow: 0 8px 32px #0003;
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
    width: 98vw;
    height: 38vh;
    max-width: 98vw;
    max-height: 38vh;
    border-radius: 18px;
  }
  .carousel-text {
    font-size: 1.2rem;
    padding: 18px 0 8px 0;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
  }
}
</style>
