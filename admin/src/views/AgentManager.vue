
<template>
  <div class="agent-manager-bg">
    <div class="agent-manager-card">
      <div class="title-row">
        <h2 class="title">Agentes Locais</h2>
        <div class="summary" v-if="summary">
          <span class="chip total">Total: {{ summary.total }}</span>
          <span class="chip online">Online: {{ summary.online }}</span>
          <span class="chip offline">Offline: {{ summary.offline }}</span>
        </div>
      </div>

      <div class="toolbar">
        <input class="search" v-model="query" placeholder="Buscar por ID, loja ou IP" />
        <button class="refresh" :disabled="loading" @click="refreshNow">Atualizar</button>
      </div>

      <div class="table-wrapper">
        <table class="agents-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Loja(s)</th>
              <th>Última atualização</th>
              <th>IP</th>
              <th style="width: 120px;">Ações</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="agent in filteredAgents" :key="agent.id">
              <tr>
                <td :data-label="'ID'">{{ agent.id }}</td>
                <td :data-label="'Status'">
                  <span :class="['status-badge', agent.status]">{{ agent.status }}</span>
                </td>
                <td :data-label="'Loja(s)'">
                  <template v-if="(agent.lojas||[]).length">
                    <span v-for="(s,idx) in agent.lojas" :key="idx" class="store-chip">{{ (s.loja_codigo||'') + (s.loja_nome? ' - ' + s.loja_nome : '') }}</span>
                  </template>
                  <template v-else>
                    {{ agent.loja_nome || agent.loja_codigo || '-' }}
                  </template>
                </td>
                <td :data-label="'Última atualização'">
                  <template v-if="agent.last_update">
                    {{ formatTS(agent.last_update) }} <span class="muted">({{ fromNow(agent.last_update) }})</span>
                  </template>
                  <template v-else>-</template>
                </td>
                <td :data-label="'IP'">{{ agent.ip || '-' }}</td>
                <td class="actions" :data-label="'Ações'">
                  <button class="btn" @click="openEdit(agent)">Editar</button>
                  <button class="btn danger" @click="confirmDelete(agent)">Excluir</button>
                  <button class="btn secondary" @click="toggle(agent)">{{ expanded[agent.id] ? 'Ocultar' : 'Dispositivos' }}</button>
                </td>
              </tr>
              <tr v-if="expanded[agent.id]">
                <td colspan="6">
                  <div class="devices-inline" v-if="(agent.devices||[]).length">
                    <div class="device-row" v-for="d in agent.devices" :key="d.identifier">
                      <span class="dev-name">{{ d.name || d.identifier }}</span>
                      <span class="dev-id">ID: {{ d.identifier }}</span>
                      <span class="dev-status" :class="{ online: (d.status||'').toLowerCase()==='online', offline: (d.status||'').toLowerCase()!=='online' }">{{ (d.status||'online') }}</span>
                      <span class="dev-store" v-if="d.store_code || d.store_name">Loja: {{ (d.store_code || '') + (d.store_name ? ' - ' + d.store_name : '') }}</span>
                      <span class="dev-cat" v-if="d.last_catalog_sync">Catálogo: {{ formatTS(d.last_catalog_sync) }} <span class="muted">({{ fromNow(d.last_catalog_sync) }})</span> ({{ d.catalog_count || 0 }})</span>
                      <button class="btn" @click="openDeviceEvents(d.identifier)">Eventos</button>
                      <button class="btn danger" @click="removeAgentDevice(agent.id, d.identifier)">Remover</button>
                    </div>
                  </div>
                  <div class="empty" v-else>Nenhum dispositivo legado reportado.</div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="hint">Atualiza automaticamente a cada {{ autoRefreshMs/1000 }}s.</div>

      <!-- Modal de edição simples -->
      <div v-if="editing" class="modal-backdrop" @click.self="closeEdit">
        <div class="modal">
          <h3>Editar Agente</h3>
          <div class="form-row"><label>ID</label><input type="text" :value="form.id" disabled></div>
          <div class="form-row"><label>Loja Código</label><input v-model.trim="form.loja_codigo" type="text"></div>
          <div class="form-row"><label>Loja Nome</label><input v-model.trim="form.loja_nome" type="text"></div>
          <div class="form-row"><label>Status</label>
            <select v-model="form.status">
              <option value="online">online</option>
              <option value="offline">offline</option>
            </select>
          </div>
          <div class="form-row"><label>IP</label><input v-model.trim="form.ip" type="text"></div>
          <div class="actions-row">
            <button class="btn" @click="saveEdit" :disabled="saving">Salvar</button>
            <button class="btn secondary" @click="closeEdit">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { api } from '../apiBase.js'
dayjs.extend(relativeTime)
dayjs.locale(ptBr)

const agents = ref([])
const loading = ref(true)
const error = ref(false)
const query = ref('')
const summary = ref(null)
const autoRefreshMs = 10000
let timer = null
const editing = ref(false)
const saving = ref(false)
const form = ref({ id: '', loja_codigo: '', loja_nome: '', status: 'online', ip: '' })
const expanded = ref({})

const norm = (v) => (v || '').toString().toLowerCase()

const filteredAgents = computed(() => {
  const q = norm(query.value)
  const arr = Array.isArray(agents.value) ? agents.value.slice() : []
  const filtered = q
    ? arr.filter(a => {
        const loja = a.loja_nome || a.loja_codigo || ''
        return norm(a.id).includes(q) || norm(loja).includes(q) || norm(a.ip).includes(q)
      })
    : arr
  // Sort: online first, then by last_update desc
  return filtered.sort((a, b) => {
    const sa = String(a.status || '').toLowerCase() === 'online' ? 0 : 1
    const sb = String(b.status || '').toLowerCase() === 'online' ? 0 : 1
    if (sa !== sb) return sa - sb
    const ta = a.last_update ? Date.parse(a.last_update) : 0
    const tb = b.last_update ? Date.parse(b.last_update) : 0
    return tb - ta
  })
})

async function fetchAgents() {
  try {
    loading.value = true
    error.value = false
    const [listRes, sumRes] = await Promise.all([
      axios.get(api('/admin/agents')),
      axios.get(api('/admin/agents/summary')).catch(() => ({ data: null }))
    ])
    agents.value = Array.isArray(listRes.data) ? listRes.data : []
    summary.value = sumRes?.data || null
  } catch (e) {
    error.value = true
    agents.value = []
    summary.value = null
  } finally {
    loading.value = false
  }
}

function startAutoRefresh() {
  stopAutoRefresh()
  timer = setInterval(fetchAgents, autoRefreshMs)
}
function stopAutoRefresh() {
  if (timer) { clearInterval(timer); timer = null }
}
function refreshNow() {
  fetchAgents()
}

function openEdit(agent) {
  form.value = {
    id: agent.id,
    loja_codigo: agent.loja_codigo || '',
    loja_nome: agent.loja_nome || '',
    status: String(agent.status || 'online').toLowerCase(),
    ip: agent.ip || ''
  }
  editing.value = true
}
function closeEdit() {
  editing.value = false
}
async function saveEdit() {
  try {
    saving.value = true
  await axios.put(api(`/admin/agents/${encodeURIComponent(form.value.id)}`), {
      loja_codigo: form.value.loja_codigo || null,
      loja_nome: form.value.loja_nome || null,
      status: form.value.status || null,
      ip: form.value.ip || null
    })
    editing.value = false
    await fetchAgents()
  } catch (e) {
    // noop: UI simples
  } finally {
    saving.value = false
  }
}
async function confirmDelete(agent) {
  const ok = window.confirm(`Excluir agente ${agent.id}?`)
  if (!ok) return
  try {
  await axios.delete(api(`/admin/agents/${encodeURIComponent(agent.id)}`))
    await fetchAgents()
  } catch (e) {
    // noop
  }
}

onMounted(() => { fetchAgents(); startAutoRefresh() })
onUnmounted(() => { stopAutoRefresh() })

function toggle(agent) {
  expanded.value = { ...expanded.value, [agent.id]: !expanded.value[agent.id] }
}
function openDeviceEvents(identifier) {
  if (!identifier) return
  window.open(`#${'/device-events'}?identifier=${encodeURIComponent(identifier)}`, '_blank')
}
async function removeAgentDevice(agentId, identifier) {
  if (!agentId || !identifier) return
  const ok = window.confirm(`Remover dispositivo ${identifier} do agente ${agentId}?`)
  if (!ok) return
  try {
  await axios.delete(api(`/admin/agents/${encodeURIComponent(agentId)}/devices/${encodeURIComponent(identifier)}`))
    await fetchAgents()
  } catch {}
}

function formatTS(ts) {
  return dayjs(ts).format('DD/MM/YYYY HH:mm:ss')
}
function fromNow(ts) {
  return dayjs(ts).fromNow()
}
</script>

<style scoped>
.agent-manager-bg {
  /* usa o container principal; sem cor de fundo interna */
  background: transparent;
}
.agent-manager-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #ff660014;
  padding: 20px 18px;
  min-width: 320px;
  max-width: 100%;
  width: 100%;
}
.title {
  color: #ff6600;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 18px;
  margin-top: 0;
}
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.summary .chip {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 600;
  margin-left: 8px;
  background: #eee;
  color: #333;
}
.summary .chip.online { background: #e0ffe0; color: #2e7d32; }
.summary .chip.offline { background: #ffe0e0; color: #c62828; }
.summary .chip.total { background: #e3f2fd; color: #1565c0; }
.toolbar {
  display: flex;
  gap: 10px;
  margin: 8px 0 14px 0;
}
.toolbar .search {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ffd180;
  border-radius: 8px;
}
.toolbar .refresh {
  background: #ff6600;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.toolbar .refresh:disabled {
  opacity: 0.7;
  cursor: default;
}
.table-wrapper {
  overflow-x: auto;
}
table.agents-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #ff66001a;
  margin-top: 0;
}
table.agents-table th, table.agents-table td {
  padding: 8px 12px;
  text-align: left;
}
table.agents-table th {
  background: #fff3e0;
  color: #ff6600;
  font-weight: 700;
  border-bottom: 2px solid #ff6600;
}
table.agents-table tr {
  border-bottom: 1px solid #ffe0b2;
}
table.agents-table tr:last-child {
  border-bottom: none;
}
.status-badge {
  display: inline-block;
  min-width: 60px;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  background: #ffe0b2;
  color: #ff6600;
  text-transform: lowercase;
}
.status-badge.online {
  background: #e0ffe0;
  color: #2e7d32;
}
.status-badge.offline {
  background: #ffe0e0;
  color: #c62828;
}
.empty {
  color: #ff6600;
  font-weight: bold;
  margin-top: 24px;
  text-align: center;
}
.hint { color: #999; margin-top: 10px; font-size: 0.85rem; }

.actions { display: flex; gap: 6px; }
.btn { border: 1px solid #ffd180; background: #fff8e1; color: #ff6600; padding: 6px 10px; border-radius: 6px; cursor: pointer; }
.btn.danger { border-color: #ffbdbd; background: #fff1f1; color: #c62828; }
.btn.secondary { background: #f1f1f1; color: #444; }

.modal-backdrop { position: fixed; inset: 0; background: #00000044; display: flex; align-items: center; justify-content: center; }
.modal { background: #fff; padding: 18px; border-radius: 10px; width: 420px; max-width: 90vw; box-shadow: 0 6px 24px #00000022; }
.modal h3 { margin-top: 0; color: #ff6600; }
.form-row { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
.form-row label { font-weight: 600; color: #444; }
.actions-row { display: flex; gap: 8px; justify-content: flex-end; margin-top: 10px; }

.devices-inline { background: #fffdf6; border: 1px dashed #ffd180; border-radius: 8px; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
.device-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.dev-name { font-weight: 700; color: #333 }
.dev-id { background: #e6f7ff; color: #0077b6; border-radius: 6px; padding: 2px 8px; font-size: 0.85em; }
.dev-status.online { color: #2e7d32; font-weight: 600; }
.dev-status.offline { color: #c62828; font-weight: 600; }
.dev-cat { color: #555; font-size: 0.9em; }
.store-chip { display:inline-block; margin-right:6px; margin-bottom:2px; padding:2px 6px; background:#eef6ff; color:#0d47a1; border-radius:6px; font-size:0.85em }
.dev-store { color:#00695c; background:#e0f2f1; padding:2px 6px; border-radius:6px; font-size:0.85em }
.muted { color:#888; font-size:0.86em }

@media (max-width: 900px) {
  .agents-table thead { display: none; }
  .agents-table tr { display: block; border-bottom: 1px solid #ffe0b2; margin-bottom: 8px; }
  .agents-table td { display: flex; justify-content: space-between; gap: 8px; }
  .agents-table td::before { content: attr(data-label); color: #ff6600; font-weight: 700; }
}
</style>
