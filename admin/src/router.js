import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import BannerManager from './views/BannerManager.vue'
import IALogView from './views/IALogView.vue'

import StoreManager from './views/StoreManager.vue'
import DeviceManager from './views/DeviceManager.vue'
import AuditLog from './views/AuditLog.vue'
import UserManager from './views/UserManager.vue'
import { getToken, isTokenExpired, removeToken } from './auth.js'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/banners', component: BannerManager },
  { path: '/ia-logs', component: IALogView },
  { path: '/stores', component: StoreManager },
  { path: '/devices', component: DeviceManager },
  { path: '/audit', component: AuditLog },
  { path: '/users', component: UserManager } // nova rota para gestão de usuários
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const publicPaths = ['/', '/login']

router.beforeEach((to, from, next) => {
  if (!publicPaths.includes(to.path)) {
    if (!getToken() || isTokenExpired()) {
      removeToken()
      next('/')
      return
    }
  }
  next()
})

export default router
