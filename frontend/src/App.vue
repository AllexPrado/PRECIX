<script setup>
import { ref, onMounted, provide } from 'vue'
import Carousel from './components/Carousel.vue'
import PriceCheck from './components/PriceCheck.vue'
import { getDeviceUUID, saveDeviceUUID } from './indexeddb.js'

function generateUUID() {
  // RFC4122 version 4 compliant UUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const deviceUUID = ref(null)
provide('deviceUUID', deviceUUID)

onMounted(async () => {
  try {
    let uuid = await getDeviceUUID()
    console.log('[PRECIX] UUID lido do IndexedDB:', uuid)
    if (!uuid) {
      uuid = generateUUID()
      await saveDeviceUUID(uuid)
      console.log('[PRECIX] UUID gerado e salvo:', uuid)
    }
    deviceUUID.value = uuid
    console.log('[PRECIX] UUID final em deviceUUID.value:', deviceUUID.value)
  } catch (e) {
    console.error('[PRECIX] Erro ao acessar IndexedDB para UUID:', e)
    deviceUUID.value = ''
  }
})
</script>

<template>
  <div id="app-container">
    <PriceCheck />
    <Carousel />
  </div>
</template>

<style scoped>
#app-container {
  width: 100vw;
  height: 100dvh; /* Usa altura dinâmica do viewport */
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: grid; /* Usa Grid para sobrepor os filhos */
  grid-template-areas: "main";
}

/* Garante que os filhos diretos ocupem a mesma área do grid */
#app-container > * {
  grid-area: main;
}
</style>
