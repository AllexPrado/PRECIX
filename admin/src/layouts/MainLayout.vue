<template>
  <div class="main-layout">
    <aside class="sidebar">
      <div class="logo-area">
        <button class="logo-btn" @click="goHome" aria-label="Ir para o Dashboard">
          <img src="/logo-sonda.png" alt="Logo Sonda" class="logo" />
        </button>
      </div>
      <!-- Botão hamburger visível em tablets/celulares -->
      <button class="hamburger" @click="toggleMenu" aria-label="Abrir menu" :aria-expanded="isMobileMenuOpen ? 'true' : 'false'">
        <span></span><span></span><span></span>
      </button>
      <nav class="sidebar-nav">
        <button v-for="item in navItems" :key="item.label" @click="navigate(item.route)" :class="['sidebar-btn', {active: isActive(item.route)}]">
          <span class="icon-area">
            <i :class="item.icon"></i>
          </span>
          <span>{{ item.label }}</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <button class="logout-btn" @click="logout">Sair</button>
      </div>
      <!-- Drawer deslizante em mobile/tablet -->
      <div v-if="isMobileMenuOpen" class="drawer-backdrop" @click="closeMenu"></div>
      <nav v-if="isMobileMenuOpen" class="mobile-drawer">
        <div class="drawer-header">
          <button class="logo-btn" @click="goHome" aria-label="Ir para o Dashboard">
            <img src="/logo-sonda.png" alt="Logo Sonda" class="logo" />
          </button>
          <button class="close-x" @click="closeMenu" aria-label="Fechar menu">×</button>
        </div>
        <div class="drawer-scroll">
          <button v-for="item in navItems" :key="'m-'+item.label" @click="navigate(item.route)" :class="['drawer-btn', {active: isActive(item.route)}]">
            <span class="icon-area"><i :class="item.icon"></i></span>
            <span>{{ item.label }}</span>
          </button>
        </div>
        <div class="drawer-footer">
          <button class="logout-btn" @click="logout">Sair</button>
        </div>
      </nav>
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { removeToken } from '../auth.js'

const router = useRouter()
const route = useRoute()
const isMobileMenuOpen = ref(false)


const allNavItems = [
  { label: 'Dashboard', route: '/dashboard', icon: 'pi pi-home', perm: 'dashboard' },
  { label: 'Banners', route: '/banners', icon: 'pi pi-image', perm: 'banners' },
  { label: 'Lojas', route: '/stores', icon: 'pi pi-building', perm: 'lojas' },
  { label: 'Equipamentos', route: '/devices', icon: 'pi pi-desktop', perm: 'equipamentos' },
  { label: 'Auditoria', route: '/audit', icon: 'pi pi-list', perm: 'auditoria' },
  { label: 'Central de IAs', route: '/ia-logs', icon: 'pi pi-comments', perm: 'central_ia' },
  { label: 'Usuários', route: '/users', icon: 'pi pi-users', perm: 'usuarios' },
  { label: 'Agentes Locais', route: '/agents', icon: 'pi pi-server', perm: 'agentes' },
  { label: 'Integrações', route: '/integracoes', icon: 'pi pi-link', perm: 'integracoes' } // Novo item de menu para integrações
]

function getUserPermissoes() {
  try {
    const perms = JSON.parse(localStorage.getItem('permissoes') || '[]');
    return Array.isArray(perms) ? perms : [];
  } catch {
    return [];
  }
}
function getUserRole() {
  try {
    const token = localStorage.getItem('jwt_token');
    if (!token) return 'admin';
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join('')));
    return payload && payload.role ? payload.role : 'admin';
  } catch {
    return 'admin';
  }
}

const userPerms = getUserPermissoes();
const userRole = getUserRole();

const navItems = allNavItems.filter(item => {
  // Admin vê tudo
  if (userRole === 'admin') return true;
  // Operador/gestor só vê o que tem permissão
  return userPerms.includes(item.perm);
});

function navigate(path) {
  router.push(path)
  isMobileMenuOpen.value = false
}
function isActive(path) {
  return route.path.startsWith(path)
}
function logout() {
  removeToken()
  router.push('/')
}
function toggleMenu() { isMobileMenuOpen.value = !isMobileMenuOpen.value }
function closeMenu() { isMobileMenuOpen.value = false }
function goHome() {
  router.push('/dashboard')
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(120deg, #fff7ef 0%, #fff 100%);
  overflow-x: hidden;
}

.sidebar {
  width: 240px;
  background: #fff7ef;
  box-shadow: 2px 0 16px #ff66001a;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 0 18px 0;
  position: relative;
}

.logo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid #ffe0c2;
  margin-bottom: 12px;
}

.logo { height: 48px; }

.logo-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 18px;
}

.hamburger {
  display: none;
  background: #fff;
  border: 2px solid #ff6600;
  color: #ff6600;
  border-radius: 8px;
  padding: 6px 10px;
  margin: 8px 12px 0 12px;
  cursor: pointer;
  /* Ensure the three bars stack vertically */
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #ff6600;
  margin: 0;
  border-radius: 2px;
}

.sidebar-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  color: #ff6600;
  font-size: 1.08rem;
  font-weight: 600;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  padding: 10px 14px;
  transition: background 0.18s, color 0.18s;
}

.sidebar-btn .icon-area {
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-btn.active,
.sidebar-btn:hover {
  background: #ff6600;
  color: #fff;
}

.sidebar-footer {
  border-top: 1px solid #ffe0c2;
  padding: 18px 0 0 0;
  display: flex;
  justify-content: center;
}

.logout-btn {
  background: #fff;
  color: #ff6600;
  border: 2px solid #ff6600;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}

.main-content {
  flex: 1;
  padding: 24px 24px 38px 24px;
  min-width: 0;
  background: #fff;
  border-radius: 0 28px 28px 0;
  box-shadow: 0 8px 48px #ff66001a;
  margin: 18px 18px 18px 0;
}

@media (max-width: 900px) {
  .main-layout { flex-direction: column; }

  .sidebar {
    width: 100%;
    flex-direction: row;
    height: 56px;
    padding: 0;
    border-radius: 0;
    box-shadow: 0 2px 16px #ff66001a;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .logo-area { height: 56px; border-bottom: none; margin: 0 6px 0 8px; flex: 0 0 auto; }
  .logo { height: 36px; }

  /* hide inline nav; show hamburger */
  .sidebar-nav { display: none; }
  .hamburger { display: inline-flex; align-items: center; justify-content: center; }

  .sidebar-footer { display: flex; align-items: center; padding: 0 8px; border-top: none; }
  .logout-btn { padding: 6px 12px; font-size: 0.95rem; }

  .main-content {
    border-radius: 0 0 28px 28px;
    margin: 0;
    padding: 16px 10px;
  }

  /* Drawer */
  .drawer-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 60; animation: fadeIn 0.18s ease-out; }
  .mobile-drawer { position: fixed; top: 0; left: 0; bottom: 0; width: 78vw; max-width: 360px; background: #fff; box-shadow: 4px 0 20px rgba(0,0,0,0.15); z-index: 70; display: flex; flex-direction: column; animation: drawerIn 0.22s ease-out; }
  .drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid #ffe0c2; }
  .close-x { background: none; border: none; font-size: 28px; line-height: 1; cursor: pointer; color: #ff6600; }
  .drawer-scroll { flex: 1; overflow-y: auto; padding: 8px; }
  .drawer-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: none; border: none; color: #ff6600; font-size: 1.05rem; font-weight: 600; padding: 12px; border-radius: 8px; text-align: left; }
  .drawer-btn.active, .drawer-btn:hover { background: #fff3e0; }
  .drawer-footer { padding: 8px 12px; border-top: 1px solid #ffe0c2; }
}

@keyframes drawerIn {
  from { transform: translateX(-12px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
