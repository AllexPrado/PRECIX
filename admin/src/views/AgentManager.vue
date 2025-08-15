
<template>
  <div class="agent-manager-bg">
    <div class="agent-manager-card">
      <h2 class="title">Agentes Locais</h2>
      <div v-if="loading" class="empty">Carregando agentes...</div>
      <div v-else-if="error" class="empty">Erro ao buscar agentes locais.</div>
      <div v-else-if="agents.length === 0" class="empty">Nenhum agente local encontrado.</div>
      <div v-else class="table-wrapper">
        <table class="agents-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Loja</th>
              <th>Última atualização</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in agents" :key="agent.id">
              <td>{{ agent.id }}</td>
              <td>
                <span :class="['status-badge', agent.status]">{{ agent.status }}</span>
              </td>
              <td>{{ agent.loja_nome || agent.loja_codigo || '-' }}</td>
              <td>{{ agent.last_update ? new Date(agent.last_update).toLocaleString() : '-' }}</td>
              <td>{{ agent.ip || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const agents = ref([])
const loading = ref(true)
const error = ref(false)

async function fetchAgents() {
  loading.value = true
  error.value = false
  try {
    const res = await axios.get('http://localhost:8000/admin/agents')
    agents.value = Array.isArray(res.data) ? res.data : []
  } catch (e) {
    error.value = true
    agents.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchAgents)
</script>

<style scoped>
.agent-manager-bg {
  min-height: 100vh;
  background: #fff3e0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.agent-manager-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #ff66001a;
  padding: 36px 28px;
  min-width: 340px;
  max-width: 900px;
  width: 100%;
}
.agent-manager-bg {
  min-height: 100vh;
  background: #fff3e0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 40px;
}
.agent-manager-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #ff66001a;
  padding: 36px 28px 28px 28px;
  min-width: 340px;
  max-width: 900px;
  width: 100%;
}
.title {
  color: #ff6600;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 18px;
  margin-top: 0;
}
.table-wrapper {
  overflow-x: auto;
}
table.agents-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #ff66001a;
  margin-top: 0;
}
table.agents-table th, table.agents-table td {
  padding: 10px 16px;
  text-align: left;
}
table.agents-table th {
  background: #fff3e0;
  color: #ff6600;
  font-weight: 700;
  border-bottom: 2px solid #ff6600;
}
table.agents-table tr {
  border-bottom: 1px solid #ffe0b2;
}
table.agents-table tr:last-child {
  border-bottom: none;
}
.status-badge {
  display: inline-block;
  min-width: 60px;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  background: #ffe0b2;
  color: #ff6600;
  text-transform: lowercase;
}
.status-badge.online {
  background: #e0ffe0;
  color: #2e7d32;
}
.status-badge.offline {
  background: #ffe0e0;
  color: #c62828;
}
.empty {
  color: #ff6600;
  font-weight: bold;
  margin-top: 24px;
  text-align: center;
}
</style>
