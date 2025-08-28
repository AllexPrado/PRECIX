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
            <th>Data/Hora</th>
            <th>Evento</th>
            <th>Dispositivo (ID)</th>
            <th>Informações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ev, idx) in events" :key="idx">
            <td class="col-when">
              <span>{{ fmt(ev.timestamp) }}</span>
              <small v-if="ev.timestamp" class="muted"> ({{ fromNow(ev.timestamp) }})</small>
            </td>
            <td class="col-type">
              <span :class="['pill', ev.type]" title="Tipo do evento">{{ label(ev.type) }}</span>
            </td>
            <td class="col-id" :title="ev.identifier">{{ ev.identifier }}</td>
            <td class="col-info">
              <template v-if="ev.type==='price_query'">
                <span>Barcode: <strong>{{ ev.barcode }}</strong></span>
                <span v-if="ev.ok" class="ok"> OK</span>
                <span v-else class="fail"> FALHA</span>
                <span v-if="ev.price"> | Preço: {{ ev.price }}</span>
                <span v-if="ev.error"> | Erro: {{ ev.error }}</span>
              </template>
              <template v-else-if="ev.type==='catalog_sync'">
                <span>Itens sincronizados: <strong>{{ ev.total_products }}</strong></span>
              </template>
              <template v-else>
                <span>{{ JSON.stringify(ev) }}</span>
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
import { api } from '../apiBase.js'

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
    const res = await fetch(api(`/admin/devices/events?${p.toString()}`))
  events.value = await res.json()
}

function start() { timer = setInterval(fetchEvents, 10000) }
function stop() { if (timer) clearInterval(timer) }
function fmt(ts) { const d = dayjs(ts); return d.isValid() ? d.format('DD/MM/YYYY HH:mm:ss') : String(ts) }
function fromNow(ts) { const d = dayjs(ts); return d.isValid() ? d.fromNow() : '' }
function label(t) {
  if (t === 'price_query') return 'Consulta de Preço'
  if (t === 'catalog_sync') return 'Sync de Catálogo'
  if (t === 'health') return 'Saúde'
  return t
}

onMounted(() => {
  identifier.value = qs('identifier') || ''
  fetchEvents(); start()
})

onUnmounted(() => stop())
</script>

<style scoped>
/* Paleta Sonda: laranja #ff6a00, tons claros #fff3e0, realces azuis #1565c0 */
.events-bg { min-height: 100vh; background: #fff7ec; display: flex; align-items: center; justify-content: center; padding: 16px; }
.events-card { background: #ffffff; border-radius: 14px; box-shadow: 0 6px 24px rgba(255,106,0,0.12); padding: 16px; width: 100%; max-width: 1100px; border: 1px solid #ffe0b2; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.filters { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.filters input, .filters select { border: 1px solid #ffd199; border-radius: 6px; padding: 6px 8px; background: #fff; color: #111827; }
.filters button { background: linear-gradient(#ff8a33,#ff6a00); border: none; color: #fff; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; }
.filters button:hover { filter: brightness(0.98); }
.events-table { width: 100%; border-collapse: separate; border-spacing: 0; }
.events-table thead th { position: sticky; top: 0; background: #fffaf4; color: #374151; border-bottom: 2px solid #ffd199; text-align: left; padding: 10px; }
.events-table tbody tr:nth-child(odd) td { background: #fffdf8; }
.events-table tbody tr:nth-child(even) td { background: #fffaf4; }
.events-table th, .events-table td { padding: 10px 12px; border-bottom: 1px solid #ffe0b2; color: #111827; }
.events-table td small.muted { color: #6b7280; font-weight: 500; }
.pill { display: inline-block; padding: 2px 10px; border-radius: 999px; font-weight: 700; letter-spacing: .2px; background: #eee; color: #333; border: 1px solid #ddd; white-space: nowrap; }
.pill.price_query { background: #e3f2fd; color: #0d47a1; border-color: #bbdefb; }
.pill.catalog_sync { background: #e8f5e9; color: #1b5e20; border-color: #c8e6c9; }
/* Tipos adicionais (health) para manter contraste alto */
.pill.health { background: #ede7f6; color: #4527a0; border-color: #d1c4e9; }
.ok { color: #1b5e20; font-weight: 700; margin-left: 8px; }
.fail { color: #b71c1c; font-weight: 700; margin-left: 8px; }
.hint { color: #6b7280; margin-top: 10px; font-size: 0.92em; }
.muted { color: #6b7280; font-weight: 500; }
/* Tabela: controle de largura e quebras elegantes */
.col-when { white-space: nowrap; }
.col-type { white-space: nowrap; width: 1%; }
.col-id { max-width: 380px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.col-info { word-break: break-word; }
/* Botão Voltar padrão painel */
header > button { background: #eef2ff; color: #1e3a8a; border: 1px solid #c7d2fe; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-weight: 600; }
header > button:hover { background: #e0e7ff; }
</style>
