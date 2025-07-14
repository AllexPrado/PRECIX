import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import BannerManager from './views/BannerManager.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/banners', component: BannerManager }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
