import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import MainLayout from './layouts/MainLayout.vue'
import Dashboard from './views/Dashboard.vue'
import BannerManager from './views/BannerManager.vue'
import IALogView from './views/IALogView.vue'
import AgentManager from './views/AgentManager.vue'
import StoreManager from './views/StoreManager.vue'
import DeviceManager from './views/DeviceManager.vue'
import AuditLog from './views/AuditLog.vue'
import UserManager from './views/UserManager.vue'
import IntegrationConfig from './views/IntegrationConfig.vue' // Tela de configuração de integrações
import { getToken, isTokenExpired, removeToken } from './auth.js'

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

const routes = [
  { path: '/', component: Login },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/banners', component: BannerManager },
      { path: '/ia-logs', component: IALogView },
      { path: '/stores', component: StoreManager },
      { path: '/devices', component: DeviceManager },
      { path: '/audit', component: AuditLog },
      { path: '/users', component: UserManager },
  { path: '/agents', component: AgentManager },
  { path: '/integracoes', component: IntegrationConfig } // Nova rota para integrações
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const publicPaths = ['/', '/login']

// Mapeamento de rota para permissão
const routePermMap = {
  '/dashboard': 'dashboard',
  '/banners': 'banners',
  '/stores': 'lojas',
  '/devices': 'equipamentos',
  '/audit': 'auditoria',
  '/ia-logs': 'central_ia',
  '/users': 'usuarios',
  '/agents': 'agentes',
};

router.beforeEach((to, from, next) => {
  if (!publicPaths.includes(to.path)) {
    if (!getToken() || isTokenExpired()) {
      removeToken();
      next('/');
      return;
    }
    const userRole = getUserRole();
    if (userRole !== 'admin') {
      const permissoes = getUserPermissoes();
      const perm = routePermMap[to.path];
      if (perm && !permissoes.includes(perm)) {
        next('/dashboard');
        return;
      }
    }
  }
  next();
});

export default router
