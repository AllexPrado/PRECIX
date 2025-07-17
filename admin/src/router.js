import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import BannerManager from './views/BannerManager.vue'

import StoreManager from './views/StoreManager.vue'
import DeviceManager from './views/DeviceManager.vue'
import AuditLog from './views/AuditLog.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/banners', component: BannerManager },
  { path: '/stores', component: StoreManager },
  { path: '/devices', component: DeviceManager },
  { path: '/audit', component: AuditLog }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
