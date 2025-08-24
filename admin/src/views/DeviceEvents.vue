<template>
  <div class="events-bg">
    <div class="events-card">
      <header>
        <h2>Eventos de Equipamentos</h2>
        <button @click="$router.back()">&larr; Voltar</button>
      </header>
      <div class="filters">
        <input v-model.trim="identifier" placeholder="ID do equipamento (identifier)" />
        <input v-model.number="storeId" placeholder="ID da loja (opcional)" type="number" />
        <select v-model.number="limit">
          <option :value="50">Últimos 50</option>
          <option :value="100">Últimos 100</option>
          <option :value="200">Últimos 200</option>
        </select>
        <button @click="fetchEvents">Atualizar</button>
      </div>
      <div v-if="events.length === 0" class="empty">Sem eventos.</div>
      <table v-else class="events-table">
        <thead>
          <tr>
            <th>Quando</th>
            <th>Tipo</th>
            <th>Identifier</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ev, idx) in events" :key="idx">
            <td>
              <span>{{ fmt(ev.timestamp) }}</span>
              <small v-if="ev.timestamp" class="muted"> ({{ fromNow(ev.timestamp) }})</small>
            </td>
            <td>
              <span :class="['pill', ev.type]">{{ label(ev.type) }}</span>
            </td>
            <td>{{ ev.identifier }}</td>
            <td>
              <template v-if="ev.type==='price_query'">
                <span>Barcode: <strong>{{ ev.barcode }}</strong></span>
                <span v-if="ev.ok" class="ok">OK</span>
                <span v-else class="fail">FALHA</span>
                <span v-if="ev.price"> | Preço: {{ ev.price }}</span>
                <span v-if="ev.error"> | Erro: {{ ev.error }}</span>
              </template>
              <template v-else-if="ev.type==='catalog_sync'">
                <span>Itens sincronizados: <strong>{{ ev.total_products }}</strong></span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="hint">Auto-refresh a cada 10s.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const identifier = ref('')
const storeId = ref(null)
const limit = ref(100)
const events = ref([])
let timer = null

function qs(name) {
  const params = new URLSearchParams(location.hash.split('?')[1] || '')
  return params.get(name)
}

async function fetchEvents() {
  const p = new URLSearchParams()
  p.set('limit', String(limit.value))
  if (identifier.value) p.set('identifier', identifier.value)
  if (storeId.value) p.set('store_id', String(storeId.value))
  const res = await fetch(`http://localhost:8000/admin/devices/events?${p.toString()}`)
  events.value = await res.json()
}

function start() { timer = setInterval(fetchEvents, 10000) }
function stop() { if (timer) clearInterval(timer) }
function fmt(ts) { const d = dayjs(ts); return d.isValid() ? d.format('DD/MM/YYYY HH:mm:ss') : String(ts) }
function fromNow(ts) { const d = dayjs(ts); return d.isValid() ? d.fromNow() : '' }
function label(t) { return t === 'price_query' ? 'Consulta de Preço' : (t === 'catalog_sync' ? 'Sync de Catálogo' : t) }

onMounted(() => {
  identifier.value = qs('identifier') || ''
  fetchEvents(); start()
})

onUnmounted(() => stop())
</script>

<style scoped>
.events-bg { min-height: 100vh; background: #fff3e0; display: flex; align-items: center; justify-content: center; padding: 14px; }
.events-card { background: #fff; border-radius: 14px; box-shadow: 0 6px 24px #ff66001a; padding: 16px; width: 100%; max-width: 1100px; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.filters { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.events-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.events-table th, .events-table td { padding: 8px 10px; border-bottom: 1px solid #ffe0b2; }
.pill { padding: 2px 8px; border-radius: 999px; font-weight: 600; background: #eee; color: #333; }
.pill.price_query { background: #e3f2fd; color: #1565c0; }
.pill.catalog_sync { background: #e8f5e9; color: #2e7d32; }
.ok { color: #2e7d32; font-weight: 700; margin-left: 8px; }
.fail { color: #c62828; font-weight: 700; margin-left: 8px; }
.hint { color: #888; margin-top: 8px; font-size: 0.9em; }
.muted { color: #6b7280; font-weight: 500; }
</style>
