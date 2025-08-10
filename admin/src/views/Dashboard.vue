
<template>
  <div class="dashboard-bg">
    <div class="dashboard-card-light">
      <div class="dashboard-summary-row">
        <div class="summary-item">
          <span class="summary-title">Produtos</span>
          <span class="summary-value">{{ status.total_products ?? '---' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-title">Última sincronização</span>
          <span class="summary-value">{{ status.last_sync ?? '---' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-title">Status do Sistema</span>
          <span class="summary-value" :style="{color: status.online ? 'green' : 'red'}">{{ status.online ? 'Online' : 'Offline' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-title">Último backup</span>
          <span class="summary-value">{{ status.last_backup ?? '---' }}</span>
        </div>
      </div>
    </div>
  </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const status = ref({})

onMounted(async () => {
  try {
    const res = await axios.get('/admin/status')
    status.value = res.data
  } catch (e) {
    // handle error
  }
})
</script>

<style scoped>
.dashboard-bg {
  min-height: 100vh;
  background: #fff3e0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.dashboard-card-light {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px #ff66001a;
  padding: 24px 0 24px 0;
  margin: 48px 0 0 0;
  width: 1100px;
  min-width: 900px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dashboard-summary-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 64px;
  width: 100%;
}
.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  max-width: 240px;
}
.summary-title {
  color: #ff6600;
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 500;
  text-align: center;
}
.summary-value {
  font-size: 2.3rem;
  font-weight: bold;
  margin-top: 2px;
  letter-spacing: 1px;
  text-align: center;
}
</style>
