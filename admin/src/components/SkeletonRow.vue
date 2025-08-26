<template>
  <div class="skeleton" :style="{ height: height + 'px', width }"></div>
</template>

<script setup>
defineProps({ height: { type: Number, default: 12 }, width: { type: String, default: '100%' } })
</script>

<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: 100% 0 }
  100% { background-position: 0 0 }
}
</style>
