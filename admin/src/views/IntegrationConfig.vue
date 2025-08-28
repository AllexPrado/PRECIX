<template>
  <div class="integration-config-bg">
    <div class="integration-config-card">
      <div class="p-d-flex p-ai-center p-jc-between p-flex-wrap gap-2">
        <div>
          <h2 class="title">Configuração de Integrações</h2>
          <p class="subtitle">Gerencie como o sistema importa e atualiza preços por loja.</p>
        </div>
        <div class="p-d-flex gap-2">
          <Button label="Adicionar Integração" icon="pi pi-plus" @click="openAddModal" />
          <Button :label="importLoading ? 'Importando...' : 'Importar agora'" :disabled="importLoading" icon="pi pi-download" severity="secondary" outlined @click="importNow" />
        </div>
      </div>
      <div v-if="feedback" class="p-mt-2">
        <Message :severity="feedback.success ? 'success' : 'error'">{{ feedback.message }}</Message>
      </div>

      <DataTable :value="configs" dataKey="id" paginator :rows="10" :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll" class="p-mt-3">
        <Column field="loja" header="Loja" :body="storeTemplate" />
        <Column field="tipo" header="Tipo" />
        <Column field="parametro1" header="Parâmetro 1" />
        <Column field="parametro2" header="Parâmetro 2" />
        <Column header="Ativo" :body="ativoTemplate" style="width:120px" />
    <Column header="Ações" style="width:220px">
          <template #body="{ data }">
            <div class="p-d-flex gap-2">
      <Button label="Editar" size="small" icon="pi pi-pencil" severity="secondary" outlined @click="editConfig(data)" />
      <Button label="Excluir" size="small" icon="pi pi-trash" severity="danger" outlined @click="deleteConfig(data)" />
            </div>
          </template>
        </Column>
      </DataTable>

      <Panel header="Logs recentes de importação" toggleable collapsed class="p-mt-3">
        <div class="p-d-flex p-jc-between p-ai-center p-mb-2">
          <span class="text-muted">Últimos eventos</span>
          <Button label="Atualizar" icon="pi pi-refresh" text @click="fetchLogs" />
        </div>
        <pre class="logs-pre">{{ logs.join('') }}</pre>
      </Panel>

      <!-- Dialog Adicionar/Editar -->
  <Dialog v-model:visible="showModal" modal :header="editMode ? 'Editar Integração' : 'Adicionar Integração'" :style="{ width: '680px' }" :breakpoints="{'960px': '85vw', '640px': '98vw'}" class="int-dialog">
    <form @submit.prevent="saveConfig" class="p-fluid" :aria-busy="savingConfig">
          <div class="p-formgrid p-grid">
            <div class="p-field p-col-12 p-md-6">
              <label class="p-d-block p-mb-2">Loja</label>
      <Dropdown v-model="form.loja_id"
        :options="storeOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Global"
        showClear
        appendTo="self"
        :disabled="savingConfig"
        @change="onStoreChange"/>
      <small class="hint">Deixe em branco para integração Global (todas as lojas).</small>
            </div>
            <div class="p-field p-col-12 p-md-6">
              <label class="p-d-block p-mb-2">Tipo</label>
      <Dropdown v-model="form.tipo" :options="tipoOptions" optionLabel="label" optionValue="value" placeholder="Selecione" :disabled="savingConfig" required />
            </div>
          </div>

          <div class="p-formgrid p-grid">
            <div class="p-field p-col-12" v-if="form.tipo === 'arquivo'">
              <label class="p-d-block p-mb-2">Caminho do arquivo</label>
              <div class="p-d-flex gap-2">
                <InputText v-model="form.parametro1" placeholder="Selecione ou digite o caminho do arquivo" class="p-flex-1" :disabled="savingConfig" required />
                <input type="file" style="display:none;" ref="fileInput" @change="onFileSelect" />
                <Button type="button" label="Selecionar" icon="pi pi-folder-open" severity="secondary" :disabled="savingConfig" @click="triggerFileInput" />
                <Button type="button" label="Layout" icon="pi pi-sliders-h" severity="secondary" outlined :disabled="savingConfig" @click="openLayoutModal" />
              </div>
            </div>
            <div class="p-field p-col-12" v-else>
              <label class="p-d-block p-mb-2">Parâmetro 1</label>
              <InputText v-model="form.parametro1" placeholder="Ex: endpoint, string de conexão" :disabled="savingConfig" required />
            </div>
            <div class="p-field p-col-12 p-md-8">
              <label class="p-d-block p-mb-2">Parâmetro 2</label>
              <InputText v-model="form.parametro2" placeholder="Ex: token, diretório, etc" :disabled="savingConfig" />
            </div>
            <div class="p-field-checkbox p-col-12 p-md-4 p-d-flex p-ai-center p-jc-start">
              <Checkbox v-model="form.ativo" :binary="true" inputId="ativoCheck" :disabled="savingConfig" />
              <label for="ativoCheck" class="p-ml-2">Ativo</label>
            </div>
          </div>

          <div class="p-d-flex p-jc-end gap-2 p-mt-3">
            <Button type="button" label="Cancelar" severity="secondary" text :disabled="savingConfig" @click="closeModal" />
            <Button type="submit" :label="savingConfig ? 'Salvando…' : 'Salvar'" icon="pi pi-check" :disabled="savingConfig" />
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
    configs.value = (resp.data || []).map((c, idx) => ({ ...c, id: c.id || idx }))
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
  form.value = { ...config, loja_id: isNaN(lojaId) ? null : lojaId, ativo: !!config.ativo }
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
    payload.ativo = payload.ativo ? 1 : 0
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
.logs-pre { max-height: 220px; overflow: auto; background: #fff; border: 1px dashed #ffd699; padding: 8px; border-radius: 8px; white-space: pre-wrap; }
/* Dialog layout clean */
.int-dialog :deep(.p-dialog-content) { background: #fff; }
.int-dialog :deep(.p-dropdown) { background: #fff; }
/* Melhorar legibilidade em diálogos e tabela */
.int-dialog :deep(.p-dialog-header),
.int-dialog :deep(.p-dialog-title) { color: #212121; }
.int-dialog :deep(.p-inputtext),
.int-dialog :deep(.p-dropdown),
.int-dialog :deep(.p-dropdown-label),
.int-dialog :deep(.p-textarea) { background: #fff; color: #212121; }
.int-dialog :deep(.p-dropdown-panel),
.int-dialog :deep(.p-dropdown-items) { background: #fff; color: #212121; }
.int-dialog :deep(.p-dropdown-item) { background: #fff; color: #212121; }
.int-dialog :deep(.p-dropdown-item.p-highlight) { background: #fff3e0; color: #111; }
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
.hint { color: #6b7280; font-size: .85rem; }
.integration-config-card :deep(.p-panel .p-panel-header) { color: #212121; background: #fff; }
/* Responsivo: tabela scrollável em telas estreitas */
@media (max-width: 720px) {
  .integration-config-card { padding: 12px; }
}
</style>
