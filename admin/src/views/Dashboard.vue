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
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productsCount = ref(0)
const lastSync = ref('---')

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
function logout() {
  router.push('/')
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
</style>
