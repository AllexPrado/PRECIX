<template>
  <div class="ia-central-root">
    <h1 class="ia-title">Central de IAs</h1>
    <button class="back-btn" @click="goBack">← Voltar ao Painel</button>
    <div class="ia-central-tabs">
      <button :class="['ia-central-tab', {active: tab==='chat'}]" @click="tab='chat'">Chat</button>
      <button :class="['ia-central-tab', {active: tab==='logs'}]" @click="tab='logs'">Logs & Eventos</button>
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
    </div>
    <div v-if="tab==='logs'" class="ia-logs-panel">
      <h2 class="ia-chat-panel-title">Logs & Eventos</h2>
      <div class="ia-logs-content">
        <div v-if="logsLoading">Carregando logs...</div>
        <div v-else-if="logsError" class="ia-chat-error">{{ logsError }}</div>
        <div v-else>
          <div v-if="logs.length === 0">Nenhum log encontrado.</div>
          <ul v-else>
            <li v-for="log in logs" :key="log">{{ log }}</li>
          </ul>
        </div>
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
            <li v-for="automation in automations" :key="automation">{{ automation }}</li>
          </ul>
        </div>
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
      logs: [],
      logsLoading: false,
      logsError: '',
      automations: [],
      automationsLoading: false,
      automationsError: ''
    }
  },
  watch: {
    tab(newTab) {
      if (newTab === 'logs') this.fetchLogs()
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
    async fetchLogs() {
      this.logsLoading = true;
      this.logsError = '';
      try {
        const res = await fetch('/admin/ia-logs/list');
        const data = await res.json();
        this.logs = data.logs || [];
      } catch (e) {
        this.logsError = 'Erro ao carregar logs.';
      }
      this.logsLoading = false;
    },
    async fetchAutomations() {
      this.automationsLoading = true;
      this.automationsError = '';
      try {
        const res = await fetch('/admin/ia-automation/list');
        const data = await res.json();
        this.automations = data.automations || [];
      } catch (e) {
        this.automationsError = 'Erro ao carregar automações.';
      }
      this.automationsLoading = false;
    }
  },
  mounted() {
    // Carrega logs/automations se a aba já estiver selecionada
    if (this.tab === 'logs') this.fetchLogs();
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
.ia-chat-panel, .ia-logs-panel, .ia-automations-panel {
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
.ia-logs-content, .ia-automations-content {
  color: #888;
  font-size: 1.1rem;
  padding: 1.5rem 0;
  text-align: center;
}
</style>
