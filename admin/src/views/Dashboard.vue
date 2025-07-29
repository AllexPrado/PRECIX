<template>
  <div class="dashboard-bg">
    <div class="dashboard-container">
      <header>
        <img src="/logo-sonda.png" alt="Logo Sonda" class="logo" />
        <h2>Painel Administrativo PreciX</h2>
        <button class="logout" @click="logout">Sair</button>
      </header>
      <main>
        <section class="status">
          <h3>Status do Sistema</h3>
          <ul>
            <li><strong>Produtos sincronizados:</strong> <span>{{ productsCount }}</span></li>
            <li><strong>Última sincronização:</strong> <span>{{ lastSync }}</span></li>
          </ul>
        </section>
        <section class="admin-nav">
          <h3>Ações Administrativas</h3>
          <button @click="goToBannerManager" class="admin-btn">Gerenciar Banners do Carrossel</button>
          <button @click="goToStoreManager" class="admin-btn">Gerenciar Lojas</button>
          <button @click="goToDeviceManager" class="admin-btn">Gerenciar Equipamentos</button>
          <button @click="goToAuditLog" class="admin-btn">Logs de Auditoria</button>
          <button @click="goToIALogView" class="admin-btn ia-central-btn">Central de IAs</button>
          <button @click="goToUserManager" class="admin-btn">Usuários Administradores</button>
          <button @click="goToAgentManager" class="admin-btn">Gerenciar Agentes Locais</button>
        </section>
        <section class="backup-restore">
          <h3>Backup/Restore do Banco de Dados</h3>
          <button @click="downloadBackup" class="admin-btn">Baixar Backup</button>
          <input type="file" ref="restoreFile" style="display:none" @change="restoreBackup" />
          <button @click="triggerRestore" class="admin-btn">Restaurar Backup</button>
          <span v-if="restoreMsg" :style="{color: restoreMsgColor}">{{ restoreMsg }}</span>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { removeToken } from '../auth.js'

const router = useRouter()
const productsCount = ref(0)
const lastSync = ref('---')
const restoreFile = ref(null)
const restoreMsg = ref('')
const restoreMsgColor = ref('green')

// Buscar status do sistema do backend
async function fetchStatus() {
  try {
    const response = await fetch('http://localhost:8000/admin/status')
    if (response.ok) {
      const data = await response.json()
      productsCount.value = data.total_products
      lastSync.value = data.last_sync ? data.last_sync : '---'
    }
  } catch (e) {
    // erro silencioso
  }
}

fetchStatus()
function goToBannerManager() {
  router.push('/banners')
}
function goToStoreManager() {
  router.push('/stores')
}
function goToDeviceManager() {
  router.push('/devices')
}
function goToAuditLog() {
  router.push('/audit')
}
function goToIALogView() {
  router.push('/ia-logs')
}
function goToUserManager() {
  router.push('/users')
}
function goToAgentManager() {
  router.push('/agents')
}
function logout() {
  removeToken()
  router.push('/')
}
async function downloadBackup() {
  restoreMsg.value = ''
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch('http://localhost:8000/admin/backup', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Falha ao baixar backup')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'products.db'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (e) {
    restoreMsg.value = 'Erro ao baixar backup.'
    restoreMsgColor.value = 'red'
  }
}
function triggerRestore() {
  restoreFile.value.value = ''
  restoreFile.value.click()
}
async function restoreBackup(event) {
  restoreMsg.value = ''
  const file = event.target.files[0]
  if (!file) return
  try {
    const token = localStorage.getItem('access_token')
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('http://localhost:8000/admin/restore', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
    const data = await response.json()
    if (response.ok && data.success) {
      restoreMsg.value = 'Banco restaurado com sucesso!'
      restoreMsgColor.value = 'green'
    } else {
      throw new Error(data.message || 'Erro ao restaurar')
    }
  } catch (e) {
    restoreMsg.value = 'Erro ao restaurar backup.'
    restoreMsgColor.value = 'red'
  }
}
</script>

<style scoped>
.dashboard-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #fff7ef 0%, #fff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dashboard-container {
  max-width: 950px;
  margin: 0 auto;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 6px 36px #ff66001a;
  padding: 38px 38px 38px 38px;
}
.logo {
  height: 64px;
  margin-bottom: 12px;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}
.logout {
  background: #fff7ef;
  border: 1.5px solid #ff6600;
  color: #ff6600;
  border-radius: 10px;
  padding: 8px 22px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.logout:hover {
  background: #ff66001a;
}
main {
  display: flex;
  gap: 38px;
}
.status {
  background: #fff7ef;
  border-radius: 14px;
  box-shadow: 0 2px 8px #ff66001a;
  padding: 32px 28px;
  flex: 1;
  min-width: 320px;
}
.status h3 {
  font-size: 1.25rem;
  color: #ff6600;
  margin-bottom: 18px;
}
.status ul {
  list-style: none;
  padding: 0;
  font-size: 1.1rem;
}
.status li {
  margin-bottom: 10px;
}
.admin-nav {
  background: #fff7ef;
  border-radius: 14px;
  box-shadow: 0 2px 8px #ff66001a;
  padding: 32px 28px;
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
.admin-nav h3 {
  font-size: 1.25rem;
  color: #ff6600;
  margin-bottom: 18px;
}
.admin-btn {
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-weight: 700;
  font-size: 1.15rem;
  cursor: pointer;
  transition: background 0.2s;
}
.admin-btn:hover {
  background: #e65c00;
}
.ia-central-btn {
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-weight: 700;
  font-size: 1.15rem;
  cursor: pointer;
  transition: background 0.2s;
}
.ia-central-btn:hover {
  background: #0056b3;
}
.backup-restore {
  background: #fff7ef;
  border-radius: 14px;
  box-shadow: 0 2px 8px #ff66001a;
  padding: 32px 28px;
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
.backup-restore h3 {
  font-size: 1.25rem;
  color: #ff6600;
  margin-bottom: 18px;
}
</style>
