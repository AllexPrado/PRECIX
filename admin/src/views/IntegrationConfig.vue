<template>
  <div class="integration-config-bg">
    <div class="integration-config-card">
      <div class="header-section">
        <div class="header-content">
          <h2 class="title">Configuração de Integrações</h2>
          <p class="subtitle">Gerencie como o sistema importa e atualiza preços por loja.</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" @click="openAddModal">
            <i class="pi pi-plus"></i>
            Adicionar Integração
          </button>
          <button class="btn btn-secondary" :disabled="importLoading" @click="importNow">
            <i class="pi pi-download"></i>
            {{ importLoading ? 'Importando...' : 'Importar agora' }}
          </button>
        </div>
      </div>

      <div v-if="feedback" class="feedback-message">
        <div :class="['message', feedback.success ? 'message-success' : 'message-error']">
          {{ feedback.message }}
        </div>
      </div>

      <div class="table-wrapper">
        <table class="integrations-table">
          <thead>
            <tr>
              <th>Loja</th>
              <th>Tipo</th>
              <th>Parâmetro 1</th>
              <th>Parâmetro 2</th>
              <th>Ativo</th>
              <th style="width: 160px;">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="config in paginatedConfigs" :key="config.id">
              <td :data-label="'Loja'">{{ getStoreName(config.loja_id) || 'Global' }}</td>
              <td :data-label="'Tipo'">{{ tipoLabel(config.tipo) }}</td>
              <td :data-label="'Parâmetro 1'" class="param-cell">{{ config.parametro1 }}</td>
              <td :data-label="'Parâmetro 2'" class="param-cell">{{ config.parametro2 || '-' }}</td>
              <td :data-label="'Ativo'">
                <span :class="['status-badge', config.ativo ? 'active' : 'inactive']">
                  {{ config.ativo ? 'Sim' : 'Não' }}
                </span>
              </td>
              <td class="actions" :data-label="'Ações'">
                <button class="btn btn-edit" @click="editConfig(config)">Editar</button>
                <button class="btn btn-delete" @click="deleteConfig(config)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage = 1">←←</button>
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">←</button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">→</button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage = totalPages">→→</button>
      </div>

      <div class="logs-panel">
        <div class="logs-header">
          <h3 class="logs-title">Logs recentes de importação</h3>
          <button class="btn btn-refresh" @click="fetchLogs">
            <i class="pi pi-refresh"></i>
            Atualizar
          </button>
        </div>
        <div class="logs-content">
          <template v-if="logs && logs.length">
            <pre class="logs-pre">{{ logs.join('\n').trim() }}</pre>
          </template>
          <template v-else>
            <div class="logs-empty">Sem eventos recentes.</div>
          </template>
        </div>
      </div>

      <!-- Modal Adicionar/Editar -->
      <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">{{ editMode ? 'Editar Integração' : 'Adicionar Integração' }}</h3>
            <div class="modal-tags">
              <span v-if="form.tipo" class="tag tag-type">{{ tipoLabel(form.tipo) }}</span>
              <span class="tag tag-store">{{ getStoreName(form.loja_id) || 'Global' }}</span>
            </div>
          </div>

          <form @submit.prevent="saveConfig" class="modal-form">
            <div class="form-row">
              <label>Loja</label>
              <select v-model="form.loja_id" class="form-select" :disabled="savingConfig">
                <option value="">Global</option>
                <option v-for="store in stores" :key="store.id" :value="store.id">
                  {{ store.codigo }} - {{ store.nome }}
                </option>
              </select>
              <small class="form-hint">Deixe em branco para integração Global (todas as lojas).</small>
            </div>

            <div class="form-row">
              <label>Tipo</label>
              <select v-model="form.tipo" class="form-select" :disabled="savingConfig" required>
                <option value="">Selecione o tipo</option>
                <option value="api">API</option>
                <option value="arquivo">Arquivo</option>
                <option value="banco">Banco de Dados</option>
              </select>
            </div>

            <div v-if="form.tipo === 'arquivo'" class="form-row">
              <label>Caminho do arquivo</label>
              <div class="form-group">
                <input v-model="form.parametro1" type="text" class="form-input" 
                       placeholder="Selecione ou digite o caminho do arquivo" 
                       :disabled="savingConfig" required />
                <input type="file" style="display:none;" ref="fileInput" @change="onFileSelect" />
                <button type="button" class="btn btn-secondary" :disabled="savingConfig" @click="triggerFileInput">
                  <i class="pi pi-folder-open"></i>
                  Pasta
                </button>
              </div>
              <small class="form-hint">Exemplo: <code>pricetab.txt</code> ou <code>/caminho/arquivo.csv</code></small>
            </div>

            <div v-else-if="form.tipo === 'api'" class="form-row">
              <label>Endpoint da API</label>
              <div class="form-group">
                <input v-model="form.parametro1" type="text" class="form-input" 
                       placeholder="Ex: http://host:porta/product/all" 
                       :disabled="savingConfig" required />
                <button type="button" class="btn btn-test" :disabled="savingConfig || !form.parametro1" @click="testApi">
                  <i class="pi pi-play"></i>
                  Testar
                </button>
              </div>
              <small class="form-hint">Suporte a Bearer token em Parâmetro 2. Resposta JSON deve conter lista de produtos com campos <code>barcode/codigo</code>, <code>name/descricao</code>, <code>price/preco</code>.</small>
            </div>

            <div v-else-if="form.tipo" class="form-row">
              <label>Parâmetro 1</label>
              <input v-model="form.parametro1" type="text" class="form-input" 
                     placeholder="Ex: endpoint, string de conexão" 
                     :disabled="savingConfig" required />
            </div>

            <div class="form-row">
              <label>Parâmetro 2</label>
              <input v-model="form.parametro2" type="text" class="form-input" 
                     placeholder="Ex: token, diretório, etc" 
                     :disabled="savingConfig" />
            </div>

            <div class="form-row form-checkbox">
              <label class="checkbox-label">
                <input v-model="form.ativo" type="checkbox" :disabled="savingConfig" />
                Ativo
              </label>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn btn-cancel" :disabled="savingConfig" @click="closeModal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-save" :disabled="savingConfig">
                <i v-if="savingConfig" class="pi pi-spin pi-spinner"></i>
                <i v-else class="pi pi-check"></i>
                {{ savingConfig ? 'Salvando…' : 'Salvar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { api } from '../apiBase.js'

// Estado reativo
const configs = ref([])
const stores = ref([])
const logs = ref([])
const showModal = ref(false)
const editMode = ref(false)
const savingConfig = ref(false)
const importLoading = ref(false)
const feedback = ref(null)
const fileInput = ref(null)

// Paginação
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Formulário
const form = ref({
  id: null,
  loja_id: '',
  tipo: '',
  parametro1: '',
  parametro2: '',
  ativo: true
})

// Computed
const totalPages = computed(() => Math.ceil(configs.value.length / itemsPerPage.value))
const paginatedConfigs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return configs.value.slice(start, end)
})

// Funções principais
function openAddModal() {
  editMode.value = false
  form.value = {
    id: null,
    loja_id: '',
    tipo: '',
    parametro1: '',
    parametro2: '',
    ativo: true
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  feedback.value = null
}

function editConfig(config) {
  editMode.value = true
  form.value = {
    id: config.id,
    loja_id: config.loja_id || '',
    tipo: config.tipo || '',
    parametro1: config.parametro1 || '',
    parametro2: config.parametro2 || '',
    ativo: Boolean(config.ativo)
  }
  showModal.value = true
}

function tipoLabel(tipo) {
  const tipoOptions = [
    { label: 'Arquivo', value: 'arquivo' },
    { label: 'API', value: 'api' },
    { label: 'Banco de Dados', value: 'banco' }
  ]
  const option = tipoOptions.find(o => o.value === tipo)
  return option ? option.label : tipo
}

function getStoreName(id) {
  if (!id) return 'Global'
  const store = stores.value.find(s => s.id === id)
  return store ? `${store.codigo} - ${store.nome}` : 'Global'
}

async function fetchConfigs() {
  try {
    const resp = await axios.get(api('/admin/integracoes'))
    configs.value = resp.data || []
  } catch {
    configs.value = []
  }
}

async function fetchStores() {
  try {
    const resp = await axios.get(api('/admin/stores'))
    stores.value = resp.data || []
  } catch {
    stores.value = []
  }
}

async function fetchLogs() {
  try {
    const resp = await axios.get(api('/admin/importar-precos/logs'))
    logs.value = resp.data || []
  } catch {
    logs.value = []
  }
}

async function importNow() {
  importLoading.value = true
  try {
    await axios.post(api('/admin/importar-precos'))
    feedback.value = { success: true, message: 'Importação iniciada com sucesso!' }
    await fetchLogs()
  } catch {
    feedback.value = { success: false, message: 'Erro ao iniciar importação.' }
  } finally {
    importLoading.value = false
  }
}

async function saveConfig() {
  savingConfig.value = true
  try {
    const data = {
      loja_id: form.value.loja_id || null,
      tipo: form.value.tipo,
      parametro1: form.value.parametro1,
      parametro2: form.value.parametro2,
      ativo: form.value.ativo
    }

    if (editMode.value) {
      await axios.put(api(`/admin/integracoes/${form.value.id}`), data)
      feedback.value = { success: true, message: 'Integração atualizada com sucesso!' }
    } else {
      await axios.post(api('/admin/integracoes'), data)
      feedback.value = { success: true, message: 'Integração criada com sucesso!' }
    }

    closeModal()
    await fetchConfigs()
  } catch {
    feedback.value = { success: false, message: 'Erro ao salvar integração.' }
  } finally {
    savingConfig.value = false
  }
}

async function deleteConfig(config) {
  if (!confirm(`Deseja realmente excluir esta integração?`)) return
  try {
    await axios.delete(api(`/admin/integracoes/${config.id}`))
    feedback.value = { success: true, message: 'Integração excluída com sucesso!' }
    await fetchConfigs()
  } catch {
    feedback.value = { success: false, message: 'Erro ao excluir integração.' }
  }
}

async function testApi() {
  if (!form.value.parametro1) return
  
  try {
    const resp = await axios.get(form.value.parametro1, {
      headers: form.value.parametro2 ? { Authorization: `Bearer ${form.value.parametro2}` } : {}
    })
    alert('API testada com sucesso! Resposta recebida.')
  } catch {
    alert('Erro ao testar API. Verifique a URL e parâmetros.')
  }
}

function triggerFileInput() {
  fileInput.value?.click()
}

function onFileSelect(e) {
  const file = e.target.files?.[0]
  if (file) {
    form.value.parametro1 = file.name
  }
}

onMounted(() => {
  fetchConfigs()
  fetchStores()
  fetchLogs()
})
</script>

<style scoped>
.integration-config-bg {
  background: transparent;
}

.integration-config-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #ff660014;
  padding: 24px;
  min-width: 320px;
  max-width: 100%;
  width: 100%;
}

.header-section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.header-content {
  flex: 1;
}

.title {
  color: #ff6600;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #666;
  font-size: 0.95rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  font-size: 0.9rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #ff6600;
  color: #fff;
  border-color: #ff6600;
}

.btn-primary:hover:not(:disabled) {
  background: #e55a00;
  border-color: #e55a00;
}

.btn-secondary {
  background: #fff;
  color: #ff6600;
  border-color: #ffd180;
}

.btn-secondary:hover:not(:disabled) {
  background: #fff8e1;
  border-color: #ff6600;
}

.btn-edit {
  background: #fff8e1;
  color: #ff6600;
  border-color: #ffd180;
  padding: 6px 12px;
  font-size: 0.85rem;
}

.btn-edit:hover {
  background: #ff6600;
  color: #fff;
}

.btn-delete {
  background: #fff1f1;
  color: #c62828;
  border-color: #ffbdbd;
  padding: 6px 12px;
  font-size: 0.85rem;
}

.btn-delete:hover {
  background: #c62828;
  color: #fff;
}

.btn-refresh {
  background: #fff;
  color: #ff6600;
  border-color: #ffd180;
  padding: 6px 12px;
  font-size: 0.85rem;
}

.btn-test {
  background: #e8f5e9;
  color: #2e7d32;
  border-color: #c8e6c9;
}

.btn-test:hover:not(:disabled) {
  background: #2e7d32;
  color: #fff;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
  border-color: #ddd;
}

.btn-save {
  background: #ff6600;
  color: #fff;
  border-color: #ff6600;
}

.btn-save:hover:not(:disabled) {
  background: #e55a00;
}

.feedback-message {
  margin: 16px 0;
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid;
}

.message-success {
  background: #e8f5e9;
  color: #2e7d32;
  border-color: #c8e6c9;
}

.message-error {
  background: #ffebee;
  color: #c62828;
  border-color: #ffcdd2;
}

.table-wrapper {
  overflow-x: auto;
  margin: 20px 0;
}

.integrations-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #ff66001a;
}

.integrations-table th,
.integrations-table td {
  padding: 12px 16px;
  text-align: left;
  color: #212121;
  border-bottom: 1px solid #ffe0b2;
}

.integrations-table th {
  background: #fff3e0;
  color: #ff6600;
  font-weight: 700;
  border-bottom: 2px solid #ff6600;
}

.integrations-table tr:last-child td {
  border-bottom: none;
}

.param-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  font-size: 0.85rem;
}

.status-badge.active {
  background: #e0ffe0;
  color: #2e7d32;
}

.status-badge.inactive {
  background: #ffe0e0;
  color: #c62828;
}

.actions {
  display: flex;
  gap: 6px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 20px 0;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #ffd180;
  background: #fff;
  color: #ff6600;
  border-radius: 6px;
  cursor: pointer;
}

.page-btn:hover:not(:disabled) {
  background: #fff8e1;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #666;
  font-weight: 600;
  margin: 0 8px;
}

.logs-panel {
  background: #fffdf6;
  border: 1px solid #ffe0b2;
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
}

.logs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.logs-title {
  color: #ff6600;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

.logs-content {
  background: #fff;
  border: 1px dashed #ffd180;
  border-radius: 8px;
  padding: 12px;
}

.logs-pre {
  max-height: 200px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  color: #333;
  white-space: pre-wrap;
  margin: 0;
}

.logs-empty {
  color: #888;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: #00000044;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 24px #00000022;
  width: 90vw;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  background: #fff3e0;
  padding: 16px 20px;
  border-bottom: 1px solid #ffe0b2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px 12px 0 0;
}

.modal-title {
  color: #ff6600;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.modal-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tag-type {
  background: #fff3e0;
  color: #ff6600;
}

.tag-store {
  background: #e8f5e9;
  color: #2e7d32;
}

.modal-form {
  padding: 20px;
}

.form-row {
  margin-bottom: 16px;
}

.form-row label {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 6px;
}

.form-input,
.form-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ffd180;
  border-radius: 6px;
  background: #fff;
  color: #333;
  box-sizing: border-box;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 0 2px #ff660020;
}

.form-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.form-group .form-input {
  flex: 1;
}

.form-hint {
  color: #666;
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;
}

.form-hint code {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.8rem;
}

.form-checkbox {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 0;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #ff6600;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #ffe0b2;
  margin-top: 20px;
}

/* Responsividade */
@media (max-width: 1200px) {
  .integration-config-card {
    padding: 20px;
  }
  
  .header-section {
    gap: 16px;
  }
}

@media (max-width: 900px) {
  .header-section {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .header-actions {
    justify-content: stretch;
  }
  
  .header-actions .btn {
    flex: 1;
    justify-content: center;
  }
  
  .param-cell {
    max-width: 150px;
  }
}

@media (max-width: 768px) {
  .integration-config-card {
    padding: 16px;
  }
  
  .title {
    font-size: 1.4rem;
  }
  
  .integrations-table thead {
    display: none;
  }
  
  .integrations-table,
  .integrations-table tbody,
  .integrations-table tr,
  .integrations-table td {
    display: block;
    width: 100%;
  }
  
  .integrations-table tr {
    border: 1px solid #ffe0b2;
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 12px;
    background: #fff;
    box-shadow: 0 2px 4px #ff66001a;
  }
  
  .integrations-table td {
    padding: 6px 0;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 32px;
  }
  
  .integrations-table td::before {
    content: attr(data-label) ": ";
    color: #ff6600;
    font-weight: 700;
    min-width: 100px;
    flex-shrink: 0;
  }
  
  .integrations-table td[data-label="Ações"] {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .integrations-table td[data-label="Ações"]::before {
    width: 100%;
    margin-bottom: 6px;
  }

  .actions {
    width: 100%;
  }

  .actions .btn {
    flex: 1;
    min-width: 80px;
  }
  
  .logs-panel {
    padding: 14px;
  }
  
  .logs-title {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .integration-config-card {
    padding: 12px;
  }

  .title {
    font-size: 1.2rem;
  }

  .header-actions {
    flex-direction: column;
    gap: 8px;
  }

  .modal {
    width: 95vw;
    margin: 10px;
  }

  .modal-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 16px;
  }

  .form-group {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }

  .modal-actions {
    flex-direction: column;
    gap: 8px;
  }

  .integrations-table td {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 8px 0;
  }

  .integrations-table td::before {
    width: 100%;
    margin-bottom: 4px;
  }

  .actions {
    flex-direction: column;
    gap: 6px;
  }
  
  .actions .btn {
    width: 100%;
    min-width: auto;
  }
  
  .btn {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
  
  .page-btn {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .integration-config-card {
    padding: 10px;
    border-radius: 10px;
  }

  .title {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }

  .btn {
    padding: 6px 10px;
    font-size: 0.85rem;
    gap: 4px;
  }

  .logs-panel {
    padding: 10px;
  }
  
  .logs-title {
    font-size: 0.95rem;
  }

  .modal-form {
    padding: 12px;
  }
  
  .modal-header {
    padding: 10px 12px;
  }
  
  .modal-title {
    font-size: 1.1rem;
  }
  
  .form-input,
  .form-select {
    padding: 6px 10px;
    font-size: 0.9rem;
  }
  
  .integrations-table tr {
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .integrations-table td {
    padding: 4px 0;
    font-size: 0.9rem;
  }
  
  .integrations-table td::before {
    font-size: 0.85rem;
  }
  
  .status-badge {
    padding: 3px 8px;
    font-size: 0.8rem;
  }
  
  .page-info {
    font-size: 0.85rem;
  }
}

@media (max-width: 375px) {
  .integration-config-card {
    padding: 8px;
  }
  
  .title {
    font-size: 1rem;
  }
  
  .subtitle {
    font-size: 0.85rem;
  }
  
  .btn {
    padding: 6px 8px;
    font-size: 0.8rem;
  }
  
  .modal {
    width: 98vw;
    margin: 5px;
  }
  
  .modal-form {
    padding: 10px;
  }
  
  .form-input,
  .form-select {
    padding: 5px 8px;
    font-size: 0.85rem;
  }
  
  .integrations-table tr {
    padding: 8px;
  }
  
  .logs-panel {
    padding: 8px;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .page-btn {
    padding: 6px 8px;
    font-size: 0.8rem;
  }
}
</style>
