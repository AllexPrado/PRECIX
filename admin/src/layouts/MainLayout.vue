<template>
  <div class="main-layout">
    <aside class="sidebar">
      <div class="logo-area">
        <img src="/logo-sonda.png" alt="Logo Sonda" class="logo" />
      </div>
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
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { removeToken } from '../auth.js'

const router = useRouter()
const route = useRoute()


const allNavItems = [
  { label: 'Dashboard', route: '/dashboard', icon: 'pi pi-home', perm: 'dashboard' },
  { label: 'Banners', route: '/banners', icon: 'pi pi-image', perm: 'banners' },
  { label: 'Lojas', route: '/stores', icon: 'pi pi-building', perm: 'lojas' },
  { label: 'Equipamentos', route: '/devices', icon: 'pi pi-desktop', perm: 'equipamentos' },
  { label: 'Auditoria', route: '/audit', icon: 'pi pi-list', perm: 'auditoria' },
  { label: 'Central de IAs', route: '/ia-logs', icon: 'pi pi-comments', perm: 'central_ia' },
  { label: 'Usuários', route: '/users', icon: 'pi pi-users', perm: 'usuarios' },
  { label: 'Agentes Locais', route: '/agents', icon: 'pi pi-server', perm: 'agentes' },
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
}
function isActive(path) {
  return route.path.startsWith(path)
}
function logout() {
  removeToken()
  router.push('/')
}
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(120deg, #fff7ef 0%, #fff 100%);
}
.sidebar {
  width: 240px;
  background: #fff7ef;
  box-shadow: 2px 0 16px #ff66001a;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 0 18px 0;
}
.logo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid #ffe0c2;
  margin-bottom: 12px;
}
.logo {
  height: 48px;
}
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 18px;
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
  padding: 12px 24px;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.sidebar-btn.active, .sidebar-btn:hover {
  background: #ff6600;
  color: #fff;
}
.icon-area {
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 8px 24px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
}
.logout-btn:hover {
  background: #ff66001a;
  border-color: #e65c00;
}
.main-content {
  flex: 1;
  padding: 38px 38px 38px 38px;
  min-width: 0;
  background: #fff;
  border-radius: 0 28px 28px 0;
  box-shadow: 0 8px 48px #ff66001a;
  margin: 18px 18px 18px 0;
}
@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100vw;
    flex-direction: row;
    height: 64px;
    padding: 0;
    border-radius: 0;
    box-shadow: 0 2px 16px #ff66001a;
  }
  .sidebar-nav {
    flex-direction: row;
    gap: 0;
    margin: 0;
    flex: 1;
    justify-content: space-around;
  }
  .sidebar-btn {
    border-radius: 0;
    padding: 8px 10px;
    font-size: 1rem;
  }
  .main-content {
    border-radius: 0 0 28px 28px;
    margin: 0;
    padding: 18px 8px;
  }
}
</style>
