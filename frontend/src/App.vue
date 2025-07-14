<script setup>
import Carousel from './components/Carousel.vue'
import PriceCheck from './components/PriceCheck.vue'
</script>

<template>
  <div>
    <PriceCheck />
    <Carousel />
  </div>
</template>

<style scoped>
body, html, #app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
