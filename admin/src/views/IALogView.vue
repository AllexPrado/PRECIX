<template>
  <div class="ia-central-root">
    <h1 class="ia-title">Central de IAs</h1>
    <button class="back-btn" @click="goBack">← Voltar ao Painel</button>
    <div class="ia-central-tabs">
      <button :class="['ia-central-tab', {active: tab==='chat'}]" @click="tab='chat'">Chat</button>
      <button :class="['ia-central-tab', {active: tab==='insights'}]" @click="tab='insights'">Automações</button>
    </div>
    <div v-if="tab==='chat'" class="ia-chat-panel">
      <h2 class="ia-chat-panel-title">Converse com a Central de IAs</h2>
      <div class="ia-chat-messages">
        <div v-for="(msg, idx) in chatHistory" :key="idx" :class="['ia-msg-row', msg.role]">
          <span class="ia-msg-author" :class="msg.role">{{ msg.role === 'user' ? 'Você:' : 'IA:' }}</span>
          <span class="ia-msg-bubble" :class="msg.role">{{ msg.text }}</span>
        </div>
        <div v-if="chatLoading" class="ia-msg-row ia">
          <span class="ia-msg-author ia">IA:</span>
          <span class="ia-msg-bubble ia">Digitando...</span>
        </div>
      </div>
      <form @submit.prevent="sendChat" class="ia-chat-form">
        <input v-model="chatInput" placeholder="Digite sua mensagem para a Central de IAs..." :disabled="chatLoading" />
        <button type="submit" :disabled="!chatInput || chatLoading">Enviar</button>
      </form>
      <div v-if="chatError" class="ia-chat-error">{{ chatError }}</div>
      <div class="ia-suggestions-panel">
        <h3>Sugestões Inteligentes</h3>
        <ul>
          <li v-for="sug in chatSuggestions" :key="sug" @click="useSuggestion(sug)">{{ sug }}</li>
        </ul>
      </div>
    </div>
    <div v-if="tab==='insights'" class="ia-automations-panel">
      <h2 class="ia-chat-panel-title">Automações Inteligentes</h2>
      <div class="ia-automations-content">
        <div v-if="automationsLoading">Carregando automações...</div>
        <div v-else-if="automationsError" class="ia-chat-error">{{ automationsError }}</div>
        <div v-else>
          <div v-if="automations.length === 0">Nenhuma automação disponível.</div>
          <ul v-else>
            <li v-for="automation in automations" :key="automation.name" class="automation-item">
              <div class="automation-header">
                <b>{{ automation.name.replace(/_/g, ' ').toUpperCase() }}</b>
                <span :class="['automation-status', automation.status]">{{ automation.status }}</span>
              </div>
              <div class="automation-desc">{{ automation.desc }}</div>
              <button class="automation-run-btn" @click="runAutomation(automation)" :disabled="automation.running">
                {{ automation.running ? 'Executando...' : 'Executar' }}
              </button>
              <div v-if="automation.result" class="automation-result">
                <b>Resultado:</b> {{ automation.result }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="ia-anomalies-panel">
        <h3>Anomalias & Relatórios</h3>
        <button @click="fetchAnomalies" class="anomaly-btn">Atualizar Anomalias</button>
        <ul>
          <li v-for="anom in anomalies" :key="anom.timestamp">
            <b>{{ anom.suggestion }}</b> <span style="color:#888">({{ anom.timestamp }})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IACentralView',
  data() {
    return {
      tab: 'chat',
      chatInput: '',
      chatHistory: [],
      chatLoading: false,
      chatError: '',
      chatSuggestions: [
        'Quais automações estão disponíveis?',
        'Há algum problema detectado no sistema?',
        'Gerar relatório de otimização',
        'Executar automação de atualização de preços'
      ],
      automations: [],
      automationsLoading: false,
      automationsError: '',
      anomalies: [],
    }
  },
  watch: {
    tab(newTab) {
      if (newTab === 'insights') this.fetchAutomations()
    }
  },
  methods: {
    goBack() {
      this.$router.push('/dashboard')
    },
    async sendChat() {
      if (!this.chatInput) return;
      this.chatLoading = true;
      this.chatError = '';
      const userMsg = { role: 'user', text: this.chatInput };
      this.chatHistory = [...this.chatHistory, userMsg];
      const currentInput = this.chatInput;
      const history = this.chatHistory.map(m => ({ role: m.role, text: m.text }));
      this.chatInput = '';
      try {
        const res = await fetch('/admin/ia-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: currentInput, history })
        });
        const data = await res.json();
        if (data && data.reply) {
          this.chatHistory = [...this.chatHistory, { role: 'ia', text: data.reply }];
        } else {
          this.chatError = 'Sem resposta da IA.';
        }
      } catch (e) {
        this.chatError = 'Erro ao comunicar com a IA.';
      }
      this.chatLoading = false;
    },
    useSuggestion(sug) {
      this.chatInput = sug;
      this.sendChat();
    },
    async fetchAutomations() {
      this.automationsLoading = true;
      this.automationsError = '';
      try {
        const res = await fetch('/admin/ia-automation/list');
        const data = await res.json();
        // Apenas automações relevantes para execução manual
        const extras = [
          { name: 'ia_autonomous_check_devices', desc: 'Verificar dispositivos offline manualmente.', status: 'pronto' },
          { name: 'ia_autonomous_fix_product_data', desc: 'Corrigir dados inconsistentes de produtos manualmente.', status: 'pronto' },
          { name: 'ia_autonomous_fix_outlier_prices', desc: 'Corrigir preços fora do padrão manualmente.', status: 'pronto' },
          { name: 'executar_todas_automacoes_autonomas', desc: 'Executar todas as automações autônomas do sistema (checagem de dispositivos, correção de produtos/outliers, etc).', status: 'pronto' }
        ];
        this.automations = (data.automations || []).concat(extras);
      } catch (e) {
        this.automationsError = 'Erro ao carregar automações.';
      }
      this.automationsLoading = false;
    },
    async runAutomation(automation) {
      automation.running = true;
      automation.result = '';
      try {
        let action = automation.name;
        if (action.startsWith('ia_autonomous_')) {
          const res = await fetch('/admin/ia-automation/execute-autonomous', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action })
          });
          const data = await res.json();
          automation.result = data.message || 'Executado.';
        } else if (action === 'executar_todas_automacoes_autonomas') {
          const res = await fetch('/admin/ia-analyze-logs', { method: 'POST' });
          const data = await res.json();
          automation.result = data.message || 'Executado.';
        } else {
          const res = await fetch('/admin/ia-automation/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action })
          });
          const data = await res.json();
          automation.result = data.message || 'Executado.';
        }
      } catch (e) {
        automation.result = 'Erro ao executar automação.';
      }
      automation.running = false;
    },
    async fetchAnomalies() {
      try {
        const res = await fetch('/admin/ia-health-dashboard');
        const data = await res.json();
        this.anomalies = (data.optimizations || []).map(o => ({ suggestion: o.suggestion, timestamp: o.timestamp }));
      } catch (e) {
        this.anomalies = [{ suggestion: 'Erro ao buscar anomalias.', timestamp: new Date().toISOString() }];
      }
    },
    async sendSpecialRequest(type) {
      this.chatLoading = true;
      this.chatError = '';
      let endpoint = '';
      if (type === 'system_status') endpoint = '/admin/ia-special/check-system-status';
      if (type === 'endpoint_health') endpoint = '/admin/ia-special/check-endpoint-health';
      if (!endpoint) return;
      try {
        const res = await fetch(endpoint, { method: 'POST' });
        const data = await res.json();
        let msg = '';
        if (type === 'system_status' && data.system_status) {
          msg = 'Status do sistema: ' + JSON.stringify(data.system_status);
        } else if (type === 'endpoint_health' && data.healthchecks) {
          msg = 'Healthcheck dos endpoints:\n' + data.healthchecks.map(h => `${h.endpoint}: ${h.ok ? 'OK' : 'FALHA'} (${h.status})`).join('\n');
        } else {
          msg = 'Nenhuma informação retornada.';
        }
        this.chatHistory = [...this.chatHistory, { role: 'ia', text: msg }];
      } catch (e) {
        this.chatError = 'Erro ao consultar função especializada.';
      }
      this.chatLoading = false;
    },
  },
  mounted() {
    if (this.tab === 'insights') this.fetchAutomations();
  }
}
</script>

<style scoped>
.ia-central-root {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 16px #0001;
}
.ia-title {
  color: #1a237e;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}
.back-btn {
  background: #fff;
  color: #1a237e;
  border: 1.5px solid #1a237e;
  border-radius: 5px;
  padding: 7px 18px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #e3e8ff;
}
.ia-central-tabs {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 2rem;
}
.ia-central-tab {
  background: #fff;
  color: #1a237e;
  border: 1.5px solid #bdbdbd;
  border-radius: 5px 5px 0 0;
  padding: 0.7rem 2.2rem;
  font-size: 1.08rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.ia-central-tab.active {
  background: #fff8f0;
  color: #ff9800;
  border-bottom: 2.5px solid #ff9800;
  font-weight: 700;
}
.ia-chat-panel, .ia-automations-panel {
  background: #fafbfc;
  border-radius: 7px;
  border: 1px solid #e0e0e0;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  margin-bottom: 2rem;
}
.ia-chat-panel-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}
.ia-chat-messages {
  min-height: 120px;
  margin-bottom: 1.2rem;
}
.ia-msg-row {
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.7rem;
}
.ia-msg-author {
  font-weight: 700;
  margin-right: 0.5rem;
}
.ia-msg-author.user {
  color: #1a237e;
}
.ia-msg-author.ia {
  color: #1976d2;
}
.ia-msg-bubble {
  background: #fff8f0;
  color: #23272f;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1.05rem;
  box-shadow: 0 1px 4px #0001;
  word-break: break-word;
}
.ia-msg-bubble.user {
  background: #ffe0b2;
  color: #ff9800;
}
.ia-msg-bubble.ia {
  background: #e3f2fd;
  color: #1976d2;
}
.ia-chat-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
.ia-chat-form input {
  flex: 1;
  padding: 0.7rem;
  border-radius: 4px;
  border: 1.5px solid #bdbdbd;
  font-size: 1rem;
  background: #fff;
  color: #23272f;
}
.ia-chat-form button {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.ia-chat-form button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.ia-chat-error {
  color: #c00;
  margin-top: 0.5rem;
  text-align: center;
}
.ia-automations-content {
  color: #888;
  font-size: 1.1rem;
  padding: 1.5rem 0;
  text-align: center;
}
.log-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
}
.log-modal h3 {
  margin: 0;
  font-size: 1.5rem;
}
.log-modal pre {
  background: #333;
  padding: 1rem;
  border-radius: 5px;
  overflow: auto;
  flex: 1;
}
.log-modal button {
  align-self: flex-end;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.log-modal button:hover {
  background: #e68900;
}
.ia-suggestions-panel {
  margin-top: 2rem;
  background: #e3f2fd;
  border-radius: 7px;
  border: 1px solid #90caf9;
  padding: 1.2rem 1.5rem;
}
.ia-suggestions-panel h3 {
  color: #1976d2;
  margin-bottom: 1rem;
}
.ia-suggestions-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}
.ia-suggestions-panel li {
  background: #fff;
  color: #1976d2;
  border: 1px solid #90caf9;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.ia-suggestions-panel li:hover {
  background: #1976d2;
  color: #fff;
}
.automation-item {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 1.2rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 1px 4px #0001;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.automation-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.1rem;
}
.automation-status {
  font-weight: 600;
  color: #388e3c;
}
.automation-desc {
  color: #555;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.automation-run-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.automation-run-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.automation-result {
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  font-size: 0.98rem;
}
.ia-anomalies-panel {
  margin-top: 2.5rem;
  background: #fff8f0;
  border-radius: 7px;
  border: 1px solid #ffe0b2;
  padding: 1.2rem 1.5rem;
}
.ia-anomalies-panel h3 {
  color: #ff9800;
  margin-bottom: 1rem;
}
.anomaly-btn {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: background 0.2s;
}
.anomaly-btn:hover {
  background: #e68900;
}
</style>
