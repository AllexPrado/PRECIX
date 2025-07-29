<template>
  <div class="agent-manager-bg">
    <div class="agent-manager-card">
      <header>
        <h2>Gerenciar Agentes Locais</h2>
        <button @click="$router.back()">&larr; Voltar</button>
      </header>
      <div v-if="loading" class="loading">Carregando agentes...</div>
      <div v-else>
        <div v-if="agents.length === 0" class="empty">Nenhum agente local registrado.</div>
        <table v-else>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Última Atualização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in agents" :key="agent.id">
              <td><span class="badge-id">{{ agent.id }}</span></td>
              <td>
                <span :style="{color: agent.status === 'online' ? 'green' : 'red', fontWeight: 'bold'}">
                  {{ agent.status === 'online' ? 'Online' : 'Offline' }}
                </span>
              </td>
              <td>
                <span v-if="agent.last_update">{{ agent.last_update }}</span>
                <span v-else>Nunca conectado</span>
              </td>
              <td>
                <button @click="viewLogs(agent.id)">Ver Logs</button>
                <button @click="sendCommand(agent.id)">Enviar Comando</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="selectedAgentLogs" class="logs-modal">
          <h3>Logs do Agente {{ selectedAgentId }}</h3>
          <pre>{{ selectedAgentLogs }}</pre>
          <button @click="selectedAgentLogs = null">Fechar</button>
        </div>
        <div v-if="showCommandDialog" class="command-modal">
          <h3>Enviar Comando para Agente {{ selectedAgentId }}</h3>
          <input v-model="commandText" placeholder="Digite o comando" />
          <button @click="confirmSendCommand">Enviar</button>
          <button @click="showCommandDialog = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'AgentManager',
  setup() {
    const agents = ref([])
    const loading = ref(true)
    const selectedAgentLogs = ref(null)
    const selectedAgentId = ref(null)
    const showCommandDialog = ref(false)
    const commandText = ref('')

    const fetchAgents = async () => {
      loading.value = true
      try {
        const res = await fetch('/admin/agents')
        agents.value = await res.json()
      } catch (e) {
        agents.value = []
      }
      loading.value = false
    }

    const viewLogs = async (agentId) => {
      selectedAgentId.value = agentId
      const res = await fetch(`/admin/agents/${agentId}/logs`)
      selectedAgentLogs.value = await res.text()
    }

    const sendCommand = (agentId) => {
      selectedAgentId.value = agentId
      showCommandDialog.value = true
    }

    const confirmSendCommand = async () => {
      await fetch(`/admin/agents/${selectedAgentId.value}/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: commandText.value })
      })
      showCommandDialog.value = false
      commandText.value = ''
    }

    onMounted(fetchAgents)

    return {
      agents,
      loading,
      selectedAgentLogs,
      selectedAgentId,
      showCommandDialog,
      commandText,
      viewLogs,
      sendCommand,
      confirmSendCommand
    }
  }
}
</script>

<style scoped>
.agent-manager-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff8f0 0%, #fff 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 0;
}
.agent-manager-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 2rem 2.5rem;
  min-width: 700px;
  max-width: 900px;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
h2 {
  margin: 0;
  font-size: 2rem;
  color: #FF6600;
}
button {
  background: #FF6600;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 8px;
}
button:hover {
  background: #e65c00;
}
.loading {
  color: #888;
  font-size: 1.1em;
}
.empty {
  color: #888;
  margin-bottom: 12px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
pre {
  background: #222;
  color: #fff;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 8px;
}
.badge-id {
  background: #e6f7ff;
  color: #0077b6;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.95em;
  margin-left: 0;
}
.logs-modal, .command-modal {
  background: #fff8f0;
  border: 2px solid #FF6600;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}
</style>
