<template>
  <div class="ia-log-view">
    <h2>Central de IA</h2>
    <button @click="goBack" class="back-btn">⬅ Voltar ao Painel</button>
    <div class="tabs">
      <button :class="{active: tab==='status'}" @click="tab='status'">Status & Chat</button>
      <button :class="{active: tab==='logs'}" @click="tab='logs'">Logs & Eventos</button>
      <button :class="{active: tab==='insights'}" @click="tab='insights'">Insights (futuro)</button>
    </div>
    <div v-if="tab==='status'">
      <div class="ia-status-chat">
        <div class="ia-status">
          <strong>Status da IA:</strong>
          <span :class="{'online': iaOnline, 'offline': !iaOnline}">{{ iaOnline ? 'Online' : 'Offline' }}</span>
          <span v-if="lastIaPing">(Último ping: {{ formatDate(lastIaPing) }})</span>
          <button @click="checkIaStatus" class="ping-btn">Ping IA</button>
        </div>
        <div class="ia-chat">
          <h3>Chat com o Agente IA</h3>
          <div class="chat-history">
            <div v-for="(msg, idx) in chatHistory" :key="idx" :class="msg.role">
              <span class="role">{{ msg.role === 'user' ? 'Você' : 'IA' }}:</span>
              <span class="msg">{{ msg.text }}</span>
            </div>
          </div>
          <form @submit.prevent="sendChat">
            <input v-model="chatInput" placeholder="Digite sua mensagem para a IA..." :disabled="!iaOnline || chatLoading" />
            <button type="submit" :disabled="!chatInput || !iaOnline || chatLoading">Enviar</button>
          </form>
          <div v-if="chatLoading" class="loading">Aguardando resposta da IA...</div>
          <div v-if="chatError" class="error">{{ chatError }}</div>
        </div>
      </div>
    </div>
    <div v-if="tab==='logs'">
      <button @click="fetchEvents" class="refresh-btn">🔄 Atualizar</button>
      <div v-if="loading" class="loading">Carregando...</div>
      <div v-else>
        <table v-if="events.length">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Evento</th>
              <th>Detalhes</th>
              <th>Resposta IA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, idx) in events.slice().reverse()" :key="idx">
              <td>{{ formatDate(event.timestamp) }}</td>
              <td><span class="event-type">{{ event.event_type }}</span></td>
              <td><pre class="details">{{ pretty(event.details) }}</pre></td>
              <td><pre :class="{'error': event.response && event.response.error}">{{ pretty(event.response) }}</pre></td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty">Nenhum evento registrado ainda.</div>
      </div>
    </div>
    <div v-if="tab==='insights'">
      <div class="empty" v-if="loadingAutomations">Carregando automações inteligentes...</div>
      <div v-else>
        <div v-if="automations.length">
          <h3>Automação Inteligente</h3>
          <ul class="automation-list">
            <li v-for="(auto, idx) in automations" :key="idx">
              <div class="auto-title">{{ auto.title }}</div>
              <div class="auto-desc">{{ auto.desc }}</div>
              <button @click="runAutomation(auto)" class="run-btn">Executar</button>
            </li>
          </ul>
        </div>
        <div v-else class="empty">Nenhuma automação sugerida pela IA ainda.</div>
        <div v-if="automationHistory.length">
          <h4 style="margin-top:2rem;">Histórico de Automações</h4>
          <ul class="automation-list">
            <li v-for="(item, idx) in automationHistory.slice().reverse()" :key="idx">
              <span class="auto-title">{{ item.action }}</span>
              <span class="auto-desc">({{ formatDate(item.timestamp) }})</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="automationMsg" class="automation-msg">{{ automationMsg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IALogView',
  data() {
    return {
      tab: 'status',
      events: [],
      loading: false,
      iaOnline: false,
      lastIaPing: null,
      chatInput: '',
      chatHistory: [],
      chatLoading: false,
      chatError: '',
      automations: [],
      loadingAutomations: false,
      automationMsg: '',
      automationHistory: []
    }
  },
  methods: {
    goBack() {
      this.$router.push('/dashboard')
    },
    async fetchEvents() {
      this.loading = true;
      try {
        const res = await fetch('/admin/ia-events');
        this.events = await res.json();
      } catch (e) {
        this.events = [];
      }
      this.loading = false;
    },
    formatDate(dt) {
      if (!dt) return '';
      return new Date(dt).toLocaleString();
    },
    pretty(obj) {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return JSON.stringify(obj, null, 2);
    },
    async checkIaStatus() {
      this.iaOnline = false;
      this.lastIaPing = null;
      try {
        const res = await fetch('/admin/ia-health');
        const data = await res.json();
        this.iaOnline = !!data.online;
        this.lastIaPing = data.timestamp || new Date().toISOString();
      } catch (e) {
        this.iaOnline = false;
      }
    },
    async sendChat() {
      if (!this.chatInput) return;
      this.chatLoading = true;
      this.chatError = '';
      const userMsg = { role: 'user', text: this.chatInput };
      this.chatHistory = [...this.chatHistory, userMsg];
      const currentInput = this.chatInput;
      this.chatInput = '';
      try {
        const res = await fetch('/admin/ia-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: currentInput })
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
    async fetchAutomations() {
      this.loadingAutomations = true;
      this.automationMsg = '';
      try {
        const res = await fetch('/admin/ia-automations');
        const data = await res.json();
        this.automations = data.suggestions || [];
        // Histórico de execuções
        if (data.history) this.automationHistory = data.history;
      } catch (e) {
        this.automations = [];
      }
      this.loadingAutomations = false;
    },
    async runAutomation(auto) {
      this.automationMsg = '';
      try {
        const res = await fetch('/admin/ia-automation/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: auto.title, params: {} })
        });
        const data = await res.json();
        this.automationMsg = data.message || 'Ação executada.';
        this.fetchAutomations(); // Atualiza histórico após execução
      } catch (e) {
        this.automationMsg = 'Erro ao executar automação.';
      }
    }
  },
  mounted() {
    this.fetchEvents();
    this.checkIaStatus();
  },
  watch: {
    tab(val) {
      if (val === 'insights') this.fetchAutomations();
    }
  }
}
</script>

<style scoped>
.ia-log-view {
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  background: var(--main-bg, #fcfcfc);
}
h2 {
  margin-bottom: 1.5rem;
  color: var(--primary, #1a237e);
}
.back-btn {
  margin-bottom: 1rem;
  margin-right: 1rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  background: var(--btn-bg, #f5f5f5);
  border: 1px solid var(--border, #bbb);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--primary, #1a237e);
}
.back-btn:hover {
  background: var(--btn-hover, #e0e0e0);
}
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.tabs button {
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
  background: var(--btn-bg, #f5f5f5);
  border: 1px solid var(--border, #bbb);
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--primary, #1a237e);
}
.tabs button.active {
  background: #fff;
  border-bottom: 2px solid var(--accent, #ff9800);
  font-weight: bold;
  color: var(--accent, #ff9800);
}
.refresh-btn {
  margin-bottom: 1rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  background: var(--btn-bg, #f5f5f5);
  border: 1px solid var(--border, #bbb);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--primary, #1a237e);
}
.refresh-btn:hover {
  background: var(--btn-hover, #e0e0e0);
}
.loading {
  font-size: 1.1em;
  color: var(--muted, #888);
  margin: 2rem 0;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px #0001;
}
th, td {
  border: 1px solid #e0e0e0;
  padding: 0.6rem 0.7rem;
  text-align: left;
  vertical-align: top;
}
th {
  background: #f7f7f7;
  font-weight: bold;
  color: var(--primary, #1a237e);
}
.event-type {
  font-weight: bold;
  color: var(--accent, #ff9800);
  letter-spacing: 0.5px;
}
.details {
  background: #f9f9f9;
  border-radius: 3px;
  padding: 0.3rem 0.5rem;
  font-size: 0.97em;
}
pre {
  margin: 0;
  font-size: 0.97em;
  white-space: pre-wrap;
  word-break: break-word;
}
.error {
  color: #c00;
  font-weight: bold;
}
.empty {
  margin: 2rem 0;
  color: var(--muted, #888);
  font-size: 1.1em;
  text-align: center;
}
.ia-status-chat {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
}
.ia-status {
  margin-bottom: 1.5rem;
}
.ia-status strong {
  display: inline-block;
  width: 120px;
}
.online {
  color: #2ecc71;
}
.offline {
  color: #e74c3c;
}
.ping-btn {
  margin-left: 1rem;
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  background: var(--accent, #ff9800);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.ping-btn:hover {
  background: #e65100;
}
.ia-chat {
  margin-top: 1rem;
}
.chat-history {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}
.chat-history .user {
  text-align: right;
}
.chat-history .ia {
  text-align: left;
}
.role {
  font-weight: bold;
  color: var(--primary, #1a237e);
}
.msg {
  display: inline-block;
  margin-top: 0.2rem;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
}
.ia .msg {
  background: #e1f5fe;
  color: var(--primary, #1a237e);
}
.user .msg {
  background: #ffe0b2;
  color: var(--accent, #ff9800);
}
form {
  display: flex;
  gap: 0.5rem;
}
input {
  flex: 1;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button[type="submit"] {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background: var(--accent, #ff9800);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
button[type="submit"]:hover {
  background: #e65100;
}
.automation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.auto-title {
  font-weight: bold;
  color: var(--primary, #1a237e);
}
.auto-desc {
  margin: 0.2rem 0 0.8rem;
  color: var(--muted, #666);
}
.run-btn {
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  background: var(--accent, #ff9800);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.run-btn:hover {
  background: #e65100;
}
.automation-msg {
  margin-top: 1rem;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  color: var(--primary, #1a237e);
}
</style>
