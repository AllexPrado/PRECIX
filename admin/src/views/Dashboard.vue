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
          <span class="summary-value">{{ formatTSClean(status.last_sync) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-title">Status do Sistema</span>
          <span class="summary-value online-status" :class="status.online ? 'online' : 'offline'">{{ status.online ? 'Online' : 'Offline' }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-title">Último backup</span>
          <span class="summary-value">{{ formatTSClean(status.last_backup) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const status = ref({})

function formatTSClean(ts) {
  if (!ts) return '---'
  const d = dayjs.utc(ts).tz('America/Sao_Paulo')
  return d.isValid() ? d.format('DD/MM/YYYY HH:mm') : '---'
}
function formatTS(ts) {
  if (!ts) return '---'
  const d = dayjs.utc(ts).tz('America/Sao_Paulo')
  return d.isValid() ? d.format('ddd, DD/MM/YYYY HH:mm:ss') : String(ts)
}
function fromNow(ts) {
  if (!ts) return ''
  const d = dayjs.utc(ts).tz('America/Sao_Paulo')
  return d.isValid() ? d.fromNow() : ''
}

onMounted(async () => {
  try {
    const res = await axios.get('/admin/status')
    status.value = res.data
  } catch (e) {
    // noop
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
  padding: 16px 0;
  margin: 0;
  width: 94vw;
  max-width: 980px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #212121;
}
.dashboard-summary-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
  width: 100%;
  margin-top: 8px;
  flex-wrap: wrap;
}
.summary-item {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  max-width: 260px;
  padding: 16px 12px;
  margin: 0;
  min-height: 64px;
}
.summary-title {
  color: #ff6600;
  font-size: 0.92rem;
  margin-bottom: 6px;
  font-weight: 500;
  text-align: center;
}
.summary-value {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0;
  letter-spacing: 0.2px;
  text-align: center;
  word-break: keep-all;
  color: #212121;
}
.nowrap { white-space: nowrap; }
.muted { color: #6b7280; font-weight: 500; }
.summary-relative { 
  color: #6b7280; 
  font-weight: 400; 
  font-size: 0.82rem;
  margin-top: 2px;
  display: block;
}
.online-status { font-size: 1.06rem; }
.online { color: #1a7f37; }
.offline { color: #b91c1c; }
@media (max-width: 700px) {
  .dashboard-card-light {
    width: 98vw;
    min-width: 0;
    padding: 12px 0;
    margin: 10px;
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
    height: auto;
    padding: 14px 12px;
  }
}
@media (max-width: 480px) {
  .dashboard-bg {
    padding: 10px;
  }
  .dashboard-card-light {
    width: 100%;
    padding: 8px 0;
    margin: 0;
    border-radius: 8px;
  }
  .dashboard-summary-row {
    gap: 8px;
    margin-top: 4px;
  }
  .summary-item {
    padding: 12px 10px;
    min-height: 50px;
  }
  .summary-title {
    font-size: 0.85rem;
    margin-bottom: 4px;
  }
  .summary-value {
    font-size: 1rem;
  }
}
</style>
