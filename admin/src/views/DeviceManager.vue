<template>
  <!-- Modal de edição -->
  <div v-if="showEditModal" class="modal-bg">
    <div class="modal-card">
      <h3>Editar Equipamento</h3>
      <form @submit.prevent="saveEditDevice">
        <label>Nome:
          <input v-model="editFields.name" required style="background:#fff;color:#212121;" />
        </label>
        <label>Loja:
          <select v-model="editFields.store_id" required style="background:#fff;color:#212121;">
            <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
          </select>
        </label>
        <label>Identificador:
          <input v-model="editFields.identifier" required style="background:#fff;color:#212121;" />
        </label>
        <label>Status:
          <select v-model="editFields.status" required style="background:#fff;color:#212121;">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </label>
        <div v-if="editFeedback" :class="{'feedback-success': editFeedback.includes('sucesso'), 'feedback-error': editFeedback.includes('Erro')}" style="margin-bottom:8px;">
          {{ editFeedback }}
        </div>
        <div class="modal-actions">
          <button type="submit">Salvar</button>
          <button type="button" @click="closeEditModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

  <div class="device-manager-bg">
    <div class="device-manager-card">
      <div class="page-header">
        <div class="header-content">
          <h2>Gerenciar Equipamentos</h2>
          <button class="back-btn" @click="$router.back()">← Voltar</button>
        </div>
      </div>
      <div class="summary-row" v-if="deviceSummary">
        <span class="chip total">Total: {{ deviceSummary.total }}</span>
        <span class="chip online">Online: {{ deviceSummary.online }}</span>
        <span class="chip offline">Offline: {{ deviceSummary.offline }}</span>
      </div>
      <form @submit.prevent="addDevice">
        <select v-model="selectedStore" required>
          <option disabled value="">Selecione a loja</option>
          <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
        </select>
        <input v-model="newDevice" placeholder="Nome do equipamento" required />
        <input v-model="newDeviceIdentifier" placeholder="Identificador único (ex: código, serial, QR)" required />
        <button type="submit">Adicionar Equipamento</button>
      </form>
      <!-- Filtros de pesquisa -->
      <div class="filters">
        <h3>Filtrar Equipamentos</h3>
        <div class="filter-row">
          <input v-model="filterName" placeholder="🔍 Buscar por nome" />
          <select v-model="filterStore">
            <option value="">Todas as lojas</option>
            <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
          </select>
          <select v-model="filterStatus">
            <option value="">Todos os status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <input v-model="filterIdentifier" placeholder="🔍 Buscar por ID" />
          <button @click="clearFilters" type="button" class="clear-btn">Limpar</button>
        </div>
        <div v-if="filteredDevices.length === 0 && devices.length > 0" class="empty">Nenhum equipamento encontrado com os filtros aplicados.</div>
        <div v-else-if="devices.length === 0" class="empty">Nenhum equipamento cadastrado.</div>
        <ul class="device-list">
          <li v-for="device in filteredDevices" :key="device.id" :class="{'offline-alert': !device.online && offlineSeconds(device) >= 30, 'device-item': true}">
            <div class="device-col name">
              <span class="device-title">{{ device.name }}</span>
              <span v-if="device.identifier" class="badge-id">ID: {{ device.identifier }}</span>
            </div>
            <div class="device-col loja">
              <span class="device-label">Loja:</span> <span>{{ getStoreName(device.store_id) }}</span>
            </div>
            <div class="device-col status">
              <div class="kv-row">
                <span class="device-label">Status:</span>
                <span :class="{'status-online': device.online, 'status-offline': !device.online}">
                  {{ device.online ? 'Online' : 'Offline' }}
                </span>
              </div>
              <div class="kv-row">
                <span class="device-label">Perfil:</span>
                <span class="status-profile">{{ device.status === 'ativo' ? 'Ativo' : 'Inativo' }}</span>
              </div>
            </div>
            <div class="device-col lastsync">
              <div class="sync-info">
                <div class="sync-row">
                  <span class="sync-label">Último sinal:</span>
                  <span v-if="device.last_sync" class="sync-value">{{ formatLastHeartbeatClean(device.last_sync) }}</span>
                  <span v-else class="sync-no-data">Nunca conectado</span>
                </div>
                <div class="sync-row">
                  <span class="sync-label">Catálogo:</span>
                  <span v-if="device.last_catalog_sync" class="sync-value">{{ formatLastHeartbeatClean(device.last_catalog_sync) }}</span>
                  <span v-if="device.last_catalog_sync" class="catalog-count">({{ device.catalog_count || 0 }} itens)</span>
                  <span v-else class="sync-no-data">Sem sync</span>
                </div>
              </div>
            </div>
            <div class="device-col actions">
              <button v-if="userRole === 'admin'" @click="openEditModal(device)">Editar</button>
              <button v-if="userRole === 'admin'" @click="deleteDevice(device.id)">Excluir</button>
              <button @click="openEvents(device.identifier)">Eventos</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'
import { getUserRole } from '../auth.js'
import { api } from '../apiBase.js'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const devices = ref([])
const deviceSummary = computed(() => {
  const total = devices.value.length
  const online = devices.value.filter(d => d.online).length
  const offline = total - online
  return { total, online, offline }
})
const stores = ref([])
const newDevice = ref('')
const newDeviceIdentifier = ref('')
const selectedStore = ref('')
const userRole = ref(getUserRole())
const userStoreId = ref(localStorage.getItem('store_id'))

// Filtros
const filterName = ref('')
const filterStore = ref('')
const filterStatus = ref('')
const filterIdentifier = ref('')

// Modal de edição
const showEditModal = ref(false)
const editDevice = ref(null)
const editFields = ref({ name: '', store_id: '', identifier: '', status: '' })
const editFeedback = ref("");

function openEditModal(device) {
  editDevice.value = device
  editFields.value = {
    name: device.name,
    store_id: device.store_id,
    identifier: device.identifier,
    status: device.status
  }
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  editDevice.value = null
}

async function saveEditDevice() {
  if (!editDevice.value) return;
  editFeedback.value = "";
  try {
    const params = new URLSearchParams({
      name: editFields.value.name,
      status: editFields.value.status,
      store_id: editFields.value.store_id,
      identifier: editFields.value.identifier
    });
    if (editDevice.value.last_sync) params.append('last_sync', editDevice.value.last_sync);
    if (typeof editDevice.value.online !== 'undefined') params.append('online', String(editDevice.value.online));
    const resp = await fetch(api(`/admin/devices/${editDevice.value.id}?${params.toString()}`), {
      method: 'PUT'
    });
    if (!resp.ok) {
      const err = await resp.text();
      editFeedback.value = `Erro ao salvar: ${err}`;
      return;
    }
    await fetchDevices();
    editFeedback.value = "Alterações salvas com sucesso!";
    setTimeout(() => {
      closeEditModal();
      editFeedback.value = "";
    }, 1200);
  } catch (e) {
    editFeedback.value = "Erro ao salvar alterações.";
  }
}

const filteredDevices = computed(() => {
  let list = devices.value
  if (userRole.value === 'operador' && userStoreId.value) {
    list = list.filter(device => String(device.store_id) === String(userStoreId.value))
  }
  // Filtros
  list = list.filter(device => {
    if (filterName.value && device.name && !device.name.toLowerCase().includes(filterName.value.toLowerCase())) {
      return false
    }
    if (filterStore.value && device.store_id !== filterStore.value) {
      return false
    }
    if (filterStatus.value && ['online','offline','ativo','inativo'].includes(filterStatus.value)) {
      if (filterStatus.value === 'online' && !device.online) return false
      if (filterStatus.value === 'offline' && device.online) return false
      if (filterStatus.value === 'ativo' && device.status !== 'ativo') return false
      if (filterStatus.value === 'inativo' && device.status !== 'inativo') return false
    }
    if (filterIdentifier.value && device.identifier && !device.identifier.toLowerCase().includes(filterIdentifier.value.toLowerCase())) {
      return false
    }
    return true
  })
  // Ordena: online primeiro, depois offline, ambos por nome
  return list.slice().sort((a, b) => {
    if (a.online !== b.online) return b.online - a.online
    return (a.name || '').localeCompare(b.name || '')
  })
})

function clearFilters() {
  filterName.value = ''
  filterStore.value = ''
  filterStatus.value = ''
  filterIdentifier.value = ''
}

function getStoreName(id) {
  const store = stores.value.find(s => s.id === id)
  return store ? store.name : '---'
}

async function fetchDevices() {
  try {
    const res = await fetch(api('/admin/devices'))
    if (!res.ok) { devices.value = []; console.error('Erro ao buscar equipamentos:', res.status); return }
    const data = await res.json().catch(() => ([]))
    console.log('Equipamentos recebidos:', data)
    devices.value = Array.isArray(data) ? data : []
  } catch (err) {
    devices.value = []
    console.error('Erro na requisição de equipamentos:', err)
  }
}

async function fetchStores() {
  try {
    const res = await fetch(api('/admin/stores'))
    if (!res.ok) { stores.value = []; return }
    const data = await res.json().catch(() => ([]))
    stores.value = Array.isArray(data) ? data : (data.stores || [])
  } catch { stores.value = [] }
}

async function addDevice() {
  if (!newDevice.value.trim() || !selectedStore.value || !newDeviceIdentifier.value.trim()) return
  await fetch(api('/admin/devices'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      store_id: selectedStore.value,
      name: newDevice.value,
      identifier: newDeviceIdentifier.value
    })
  })
  newDevice.value = ''
  newDeviceIdentifier.value = ''
  selectedStore.value = ''
  await fetchDevices()
}

async function deleteDevice(id) {
  await fetch(api(`/admin/devices/${id}`), { method: 'DELETE' })
  await fetchDevices()
}

function formatLastHeartbeatClean(ts) {
  // Formato limpo para exibição: DD/MM HH:mm
  if (!ts) return '---'
  const d = dayjs.utc(ts).tz('America/Sao_Paulo')
  return d.isValid() ? d.format('DD/MM HH:mm') : '---'
}
function formatLastHeartbeat(ts) {
  // Sempre interpreta como UTC e converte para GMT-3 na exibição
  if (!ts) return '---'
  const d = dayjs.utc(ts).tz('America/Sao_Paulo')
  return d.isValid() ? d.format('ddd, DD/MM/YYYY HH:mm:ss') : String(ts)
}
function fromNow(ts) {
  if (!ts) return ''
  const d = dayjs.utc(ts).tz('America/Sao_Paulo')
  return d.isValid() ? d.fromNow() : ''
}

function openEvents(identifier) {
  if (!identifier) return
  window.open(`#${'/device-events'}?identifier=${encodeURIComponent(identifier)}`, '_blank')
}


function offlineSeconds(device) {
  if (!device.last_sync) return 9999;
  const now = dayjs.utc().tz('America/Sao_Paulo');
  const last = dayjs.utc(device.last_sync).tz('America/Sao_Paulo');
  return Math.round(now.diff(last, 'second', true));
}

onMounted(() => {
  fetchDevices()
  fetchStores()
  clearFilters()
  setInterval(fetchDevices, 5000)
})
</script>

<style scoped>
.summary-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.chip {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 1em;
  font-weight: 600;
  background: #e6f7ff;
  color: #0d47a1;
}
.chip.online {
  background: #e6ffe6;
  color: #2e7d32;
}
.chip.offline {
  background: #ffeaea;
  color: #c62828;
}
.chip.total {
  background: #e6f0ff;
  color: #1976d2;
}
.device-manager-bg {
  min-height: 100vh;
  background: #fff3e0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.device-manager-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #ff660014;
  padding: 20px 18px;
  min-width: 320px;
  max-width: 100%;
  width: 100%;
}
.page-header {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 18px;
  border-bottom: 1px solid #f0f0f0;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
}
.header-content h2 {
  margin: 0;
  color: #333;
  font-size: 1.5em;
  font-weight: 600;
}
.back-btn {
  background: #FF6600;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9em;
  transition: background-color 0.2s;
}
.back-btn:hover {
  background: #e65c00;
}
form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.filters {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 32px;
  border: 1px solid #e0e0e0;
}
.filters h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.1em;
}
.filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.filter-row input, .filter-row select {
  flex: 1;
  min-width: 140px;
}
.clear-btn {
  background: #6c757d;
  flex-shrink: 0;
}
.clear-btn:hover {
  background: #5a6268;
}
input, select {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #FF6600;
  background: #ffffff;
  color: #111827; /* contraste mais alto */
}
button {
  background: #FF6600;
  color: #ffffff; /* garantir contraste */
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}
.empty {
  color: #888;
  margin-bottom: 12px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.device-list {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
}
.device-item {
  display: grid;
  grid-template-columns: 2.2fr 1.6fr 1.3fr 2.4fr 1fr;
  align-items: start;
  gap: 14px;
  margin-bottom: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px 10px;
  box-shadow: 0 2px 8px #ff66001a;
  color: #111827;
}
.device-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
/* Novo layout compacto para sync */
.sync-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sync-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.sync-label {
  color: #6b7280;
  font-size: 0.85em;
  font-weight: 500;
  min-width: 70px;
}
.sync-value {
  font-weight: 600;
  font-size: 0.9em;
  color: #1f2937;
}
.sync-no-data {
  color: #9ca3af;
  font-size: 0.85em;
  font-style: italic;
}
.catalog-count {
  color: #6b7280;
  font-size: 0.8em;
  margin-left: 4px;
}
/* Manter layouts antigos para outras seções */
.info-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 4px;
}
.info-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.main-time {
  font-weight: 600;
  font-size: 0.95em;
  color: #1f2937;
}
.relative-time {
  color: #6b7280;
  font-size: 0.82em;
  font-style: italic;
}
.catalog-info {
  color: #374151;
  font-size: 0.85em;
  font-weight: 500;
}
.no-data {
  color: #9ca3af;
  font-size: 0.9em;
  font-style: italic;
}
/* Linhas chave:valor para melhorar leitura */
.kv-row { display: flex; gap: 6px; align-items: baseline; flex-wrap: wrap; }
/* Garantir contraste em todo texto dentro das colunas */
.device-col span,
.device-col a { color: #111827; }
.device-title {
  font-weight: 700;
  font-size: 1.1em;
  color: #1f2937; /* texto principal escuro */
}
.device-label {
  color: #6b7280; /* legível em fundos claros */
  font-size: 0.92em;
  margin-right: 2px;
}
.muted { color:#6b7280; font-size:0.86em }
.status-online { color: #2e7d32 !important; font-weight: bold; }
.status-offline { color: #c62828 !important; font-weight: bold; }
.status-profile { color: #374151; }
.offline-alert {
  background: #ffeaea;
  border-left: 4px solid #ff0000;
  padding: 8px;
  border-radius: 8px;
}
.badge-id {
  background: #e6f7ff;
  color: #0d47a1;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.85em;
  margin-left: 6px;
}
@media (max-width: 1080px) {
  .device-item { 
    grid-template-columns: 2fr 1.4fr 1.2fr 2.2fr 1fr; 
    gap: 10px;
  }
  .header-content {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  .header-content h2 {
    font-size: 1.3em;
  }
  .filter-row input, .filter-row select {
    min-width: 120px;
  }
}
@media (max-width: 900px) {
  .device-manager-card {
    padding: 16px 14px;
  }
  .device-item { 
    grid-template-columns: 1.8fr 1fr; 
    gap: 12px;
    padding: 14px 10px;
  }
  .device-col.actions { 
    grid-column: 1 / -1; 
    display: flex; 
    gap: 6px; 
    flex-wrap: wrap; 
    margin-top: 8px;
  }
  .device-col.lastsync { 
    grid-column: 1 / -1; 
    margin-top: 6px;
  }
  .sync-row {
    flex-wrap: nowrap;
    align-items: flex-start;
  }
  .sync-label {
    min-width: 60px;
    font-size: 0.8em;
  }
}
@media (max-width: 768px) {
  .filter-row {
    gap: 6px;
  }
  .filter-row input, .filter-row select {
    min-width: 100px;
    flex: 1;
  }
  .clear-btn {
    width: 100%;
    margin-top: 8px;
  }
  form {
    gap: 6px;
  }
  form input, form select {
    font-size: 14px;
  }
}
@media (max-width: 600px) {
  .device-manager-card {
    padding: 12px 10px;
    margin: 10px;
  }
  .device-item { 
    grid-template-columns: 1fr; 
    padding: 12px 8px;
    gap: 8px;
  }
  .page-header {
    padding: 10px;
    margin-bottom: 12px;
  }
  .header-content h2 {
    font-size: 1.1em;
  }
  .back-btn {
    padding: 5px 10px;
    font-size: 0.85em;
  }
  .device-col {
    gap: 4px;
  }
  .sync-info {
    gap: 3px;
  }
  .device-col.actions {
    margin-top: 6px;
  }
  .device-col.actions button {
    font-size: 0.85em;
    padding: 6px 10px;
  }
}
@media (max-width: 480px) {
  .device-manager-bg {
    padding: 5px;
  }
  .device-manager-card {
    padding: 10px 8px;
    border-radius: 10px;
  }
  .summary-row {
    gap: 8px;
    flex-direction: column;
    align-items: stretch;
  }
  .chip {
    text-align: center;
    padding: 6px 8px;
  }
  .filter-row {
    flex-direction: column;
    gap: 8px;
  }
  .filter-row input, .filter-row select {
    width: 100%;
    min-width: unset;
  }
  .device-item {
    padding: 10px 6px;
  }
  .device-title {
    font-size: 1em;
  }
  .badge-id {
    margin-left: 0;
    margin-top: 2px;
  }
}
.modal-bg {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  padding: 32px 24px;
  min-width: 320px;
  max-width: 90vw;
  /* Garantir contraste de texto no modal */
  color: #212121;
}
.modal-card h3 {
  margin-top: 0;
  color: #212121;
}
.modal-card label {
  display: block;
  margin-bottom: 12px;
  color: #212121;
  font-weight: 600;
}
.modal-card input, .modal-card select {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 6px;
  border: 1.5px solid #FF6600;
  background: #ffffff;
  color: #212121;
}
.modal-card select option { color: #212121; }
.modal-card input::placeholder { color: #6b7280; }
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.edit-feedback {
  margin-top: 12px;
  padding: 8px;
  border-radius: 6px;
  font-weight: bold;
  text-align: center;
}
.edit-feedback.success {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}
.edit-feedback.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}
</style>