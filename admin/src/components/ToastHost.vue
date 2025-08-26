<template>
  <div class="toast-host" aria-live="polite" aria-atomic="true">
    <div v-for="t in toast.state.toasts" :key="t.id" :class="['toast', t.type]">
      <span class="msg">{{ t.message }}</span>
      <button class="close" @click="toast.remove(t.id)" aria-label="Fechar">×</button>
    </div>
  </div>
  
</template>

<script setup>
import { useToast } from '../toast.js'
const toast = useToast()
</script>

<style scoped>
.toast-host {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast { display:flex; align-items:center; gap:8px; padding:10px 12px; border-radius:8px; box-shadow:0 4px 16px #00000022; background:#fff; border-left:4px solid #999; min-width: 220px; max-width: 420px; }
.toast.success { border-color:#2e7d32; }
.toast.error { border-color:#c62828; }
.toast.info { border-color:#1565c0; }
.msg { color:#333; font-weight:600; }
.close { background:transparent; border:none; font-size:18px; cursor:pointer; color:#555; margin-left:auto; }
.close:hover { color:#000; }
</style>
