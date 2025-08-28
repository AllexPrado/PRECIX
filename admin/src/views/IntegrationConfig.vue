<template>
  <div class="integration-config-bg">
    <div class="integration-config-card">
      <div class="p-d-flex p-ai-center p-jc-between p-flex-wrap gap-2">
        <div>
          <h2 class="title">Configuração de Integrações</h2>
          <p class="subtitle">Gerencie como o sistema importa e atualiza preços por loja.</p>
        </div>
        <div class="p-d-flex gap-2">
          <Button label="Adicionar Integração" icon="pi pi-plus" size="small" class="btn-compact" @click="openAddModal" />
          <Button :label="importLoading ? 'Importando...' : 'Importar agora'" :disabled="importLoading" icon="pi pi-download" severity="secondary" outlined size="small" class="btn-compact" @click="importNow" />
        </div>
      </div>
      <div v-if="feedback" class="p-mt-2">
        <Message :severity="feedback.success ? 'success' : 'error'">{{ feedback.message }}</Message>
      </div>

      <DataTable :value="configs" dataKey="id" paginator :rows="10" :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll" class="p-mt-3">
        <Column header="Loja">
          <template #body="{ data }">
            {{ getStoreName(data.loja_id) || 'Global' }}
          </template>
        </Column>
        <Column field="tipo" header="Tipo" />
        <Column field="parametro1" header="Parâmetro 1" />
        <Column field="parametro2" header="Parâmetro 2" />
        <Column header="Ativo" style="width:120px">
          <template #body="{ data }">
            <span :class="['chip', data.ativo ? 'chip-ok' : 'chip-off']">{{ data.ativo ? 'Sim' : 'Não' }}</span>
          </template>
        </Column>
        <Column header="Ações" style="width:220px">
          <template #body="{ data }">
            <div class="p-d-flex gap-2">
  <Button label="Editar" size="small" class="btn-compact" icon="pi pi-pencil" severity="secondary" outlined @click="editConfig(data)" />
  <Button label="Excluir" size="small" class="btn-compact" icon="pi pi-trash" severity="danger" outlined @click="deleteConfig(data)" />
            </div>
          </template>
        </Column>
      </DataTable>

      <Panel header="Logs recentes de importação" toggleable collapsed class="p-mt-3">
        <div class="p-d-flex p-jc-between p-ai-center p-mb-2">
          <span class="text-muted">Últimos eventos</span>
          <Button label="Atualizar" icon="pi pi-refresh" text size="small" class="btn-compact" @click="fetchLogs" />
        </div>
        <template v-if="logs && logs.length">
          <pre class="logs-pre">{{ logs.join('\n').trim() }}</pre>
        </template>
        <template v-else>
          <div class="logs-empty">Sem eventos recentes.</div>
        </template>
      </Panel>

      <!-- Dialog Adicionar/Editar -->
  <Dialog v-model:visible="showModal" modal :style="{ width: '720px' }" :breakpoints="{'960px': '90vw', '640px': '98vw'}" class="int-dialog">
    <template #header>
      <div class="dlg-header">
        <div class="dlg-title">{{ editMode ? 'Editar Integração' : 'Adicionar Integração' }}</div>
        <div class="dlg-tags">
          <span v-if="form.tipo" class="pill pill-type">{{ tipoLabel(form.tipo) }}</span>
          <span class="pill pill-store">{{ getStoreName(form.loja_id) || 'Global' }}</span>
        </div>
      </div>
    </template>
    <form @submit.prevent="saveConfig" class="p-fluid" :aria-busy="savingConfig">
          <div class="p-formgrid p-grid box box-context">
            <div class="p-field p-col-12 p-md-6">
              <label class="p-d-block p-mb-2">Loja</label>
      <Dropdown v-model="form.loja_id"
        :options="storeOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Global"
        showClear
        appendTo="self"
        panelClass="dropdown-light"
        class="dropdown-light input-compact"
        :disabled="savingConfig"
        @change="onStoreChange"/>
      <small class="hint">Deixe em branco para integração Global (todas as lojas).</small>
            </div>
            <div class="p-field p-col-12 p-md-6">
              <label class="p-d-block p-mb-2">Tipo</label>
      <Dropdown v-model="form.tipo" :options="tipoOptions" optionLabel="label" optionValue="value" placeholder="Selecione" :disabled="savingConfig" required panelClass="dropdown-light" class="dropdown-light input-compact" />
            </div>
          </div>

          <div class="p-formgrid p-grid box box-details">
            <div class="p-field p-col-12" v-if="form.tipo === 'arquivo'">
              <label class="p-d-block p-mb-2">Caminho do arquivo</label>
              <div class="p-d-flex gap-2">
                <InputText v-model="form.parametro1" placeholder="Selecione ou digite o caminho do arquivo" class="p-flex-1 input-compact" :disabled="savingConfig" required />
                <input type="file" style="display:none;" ref="fileInput" @change="onFileSelect" />
                <Button type="button" label="Selecionar pasta" icon="pi pi-folder-open" severity="secondary" size="small" class="btn-compact" :disabled="savingConfig" @click="triggerFileInput" />
                <Button type="button" label="Layout" icon="pi pi-sliders-h" severity="secondary" outlined size="small" class="btn-compact" :disabled="savingConfig" @click="openLayoutModal" />
              </div>
            </div>
            <div class="p-field p-col-12" v-else>
              <template v-if="form.tipo === 'api'">
                <label class="p-d-block p-mb-2">Endpoint da API</label>
                <div class="p-d-flex gap-2">
                  <InputText v-model="form.parametro1" placeholder="Ex: http://host:porta/product/all" class="p-flex-1 input-compact" :disabled="savingConfig" required />
                  <Button type="button" label="Testar API" icon="pi pi-play" size="small" class="btn-compact" :disabled="savingConfig || !form.parametro1" @click="testApi" />
                </div>
                <small class="hint">Suporte a Bearer token em Parâmetro 2. Resposta JSON deve conter lista de produtos com campos barcode/codigo, name/descricao, price/preco.</small>
              </template>
              <template v-else>
                <label class="p-d-block p-mb-2">Parâmetro 1</label>
                <InputText v-model="form.parametro1" placeholder="Ex: endpoint, string de conexão" class="input-compact" :disabled="savingConfig" required />
              </template>
            </div>
            <div class="p-field p-col-12 p-md-8">
              <label class="p-d-block p-mb-2">Parâmetro 2</label>
              <InputText v-model="form.parametro2" placeholder="Ex: token, diretório, etc" class="input-compact" :disabled="savingConfig" />
            </div>
            <div class="p-field-checkbox p-col-12 p-md-4 p-d-flex p-ai-center p-jc-start">
              <Checkbox v-model="form.ativo" :binary="true" inputId="ativoCheck" :disabled="savingConfig" />
              <label for="ativoCheck" class="p-ml-2">Ativo</label>
            </div>
          </div>

          <div class="p-d-flex p-jc-end gap-2 p-mt-3">
            <Button type="button" label="Cancelar" severity="secondary" text size="small" class="btn-compact" :disabled="savingConfig" @click="closeModal" />
            <Button type="submit" :label="savingConfig ? 'Salvando…' : 'Salvar'" icon="pi pi-check" size="small" class="btn-compact" :disabled="savingConfig" />
          </div>
        </form>
      </Dialog>

      <!-- Dialog Layout Arquivo -->
      <Dialog v-model:visible="showLayoutModal" modal header="Configurar Layout do Arquivo" :style="{ width: '560px' }" :breakpoints="{'960px': '85vw', '640px': '98vw'}">
        <div class="p-fluid">
          <div class="p-field p-mb-3">
            <label class="p-d-block p-mb-2">Separador</label>
            <InputText v-model="layout.separador" maxlength="1" style="width:80px;" />
          </div>
          <div class="p-field p-mb-3">
            <label class="p-d-block p-mb-2">Ordem das colunas (1 por linha)</label>
            <Textarea v-model="layout.colunas" rows="5" autoResize />
          </div>
          <div class="p-field p-mb-3">
            <label class="p-d-block p-mb-2">Exemplo de linha</label>
            <InputText v-model="layout.exemplo" />
          </div>
          <div class="p-d-flex p-jc-end gap-2">
            <Button label="Cancelar" severity="secondary" text @click="closeLayoutModal" />
            <Button label="Salvar Layout" icon="pi pi-save" @click="saveLayout" />
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
// Tela de configuração de integrações de preço
// Permite cadastrar, editar e visualizar integrações por loja ou global
// Cores e layout seguem padrão do cliente
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { api } from '../apiBase.js'
// PrimeVue components (apenas uso local, sem remover lógica existente)
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Textarea from 'primevue/textarea'
import Panel from 'primevue/panel'
import Message from 'primevue/message'
// Função para excluir integração
async function deleteConfig(config) {
  if (!confirm(`Deseja realmente excluir esta integração?`)) return;
  try {
    await axios.delete(api(`/admin/integracoes/${config.id}`));
    feedback.value = { success: true, message: 'Integração excluída com sucesso!' };
    await fetchConfigs();
  } catch {
    feedback.value = { success: false, message: 'Erro ao excluir integração.' };
  }
}
const configs = ref([])
const stores = ref([])
const showModal = ref(false)
const editMode = ref(false)
const form = ref({ id: null, loja_id: null, tipo: '', parametro1: '', parametro2: '', ativo: true, layout: null })
const showLayoutModal = ref(false)
const layout = ref({ separador: ';', colunas: 'codigo\ndescricao\npreco', exemplo: '1234;Arroz;10.99' })
const fileInput = ref(null)
const feedback = ref(null)
const importLoading = ref(false)
const logs = ref([])
const savingConfig = ref(false)
// Derived options for dropdowns
const storeOptions = ref([])
const tipoOptions = [
  { label: 'Arquivo', value: 'arquivo' },
  { label: 'API', value: 'api' },
  { label: 'Banco de Dados', value: 'banco' }
]

function tipoLabel(v) {
  const map = { arquivo: 'Arquivo', api: 'API', banco: 'Banco de Dados' }
  return map[(v || '').toString().toLowerCase()] || '—'
}

// Table templates
function storeTemplate(row) {
  return getStoreName(row.loja_id) || 'Global'
}
function ativoTemplate(row) {
  return row.ativo ? 'Sim' : 'Não'
}
function actionsTemplate(row) {
  return (
    // PrimeVue doesn't render VNodes in inline functions here; use template slots via dt scoped slots.
    // We'll keep this as a placeholder; real actions are implemented via dt templates below if needed.
    row && ''
  )
}
function triggerFileInput() {
  fileInput.value && fileInput.value.click()
}

function onFileSelect(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.parametro1 = file.path || file.name
  }
}

function openLayoutModal() {
  // Carrega layout salvo ou padrão
  if (form.value.layout) {
    try {
      const l = JSON.parse(form.value.layout)
      layout.value = { ...l }
    } catch {
      layout.value = { separador: ';', colunas: 'codigo\ndescricao\npreco', exemplo: '1234;Arroz;10.99' }
    }
  } else {
    layout.value = { separador: ';', colunas: 'codigo\ndescricao\npreco', exemplo: '1234;Arroz;10.99' }
  }
  showLayoutModal.value = true
}

function closeLayoutModal() {
  showLayoutModal.value = false
}

function saveLayout() {
  form.value.layout = JSON.stringify(layout.value)
  showLayoutModal.value = false
}

function getStoreName(id) {
  const store = stores.value.find(s => s.id === id)
  return store ? store.name : null
}

async function fetchConfigs() {
  try {
  const resp = await axios.get(api('/admin/integracoes'))
    configs.value = (resp.data || []).map((c, idx) => ({
      ...c,
      id: c.id ?? idx,
      // garante tipos corretos vindos da API/SQLite
      loja_id: (c.loja_id === null || c.loja_id === 'null' || c.loja_id === '') ? null : Number(c.loja_id),
      ativo: Number(c.ativo) ? 1 : 0,
      tipo: (c.tipo || '').toString().toLowerCase()
    }))
  } catch {
    configs.value = []
  }
}
async function fetchStores() {
  try {
  const resp = await axios.get(api('/admin/stores'))
    const data = resp.data
    // Aceita tanto {stores: [...]} quanto array simples
    stores.value = Array.isArray(data) ? data : (data?.stores || [])
    storeOptions.value = [{ label: 'Global', value: null }].concat(
      (stores.value || []).map(s => ({ label: s.name, value: s.id }))
    )
  } catch {
    stores.value = []
    storeOptions.value = [{ label: 'Global', value: null }]
  }
}
async function fetchLogs() {
  try {
  const resp = await axios.get(api('/admin/importar-precos/logs'))
    logs.value = resp.data?.logs || []
  } catch {
    logs.value = []
  }
}
async function importNow() {
  importLoading.value = true
  feedback.value = null
  try {
  const resp = await axios.post(api('/admin/importar-precos'))
    if (resp.data?.success) {
      feedback.value = { success: true, message: 'Importação executada.' }
    } else {
      feedback.value = { success: false, message: resp.data?.message || 'Falha ao importar.' }
    }
  } catch (e) {
    feedback.value = { success: false, message: 'Erro ao acionar importação.' }
  } finally {
    importLoading.value = false
    fetchLogs()
  }
}
function openAddModal() {
  form.value = { id: null, loja_id: null, tipo: '', parametro1: '', parametro2: '', ativo: true, layout: null }
  editMode.value = false
  showModal.value = true
}

function editConfig(config) {
  // mantém id e converte loja_id para null ou número conforme options
  const lojaId = (config.loja_id === null || config.loja_id === 'null' || config.loja_id === '') ? null : Number(config.loja_id)
  // Normaliza tipo para os valores aceitos (arquivo/api/banco)
  const tipoRaw = (config.tipo || '').toString().toLowerCase()
  const tipo = ['arquivo','api','banco'].includes(tipoRaw) ? tipoRaw : ''
  form.value = { ...config, loja_id: isNaN(lojaId) ? null : lojaId, ativo: !!config.ativo, tipo }
  editMode.value = true
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveConfig() {
  feedback.value = null
  savingConfig.value = true
  try {
    const payload = { ...form.value }
    // Normaliza loja_id para número ou null
    let lid = payload.loja_id
    if (lid === undefined || lid === null || lid === '' || lid === 'null') {
      payload.loja_id = null
    } else {
      const n = Number(lid)
      payload.loja_id = Number.isFinite(n) ? n : null
    }
    // Normaliza flags e tipo obrigatório
    payload.ativo = payload.ativo ? 1 : 0
    payload.tipo = (payload.tipo || '').toString().toLowerCase()
    if (!payload.tipo || !payload.parametro1) {
      feedback.value = { success: false, message: 'Preencha Tipo e Caminho/Parâmetro 1.' }
      return
    }
  await axios.post(api('/admin/integracoes'), payload)
    feedback.value = { success: true, message: 'Integração salva com sucesso!' }
    showModal.value = false
    await fetchConfigs()
  } catch (e) {
    feedback.value = { success: false, message: 'Erro ao salvar integração.' }
  } finally {
    savingConfig.value = false
  }
}

function onStoreChange(event) {
  // PrimeVue Dropdown emite { value } no change; aceita também valor direto por segurança
  const val = (event && typeof event === 'object' && 'value' in event) ? event.value : event
  if (val === undefined || val === '' || val === null) {
    form.value.loja_id = null
  } else {
    const n = Number(val)
    form.value.loja_id = Number.isFinite(n) ? n : null
  }
}

onMounted(() => {
  fetchConfigs()
  fetchStores()
  fetchLogs()
})

async function testApi() {
  try {
    const url = (form.value.parametro1 || '').toString().trim()
    const token = (form.value.parametro2 || '').toString().trim()
    if (!url) return
    const resp = await axios.post(api('/admin/integracoes/testar-api'), { url, token })
    if (resp.data?.success) {
      const c = resp.data.count ?? 0
      feedback.value = { success: true, message: `API OK (${c} itens).` }
    } else {
      feedback.value = { success: false, message: resp.data?.message || 'Falha ao testar API.' }
    }
  } catch (e) {
    feedback.value = { success: false, message: 'Erro ao testar API.' }
  }
}
</script>

<style scoped>
.delete-btn {
  background: #c62828;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  margin: 2px;
  cursor: pointer;
}
.delete-btn:hover {
  background: #8e0000;
}
/* Layout principal */
.integration-config-bg { min-height: 100vh; background: #fff3e0; display: flex; align-items: flex-start; justify-content: center; padding: 14px; }
.integration-config-card { background: #fff; border-radius: 14px; box-shadow: 0 6px 24px #ff66001a; padding: 16px; min-width: 300px; max-width: 1100px; width: 100%; }
.title { margin: 0; color: #ff6600; }
.subtitle { margin: 2px 0 0 0; color: #7a7a7a; }
.integration-config-card :deep(.p-datatable-wrapper) { border: 1px solid #ffe0b2; border-radius: 8px; }
.integration-config-card :deep(.p-button) { font-weight: 700; }
/* Botões secundários e outline no card (Editar, Importar agora): branco + borda laranja + texto laranja */
.integration-config-card :deep(.p-button.p-button-secondary),
.integration-config-card :deep(.p-button.p-button-outlined.p-button-secondary),
.integration-config-card :deep(.p-button.p-button-outlined:not(.p-button-danger):not(.p-button-success)) {
  background: #ffffff !important;
  color: #ff6600 !important;
  border-color: #ff6600 !important;
}
.integration-config-card :deep(.p-button.p-button-secondary:hover),
.integration-config-card :deep(.p-button.p-button-outlined.p-button-secondary:hover),
.integration-config-card :deep(.p-button.p-button-outlined:not(.p-button-danger):not(.p-button-success):hover) {
  background: #fff7ef !important;
  color: #e85a00 !important;
  border-color: #e85a00 !important;
}
.integration-config-card :deep(.p-button:disabled) {
  opacity: .65;
  cursor: not-allowed;
}
.feedback-success {
  color: #388e3c;
  font-weight: bold;
  margin-left: 18px;
}
.feedback-error {
  color: #c62828;
  font-weight: bold;
  margin-left: 18px;
}
.modal-bg {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-card { background: #fff; border-radius: 12px; padding: 16px 18px; min-width: 380px; box-shadow: 0 4px 16px #ff660033; }
.modal-integration {
  max-width: 600px;
}
.modal-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 10px; }
.modal-col {
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.file-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.modal-actions { display: flex; gap: 10px; margin-top: 12px; justify-content: flex-end; }
.edit-btn {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  margin: 2px;
  cursor: pointer;
}
.edit-btn:hover {
  background: #e65100;
}
/* Logs */
.logs-panel { background: #fffef9; border: 1px solid #ffe0b2; border-radius: 10px; padding: 10px; margin-top: 12px; }
.logs-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.logs-pre { max-height: 260px; overflow: auto; background: #fff; border: 1px dashed #ffd699; padding: 10px 12px; border-radius: 8px; white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12.5px; line-height: 1.35; color: #263238; }
.logs-empty { background: #fffdf7; border: 1px solid #ffe0b2; color: #6b7280; padding: 10px 12px; border-radius: 8px; }
/* Dialog layout clean */
.int-dialog :deep(.p-dialog-content) { background: #fff; }
.int-dialog :deep(.p-dropdown) { background: #fff; }
/* Melhorar legibilidade em diálogos e tabela */
.int-dialog :deep(.p-dialog-header),
.int-dialog :deep(.p-dialog-title) { color: #212121; }
.int-dialog :deep(.p-dialog-header) { background: #fffaf5; border-bottom: 1px solid #ffe0b2; }
/* Custom header with tags */
.dlg-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; }
.dlg-title { font-size: 1.1rem; font-weight: 700; color: #ff6600; }
.dlg-tags { display: flex; align-items: center; gap: 8px; }
.pill { display: inline-block; padding: 2px 10px; border-radius: 999px; font-weight: 700; letter-spacing: .2px; border: 1px solid transparent; font-size: .85rem; }
.pill-type { background: #fff3e0; color: #c2410c; border-color: #ffddbf; }
.pill-store { background: #ecfdf5; color: #065f46; border-color: #bbf7d0; }
/* Boxes to segment form groups */
.box { background: #fff; border: 1px solid #ffe0b2; border-radius: 10px; padding: 12px; margin-top: 8px; }
.box-context { background: #fffdf8; }
.box-details { background: #fffefb; }
/* Compact inputs */
.input-compact :deep(.p-inputtext),
.input-compact { padding-top: 0.35rem; padding-bottom: 0.35rem; }
.int-dialog :deep(.p-inputtext),
.int-dialog :deep(.p-dropdown),
.int-dialog :deep(.p-dropdown-label),
.int-dialog :deep(.p-textarea) { background: #fff; color: #212121; }
.int-dialog :deep(.p-dropdown-panel),
.int-dialog :deep(.p-dropdown-items) { background: #fff; color: #212121; }
.int-dialog :deep(.p-dropdown-item) { background: #fff; color: #212121; }
.int-dialog :deep(.p-dropdown-item.p-highlight) { background: #fff3e0; color: #111; }
.dropdown-light :deep(.p-dropdown-label),
.dropdown-light :deep(.p-dropdown-trigger) { color: #212121 !important; }
.dropdown-light :deep(.p-dropdown) { background: #fff !important; }
.dropdown-light :deep(.p-dropdown-panel) { background: #fff !important; color: #212121 !important; border: 1px solid #ffd1a6 !important; }
.dropdown-light :deep(.p-dropdown-item) { background: #fff !important; color: #212121 !important; }
.dropdown-light :deep(.p-dropdown-item.p-highlight) { background: #fff3e0 !important; color: #111 !important; }
/* Botões no modal (Selecionar, Layout, Cancelar): padrão da marca */
.int-dialog :deep(.p-button.p-button-secondary),
.int-dialog :deep(.p-button.p-button-outlined.p-button-secondary),
.int-dialog :deep(.p-button.p-button-text.p-button-secondary) {
  background: #ffffff !important;
  color: #ff6600 !important;
  border-color: #ff6600 !important;
}
.int-dialog :deep(.p-button.p-button-secondary:hover),
.int-dialog :deep(.p-button.p-button-outlined.p-button-secondary:hover),
.int-dialog :deep(.p-button.p-button-text.p-button-secondary:hover) {
  background: #fff7ef !important;
  color: #e85a00 !important;
  border-color: #e85a00 !important;
}
.int-dialog :deep(.p-button:disabled) {
  opacity: .65;
  cursor: not-allowed;
}
.int-dialog :deep(.p-checkbox .p-checkbox-box) { background: #fff; border-color: #ff6600; }
.int-dialog :deep(.p-checkbox .p-checkbox-box.p-highlight) { background: #ff6600; border-color: #ff6600; }
.int-dialog :deep(.p-checkbox .p-checkbox-icon) { color: #fff; }

.integration-config-card :deep(.p-datatable-thead > tr > th),
.integration-config-card :deep(.p-datatable-tbody > tr > td) {
  color: #212121;
  background: #fff;
}
.integration-config-card :deep(.p-datatable .p-datatable-tbody > tr:nth-child(odd) > td) { background: #fffdf8; }
.integration-config-card :deep(.p-datatable .p-datatable-tbody > tr:nth-child(even) > td) { background: #fffaf4; }
.integration-config-card :deep(.p-datatable .p-paginator) { background: #fff; border-top: 1px solid #ffe0b2; color: #212121; }
.integration-config-card :deep(.p-paginator .p-dropdown) { background: #fff; color: #212121; border-color: #ffd1a6; }
.integration-config-card :deep(.p-paginator .p-dropdown .p-dropdown-label) { background: #fff; color: #212121; }
.integration-config-card :deep(.p-dropdown-panel) { background: #fff; color: #212121; border: 1px solid #ffd1a6; box-shadow: 0 8px 20px rgba(255,102,0,0.12); }
.integration-config-card :deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item) { background: #fff; color: #212121; }
.integration-config-card :deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) { background: #fff3e0; color: #111; }
.integration-config-card :deep(.p-dropdown-item) { background: #fff; color: #212121; }
.integration-config-card :deep(.p-dropdown-item.p-highlight) { background: #fff3e0; color: #111; }
.integration-config-card :deep(.p-paginator .p-dropdown-panel) { background: #fff !important; color: #212121 !important; border: 1px solid #ffd1a6 !important; }
.integration-config-card :deep(.p-paginator .p-dropdown-item) { background: #fff !important; color: #212121 !important; }
.integration-config-card :deep(.p-paginator .p-dropdown-item.p-highlight) { background: #fff3e0 !important; color: #111 !important; }
.integration-config-card :deep(.p-paginator .p-paginator-page.p-highlight) { background: #fff3e0; border-color: #ffcc99; color: #111; }
.integration-config-card :deep(.p-paginator .p-paginator-page:not(.p-highlight):hover) { background: #fff7ef; }
.hint { color: #6b7280; font-size: .85rem; }
.integration-config-card :deep(.p-panel .p-panel-header) { color: #212121; background: #fff; }
.chip { display: inline-block; padding: 2px 10px; border-radius: 999px; font-weight: 700; letter-spacing: .2px; border: 1px solid transparent; }
.chip-ok { background: #e8f5e9; color: #1b5e20; border-color: #c8e6c9; }
.chip-off { background: #ffebee; color: #b71c1c; border-color: #ffcdd2; }
/* Responsivo: tabela scrollável em telas estreitas */
@media (max-width: 720px) {
  .integration-config-card { padding: 12px; }
}
</style>
