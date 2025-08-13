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
          <span class="summary-value nowrap">{{ formatDateTime(status.last_sync) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-title">Status do Sistema</span>
          <span class="summary-value online-status" :class="status.online ? 'online' : 'offline'">{{ status.online ? 'Online' : 'Offline' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-title">Último backup</span>
          <span class="summary-value nowrap">{{ formatDateTime(status.last_backup) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const status = ref({})

function formatDateTime(dt) {
  if (!dt) return '---';
  // Aceita ISO e retorna DD/MM/YYYY HH:mm:ss
  const d = new Date(dt);
  if (isNaN(d)) return dt;
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR');
}

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
html, body {
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}
.dashboard-bg {
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
}
.dashboard-card-light {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 4px 0 4px 0;
  margin: 0 0 0 0;
  width: 90vw;
  max-width: 820px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dashboard-summary-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 32px;
  width: 100%;
  margin-top: 18px;
}
.summary-item {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  max-width: 160px;
  padding: 6px 6px 6px 6px;
  margin: 0;
  height: 60px;
}
.summary-title {
  color: #ff6600;
  font-size: 0.92rem;
  margin-bottom: 2px;
  font-weight: 500;
  text-align: center;
}
.summary-value {
  font-size: 1.08rem;
  font-weight: bold;
  margin-top: 1px;
  letter-spacing: 0.2px;
  text-align: center;
  word-break: keep-all;
}
.nowrap {
  white-space: nowrap;
}
.online-status {
  font-size: 1.08rem;
}
.online {
  color: #1a7f37;
}
.offline {
  color: #b91c1c;
}
@media (max-width: 700px) {
  .dashboard-card-light {
    width: 98vw;
    min-width: 0;
    padding: 4px 0;
  }
  .dashboard-summary-row {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    margin-top: 8px;
  }
  .summary-item {
    min-width: 0;
    max-width: 100%;
    width: 100%;
    margin-bottom: 4px;
    height: auto;
  }
}
</style>
