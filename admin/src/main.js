import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './style.css'

// PrimeVue setup (professional UI components)
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { theme: { preset: Aura } })
app.mount('#app')
