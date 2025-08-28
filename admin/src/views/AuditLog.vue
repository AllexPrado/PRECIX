<template>
  <div class="audit-log-bg">
    <div class="audit-log-card">
      <header>
        <h2>Logs de Auditoria</h2>
        <button @click="$router.back()">&larr; Voltar</button>
      </header>
      
      <!-- Filtros -->
      <div class="filters">
        <div class="filter-row">
          <select v-model="filterAction">
            <option value="">Todas as ações</option>
            <option value="DEVICE_CREATED">Dispositivo Criado</option>
            <option value="DEVICE_ONLINE">Dispositivo Online</option>
            <option value="DEVICE_OFFLINE">Dispositivo Offline</option>
            <option value="DEVICE_DELETED">Dispositivo Removido</option>
          </select>
          <input v-model="filterDevice" placeholder="🔍 Buscar por dispositivo" />
          <select v-model="logLimit">
            <option :value="25">Últimos 25</option>
            <option :value="50">Últimos 50</option>
            <option :value="100">Últimos 100</option>
          </select>
          <button @click="refreshLogs" class="refresh-btn">🔄 Atualizar</button>
        </div>
      </div>
      
      <div v-if="filteredLogs.length === 0" class="empty">Nenhum log encontrado.</div>
      
      <!-- Lista de logs -->
      <div class="logs-container">
        <div v-for="log in filteredLogs" :key="log.id" class="log-item" :class="getLogClass(log.action)">
          <div class="log-header">
            <span class="log-action">{{ getActionText(log.action) }}</span>
            <span class="log-time">{{ formatTime(log.timestamp) }}</span>
          </div>
          <div class="log-content">
            <span v-if="log.device_name" class="device-name">{{ log.device_name }}</span>
            <span v-if="log.details" class="log-details">{{ log.details }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { api } from '../apiBase.js'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const logs = ref([])
const filterAction = ref('')
const filterDevice = ref('')
const logLimit = ref(50)

// Computed para logs filtrados
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    // Filtro por ação
    if (filterAction.value && log.action !== filterAction.value) {
      return false
    }
    
    // Filtro por nome do dispositivo
    if (filterDevice.value && log.device_name && !log.device_name.toLowerCase().includes(filterDevice.value.toLowerCase())) {
      return false
    }
    
    return true
  })
})

async function fetchLogs() {
  try {
  const res = await fetch(api(`/admin/audit-logs?limit=${logLimit.value}`))
    logs.value = await res.json()
  } catch (error) {
    console.error('Erro ao buscar logs:', error)
  }
}

function refreshLogs() {
  fetchLogs()
}

function formatTime(timestamp) {
  const d = dayjs(timestamp)
  if (!d.isValid()) return String(timestamp)
  return `${d.format('DD/MM/YYYY HH:mm:ss')} (${d.fromNow()})`
}

function getActionText(action) {
  const actions = {
    'DEVICE_CREATED': '✅ Criado',
    'DEVICE_ONLINE': '🟢 Online',
    'DEVICE_OFFLINE': '🔴 Offline',
    'DEVICE_DELETED': '❌ Removido'
  }
  return actions[action] || action
}

function getLogClass(action) {
  const classes = {
    'DEVICE_CREATED': 'log-created',
    'DEVICE_ONLINE': 'log-online',
    'DEVICE_OFFLINE': 'log-offline',
    'DEVICE_DELETED': 'log-deleted'
  }
  return classes[action] || ''
}

// Recarrega logs quando o limite muda
watch(logLimit, () => {
  fetchLogs()
})

onMounted(() => {
  fetchLogs()
  // Auto-refresh a cada 30 segundos
  setInterval(fetchLogs, 30000)
})
</script>

<style scoped>
.audit-log-bg { min-height: 100vh; background: #fff3e0; display: flex; align-items: center; justify-content: center; padding: 14px; }
.audit-log-card { background: #fff; border-radius: 14px; box-shadow: 0 6px 24px #ff66001a; padding: 16px; min-width: 300px; max-width: 1100px; width: 100%; }
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.filters {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 18px;
  border: 1px solid #e0e0e0;
}
.filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-row input, .filter-row select {
  flex: 1;
  min-width: 140px;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #FF6600;
  background: #ffffff;
  color: #212121;
}
.refresh-btn {
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  flex-shrink: 0;
}
.refresh-btn:hover {
  background: #218838;
}
button {
  background: #FF6600;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}
.empty {
  color: #888;
  text-align: center;
  padding: 20px;
}
.logs-container { max-height: 60vh; overflow-y: auto; }
.log-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: background-color 0.2s;
}
.log-item:hover {
  background: #f8f9fa;
}
.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.log-action {
  font-weight: bold;
  font-size: 1.1em;
  color: #212121;
}
.log-time {
  color: #666;
  font-size: 0.9em;
}
.log-content {
  display: flex;
  gap: 12px;
  align-items: center;
}
.device-name {
  background: #e6f7ff;
  color: #0077b6;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.9em;
}
.log-details {
  color: #333;
  font-size: 0.9em;
}
/* Classes específicas por tipo de log */
.log-created {
  border-left: 4px solid #28a745;
}
.log-online {
  border-left: 4px solid #17a2b8;
}
.log-offline {
  border-left: 4px solid #dc3545;
}
.log-deleted {
  border-left: 4px solid #6c757d;
}
</style>
