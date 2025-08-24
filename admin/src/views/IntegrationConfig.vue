<template>
  <div class="integration-config-bg">
    <div class="integration-config-card">
      <h2>Configuração de Integrações</h2>
      <p>Gerencie aqui como o sistema irá importar e atualizar os preços de cada loja.</p>
      <div class="integration-header-row">
        <button class="add-btn" @click="openAddModal">Adicionar Integração</button>
        <span v-if="feedback" :class="{'feedback-success': feedback.success, 'feedback-error': !feedback.success}">{{ feedback.message }}</span>
      </div>
      <table class="integration-table">
        <thead>
          <tr>
            <th>Loja</th>
            <th>Tipo</th>
            <th>Parâmetro 1</th>
            <th>Parâmetro 2</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="config in configs" :key="config.id">
            <td>{{ getStoreName(config.loja_id) || 'Global' }}</td>
            <td>{{ config.tipo }}</td>
            <td>{{ config.parametro1 }}</td>
            <td>{{ config.parametro2 }}</td>
            <td><input type="checkbox" :checked="!!config.ativo" disabled /></td>
            <td>
              <button class="edit-btn" @click="editConfig(config)">Editar</button>
              <button class="delete-btn" @click="deleteConfig(config)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Modal de edição/adicionar -->
      <div v-if="showModal" class="modal-bg">
        <div class="modal-card modal-integration">
          <h3>{{ editMode ? 'Editar' : 'Adicionar' }} Integração</h3>
          <form @submit.prevent="saveConfig">
            <div class="modal-grid">
              <div class="modal-col">
                <label>Loja:</label>
                <select v-model="form.loja_id">
                  <option :value="null">Global</option>
                  <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
                </select>
              </div>
              <div class="modal-col">
                <label>Tipo:</label>
                <select v-model="form.tipo" required>
                  <option value="arquivo">Arquivo</option>
                  <option value="api">API</option>
                  <option value="banco">Banco de Dados</option>
                </select>
              </div>
            </div>
            <div class="modal-grid">
              <div class="modal-col" v-if="form.tipo === 'arquivo'">
                <label>Caminho do arquivo:</label>
                <div class="file-row">
                  <input v-model="form.parametro1" required placeholder="Selecione ou digite o caminho do arquivo" />
                  <input type="file" style="display:none;" ref="fileInput" @change="onFileSelect" />
                  <button type="button" @click="triggerFileInput">Selecionar arquivo</button>
                  <button type="button" @click="openLayoutModal">Configurar layout</button>
                </div>
              </div>
              <div class="modal-col" v-else>
                <label>Parâmetro 1:</label>
                <input v-model="form.parametro1" required placeholder="Ex: endpoint, string de conexão" />
              </div>
              <div class="modal-col">
                <label>Parâmetro 2:</label>
                <input v-model="form.parametro2" placeholder="Ex: token, diretório, etc" />
              </div>
              <div class="modal-col">
                <label>Ativo:</label>
                <input type="checkbox" v-model="form.ativo" />
              </div>
            </div>
            <div class="modal-actions">
              <button type="submit">Salvar</button>
              <button type="button" @click="closeModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      <!-- Modal de configuração de layout (mantido) -->
      <div v-if="showLayoutModal" class="modal-bg">
        <div class="modal-card">
          <h3>Configurar Layout do Arquivo</h3>
          <div style="margin-bottom:8px;">
            <label>Separador:
              <input v-model="layout.separador" maxlength="1" style="width:40px;" />
            </label>
          </div>
          <div style="margin-bottom:8px;">
            <label>Ordem das colunas (1 por linha):</label>
            <textarea v-model="layout.colunas" rows="5" style="width:100%;"></textarea>
          </div>
          <div style="margin-bottom:8px;">
            <label>Exemplo de linha:</label>
            <input v-model="layout.exemplo" style="width:100%;" />
          </div>
          <div class="modal-actions">
            <button type="button" @click="saveLayout">Salvar Layout</button>
            <button type="button" @click="closeLayoutModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Função para excluir integração
async function deleteConfig(config) {
  if (!confirm(`Deseja realmente excluir esta integração?`)) return;
  try {
    await axios.delete(`http://localhost:8000/admin/integracoes/${config.id}`);
    feedback.value = { success: true, message: 'Integração excluída com sucesso!' };
    await fetchConfigs();
  } catch {
    feedback.value = { success: false, message: 'Erro ao excluir integração.' };
  }
}
// Tela de configuração de integrações de preço
// Permite cadastrar, editar e visualizar integrações por loja ou global
// Cores e layout seguem padrão do cliente
import { ref, onMounted } from 'vue'
import axios from 'axios'
const configs = ref([])
const stores = ref([])
const showModal = ref(false)
const editMode = ref(false)
const form = ref({ id: null, loja_id: null, tipo: '', parametro1: '', parametro2: '', ativo: true, layout: null })
const showLayoutModal = ref(false)
const layout = ref({ separador: ';', colunas: 'codigo\ndescricao\npreco', exemplo: '1234;Arroz;10.99' })
const fileInput = ref(null)
const feedback = ref(null)
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
    const resp = await axios.get('http://localhost:8000/admin/integracoes')
    configs.value = (resp.data || []).map((c, idx) => ({ ...c, id: c.id || idx }))
  } catch {
    configs.value = []
  }
}
async function fetchStores() {
  try {
    const resp = await axios.get('http://localhost:8000/admin/stores')
    stores.value = resp.data || []
  } catch {
    stores.value = []
  }
}
function openAddModal() {
  form.value = { id: null, loja_id: null, tipo: '', parametro1: '', parametro2: '', ativo: true, layout: null }
  editMode.value = false
  showModal.value = true
}

function editConfig(config) {
  form.value = { ...config }
  editMode.value = true
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveConfig() {
  feedback.value = null
  try {
    const payload = { ...form.value }
    if (payload.loja_id === null || payload.loja_id === 'null') payload.loja_id = null
    payload.ativo = payload.ativo ? 1 : 0
    await axios.post('http://localhost:8000/admin/integracoes', payload)
    feedback.value = { success: true, message: 'Integração salva com sucesso!' }
    showModal.value = false
    await fetchConfigs()
  } catch (e) {
    feedback.value = { success: false, message: 'Erro ao salvar integração.' }
  }
}

onMounted(() => {
  fetchConfigs()
  fetchStores()
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
.integration-header-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.add-btn { background: #ff6600; color: #fff; border: none; border-radius: 6px; padding: 8px 14px; font-weight: 700; font-size: 0.98em; cursor: pointer; }
.add-btn:hover {
  background: #e65100;
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
.integration-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
.integration-table th, .integration-table td { border: 1px solid #e0e0e0; padding: 8px; text-align: left; }
.integration-table th {
  background: #ffe0b2;
  color: #ff6600;
}
button {
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  margin: 2px;
  cursor: pointer;
}
button:hover {
  background: #e65100;
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
</style>
