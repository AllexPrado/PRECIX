<!-- BACKUP DO ARQUIVO DeviceManager.vue EM 09/08/2025 -->

// O conteúdo original será colado aqui para backup completo.

  </template>
  <!-- Modal de edição -->
  <div v-if="showEditModal" class="modal-bg">
    <div class="modal-card">
      <h3>Editar Equipamento</h3>
      <form @submit.prevent="saveEditDevice">
        <label>Nome:<input v-model="editFields.name" required /></label>
        <label>Loja:
          <select v-model="editFields.store_id" required>
            <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
          </select>
        </label>
        <label>Identificador:<input v-model="editFields.identifier" required /></label>
        <label>Status:
          <select v-model="editFields.status" required>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </label>
        <div class="modal-actions">
          <button type="submit">Salvar</button>
          <button type="button" @click="closeEditModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

  <div class="device-manager-bg">
    <div class="device-manager-card">
      <header>
        <h2>Gerenciar Equipamentos</h2>
        <button @click="$router.back()">&larr; Voltar</button>
      </header>
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

      <template>
        <!-- Modal de edição -->
        <div v-if="showEditModal" class="modal-bg">
          <div class="modal-card">
            <h3>Editar Equipamento</h3>
            <form @submit.prevent="saveEditDevice">
              <label>Nome:<input v-model="editFields.name" required /></label>
              <label>Loja:
                <select v-model="editFields.store_id" required>
                  <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
                </select>
              </label>
              <label>Identificador:<input v-model="editFields.identifier" required /></label>
              <label>Status:
                <select v-model="editFields.status" required>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </label>
              <div class="modal-actions">
                <button type="submit">Salvar</button>
                <button type="button" @click="closeEditModal">Cancelar</button>
              </div>
            </form>
          </div>
        </div>

        <div class="device-manager-bg">
          <div class="device-manager-card">
            <header>
              <h2>Gerenciar Equipamentos</h2>
              <button @click="$router.back()">&larr; Voltar</button>
            </header>
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
              <ul>
                <li v-for="device in filteredDevices" :key="device.id" :class="{'offline-alert': !device.online && offlineMinutes(device) >= 2}">
                  <span>{{ device.name }}</span>
                  <span>Loja: {{ getStoreName(device.store_id) }}</span>
                  <span v-if="device.identifier" class="badge-id">ID: {{ device.identifier }}</span>
                  <span :style="{color: device.online ? 'green' : 'red', fontWeight: 'bold'}">
                    {{ device.online ? 'Online' : 'Offline' }}
                  </span>
                  <span v-if="device.last_sync">
                    Último sinal: {{ formatLastHeartbeat(device.last_sync) }} ({{ offlineMinutes(device) }} min)
                  </span>
                  <span v-else>
                    Nunca conectado
                  </span>
                  <span>{{ device.status === 'ativo' ? 'Ativo' : 'Inativo' }}</span>
                  <button v-if="userRole === 'admin'" @click="openEditModal(device)">Editar</button>
                  <button v-if="userRole === 'admin'" @click="deleteDevice(device.id)">Excluir</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
  let list = devices.value
  // Se operador, filtra por loja do usuário (store_id é string)
  if (userRole.value === 'operador' && userStoreId.value) {
    list = list.filter(device => String(device.store_id) === String(userStoreId.value))
  }
  return list.filter(device => {
    // Filtro por nome
    if (filterName.value && !device.name.toLowerCase().includes(filterName.value.toLowerCase())) {
      return false
    }
    // Filtro por loja
    if (filterStore.value && device.store_id !== filterStore.value) {
      return false
    }
    // Filtro por status
    if (filterStatus.value) {
      if (filterStatus.value === 'online' && !device.online) return false
      if (filterStatus.value === 'offline' && device.online) return false
      if (filterStatus.value === 'ativo' && device.status !== 'ativo') return false
      if (filterStatus.value === 'inativo' && device.status !== 'inativo') return false
    }
    // Filtro por identificador
    if (filterIdentifier.value && device.identifier && !device.identifier.toLowerCase().includes(filterIdentifier.value.toLowerCase())) {
      return false
    }
    return true
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
  const res = await fetch('http://localhost:8000/admin/devices')
  devices.value = await res.json()
}

async function fetchStores() {
  const res = await fetch('http://localhost:8000/admin/stores')
  stores.value = await res.json()
}

async function addDevice() {
  if (!newDevice.value.trim() || !selectedStore.value || !newDeviceIdentifier.value.trim()) return
  await fetch('http://localhost:8000/admin/devices', {
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
  await fetch(`http://localhost:8000/admin/devices/${id}`, { method: 'DELETE' })
  await fetchDevices()
}

function formatLastHeartbeat(ts) {
  return dayjs(ts).format('DD/MM/YYYY HH:mm:ss')
}

function offlineMinutes(device) {
  if (!device.last_sync) return 999;
  // Força o dayjs a interpretar como UTC mesmo sem o sufixo Z
  const now = dayjs.utc();
  const last = dayjs(device.last_sync).utc();
  return Math.round(now.diff(last, 'minute', true));
}

// Atualização automática dos status dos equipamentos (polling)
onMounted(() => {
  fetchDevices()
  fetchStores()
  setInterval(fetchDevices, 5000) // Atualiza a cada 5s
})
// ...existing code...

// ...existing code...
import { ref, onMounted, computed } from 'vue'
import { getUserRole } from '../auth.js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const devices = ref([])
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

// Computed para dispositivos filtrados
const filteredDevices = computed(() => {
  let list = devices.value
  // Se operador, filtra por loja do usuário (store_id é string)
  if (userRole.value === 'operador' && userStoreId.value) {
    list = list.filter(device => String(device.store_id) === String(userStoreId.value))
  }
  return list.filter(device => {
    // Filtro por nome
    if (filterName.value && !device.name.toLowerCase().includes(filterName.value.toLowerCase())) {
      return false
    }
    // Filtro por loja
    if (filterStore.value && device.store_id !== filterStore.value) {
      return false
    }
    // Filtro por status
    if (filterStatus.value) {
      if (filterStatus.value === 'online' && !device.online) return false
      if (filterStatus.value === 'offline' && device.online) return false
      if (filterStatus.value === 'ativo' && device.status !== 'ativo') return false
      if (filterStatus.value === 'inativo' && device.status !== 'inativo') return false
    }
    // Filtro por identificador
    if (filterIdentifier.value && device.identifier && !device.identifier.toLowerCase().includes(filterIdentifier.value.toLowerCase())) {
      return false
    }
    return true
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
  const res = await fetch('http://localhost:8000/admin/devices')
  devices.value = await res.json()
}

async function fetchStores() {
  const res = await fetch('http://localhost:8000/admin/stores')
  stores.value = await res.json()
}

async function addDevice() {
  if (!newDevice.value.trim() || !selectedStore.value || !newDeviceIdentifier.value.trim()) return
  await fetch('http://localhost:8000/admin/devices', {
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

async function updateDevice(device) {
  await fetch(`http://localhost:8000/admin/devices/${device.id}?name=${encodeURIComponent(device.name)}&status=${device.status}&online=${device.online}`, { method: 'PUT' })
  await fetchDevices()
}

async function deleteDevice(id) {
  await fetch(`http://localhost:8000/admin/devices/${id}`, { method: 'DELETE' })
  await fetchDevices()
}

function formatLastHeartbeat(ts) {
  return dayjs(ts).format('DD/MM/YYYY HH:mm:ss')
}

function offlineMinutes(device) {
  if (!device.last_sync) return 999;
  // Força o dayjs a interpretar como UTC mesmo sem o sufixo Z
  const now = dayjs.utc();
  const last = dayjs(device.last_sync).utc();
  return Math.round(now.diff(last, 'minute', true));
}

// Atualização automática dos status dos equipamentos (polling)
onMounted(() => {
  fetchDevices()
  fetchStores()
  setInterval(fetchDevices, 5000) // Atualiza a cada 5s
})
// ...existing code...

<style scoped>
.device-manager-bg {
  min-height: 100vh;
  background: #fff3e0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.device-manager-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #ff66001a;
  padding: 36px 28px;
  min-width: 340px;
  max-width: 900px;
  width: 100%;
}
header {
  display: flex;
  <!-- Fim do bloco de filtros, mantém o .filters aberto até aqui -->
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
form {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.filters {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 18px;
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
}
button {
  background: #FF6600;
  color: #fff;
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
li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px 8px;
}
.offline-info {
  font-size: 0.875em;
  color: #666;
  margin-top: 4px;
}
/* Alerta visual para offline prolongado */
.offline-alert {
  background: #ffeaea;
  border-left: 4px solid #ff0000;
  padding: 8px;
  border-radius: 8px;
}
.badge-id {
  background: #e6f7ff;
  color: #0077b6;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.85em;
  margin-left: 6px;
}
</style>
<style scoped>
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
}
.modal-card h3 {
  margin-top: 0;
}
.modal-card label {
  display: block;
  margin-bottom: 12px;
}
.modal-card input, .modal-card select {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 6px;
  border: 1.5px solid #FF6600;
}
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>

