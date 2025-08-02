<template>
  <div class="dashboard-bg">
    <div class="dashboard-container">
      <header class="dashboard-header">
        <img src="/logo-sonda.png" alt="Logo Sonda" class="logo" />
        <div class="header-actions">
          <button class="settings-btn" @click="showModal = true" title="Backup/Restore">
            <!-- Ícone de engrenagem tradicional -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.07-2.82l-1.06-.18a6.98 6.98 0 0 0-.38-1.01l.64-.84a.5.5 0 0 0-.06-.66l-1.06-1.06a.5.5 0 0 0-.66-.06l-.84.64a6.98 6.98 0 0 0-1.01-.38l-.18-1.06A.5.5 0 0 0 14.5 6h-1a.5.5 0 0 0-.5.42l-.18 1.06a6.98 6.98 0 0 0-1.01.38l-.84-.64a.5.5 0 0 0-.66.06l-1.06 1.06a.5.5 0 0 0-.06.66l.64.84a6.98 6.98 0 0 0-.38 1.01l-1.06.18A.5.5 0 0 0 6 9.5v1c0 .24.17.45.42.5l1.06.18c.09.34.22.67.38 1.01l-.64.84a.5.5 0 0 0 .06.66l1.06 1.06c.19.19.48.2.66.06l.84-.64c.34.16.67.29 1.01.38l.18 1.06c.05.25.26.42.5.42h1c.24 0 .45-.17.5-.42l.18-1.06c.34-.09.67-.22 1.01-.38l.84.64c.18.14.47.13.66-.06l1.06-1.06a.5.5 0 0 0 .06-.66l-.64-.84c.16-.34.29-.67.38-1.01l1.06-.18c.25-.05.42-.26.42-.5v-1a.5.5 0 0 0-.42-.5z" fill="#ff6600"/></svg>
          </button>
          <button class="logout" @click="logout">Sair</button>
        </div>
      </header>
      <nav class="dashboard-nav">
        <button @click="goToBannerManager" class="nav-btn">Banners</button>
        <button @click="goToStoreManager" class="nav-btn">Lojas</button>
        <button @click="goToDeviceManager" class="nav-btn">Equipamentos</button>
        <button @click="goToAuditLog" class="nav-btn">Auditoria</button>
        <button @click="goToIALogView" class="nav-btn">Central de IAs</button>
        <button @click="goToUserManager" class="nav-btn">Usuários</button>
        <button @click="goToAgentManager" class="nav-btn">Agentes Locais</button>
      </nav>
      <main class="dashboard-main">
        <section class="status">
          <h3>Status do Sistema</h3>
          <ul>
            <li><strong>Produtos sincronizados:</strong> <span>{{ productsCount }}</span></li>
            <li><strong>Última sincronização:</strong> <span>{{ lastSync }}</span></li>
          </ul>
        </section>
      </main>
      <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
        <div class="modal-panel">
          <h2>Backup/Restore do Banco de Dados</h2>
          <button @click="downloadBackup" class="admin-btn modal-btn">
            <span>Baixar Backup</span>
          </button>
          <input type="file" ref="restoreFile" style="display:none" @change="restoreBackup" />
          <button @click="triggerRestore" class="admin-btn modal-btn">
            <span>Restaurar Backup</span>
          </button>
          <span v-if="restoreMsg" :style="{color: restoreMsgColor}" class="modal-msg">{{ restoreMsg }}</span>
          <button class="close-modal" @click="showModal = false">Fechar</button>
        </div>
      </div>
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
const showModal = ref(false)

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
  router.push('/devices'
  )
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
  max-width: 1100px;
  margin: 0 auto;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 8px 48px #ff66001a;
  padding: 38px 38px 38px 38px;
  position: relative;
}
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.logo {
  height: 56px;
  margin-right: 18px;
}
.logout {
  background: #fff;
  border: 2px solid #ff6600;
  color: #ff6600;
  border-radius: 8px;
  padding: 7px 22px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
  box-shadow: 0 2px 8px #ff66001a;
}
.logout:hover {
  background: #ff66001a;
  border-color: #e65c00;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.settings-btn {
  background: #fff;
  border: 2px solid #ff6600;
  border-radius: 8px;
  padding: 4px 6px;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
  box-shadow: 0 2px 8px #ff66001a;
  display: flex;
  align-items: center;
  height: 40px;
  width: 40px;
  justify-content: center;
}
.settings-btn svg {
  display: block;
}
.settings-btn:hover {
  background: #ff66001a;
  border-color: #e65c00;
}
.dashboard-nav {
  display: flex;
  justify-content: center;
  gap: 22px;
  margin-bottom: 32px;
  background: linear-gradient(90deg, #fff7ef 60%, #fff 100%);
  border-radius: 16px;
  box-shadow: 0 2px 16px #ff66001a;
  padding: 18px 0;
}
.nav-btn {
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 32px;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px #ff66001a;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}
.nav-btn:hover {
  background: #e65c00;
  box-shadow: 0 4px 16px #ff66001a;
  transform: translateY(-2px) scale(1.04);
}
.dashboard-main {
  display: flex;
  gap: 38px;
  margin-top: 18px;
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
  color: #ff6600;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 18px;
}
.admin-btn {
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  font-weight: 700;
  font-size: 1.08rem;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  margin-bottom: 12px;
}
.admin-btn:hover {
  background: #e65c00;
}
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44,44,100,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.modal-panel {
  background: #fff7ef;
  border-radius: 18px;
  box-shadow: 0 8px 32px #ff66001a;
  padding: 38px 32px 28px 32px;
  min-width: 340px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: fadeIn 0.3s;
}
.modal-panel h2 {
  color: #ff6600;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 22px;
}
.modal-btn {
  width: 100%;
  margin-bottom: 16px;
}
.close-modal {
  background: #fff;
  border: 2px solid #ff6600;
  color: #ff6600;
  border-radius: 8px;
  padding: 7px 22px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s, border 0.2s;
}
.close-modal:hover {
  background: #ff66001a;
  border-color: #e65c00;
}
.modal-msg {
  display: block;
  margin-bottom: 10px;
  font-size: 1.05rem;
  text-align: center;
}
@media (max-width: 900px) {
  .dashboard-main {
    flex-direction: column;
    gap: 24px;
  }
  .status {
    min-width: unset;
    padding: 24px 12px;
  }
  .dashboard-nav {
    flex-direction: column;
    gap: 12px;
    padding: 12px 0;
  }
  .nav-btn {
    width: 100%;
    padding: 12px 0;
  }
}
</style>
