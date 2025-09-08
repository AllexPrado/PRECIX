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
                <button type="button" class="btn btn-test" :disabled="savingConfig || !form.parametro1" @click="previewFile">
                  <i class="pi pi-eye"></i>
                  Preview
                </button>
              </div>
              <small class="form-hint">Exemplo: <code>pricetab.txt</code> ou <code>/caminho/arquivo.csv</code></small>
            </div>

            <!-- Configuração de Layout para Arquivo -->
            <div v-if="form.tipo === 'arquivo'" class="form-section">
              <h4 class="section-title">Configuração de Layout</h4>
              
              <div class="form-row">
                <label>Separador de Campos</label>
                <select v-model="layoutConfig.separador" class="form-select" :disabled="savingConfig">
                  <option value=";">Ponto e vírgula (;)</option>
                  <option value=",">Vírgula (,)</option>
                  <option value="|">Pipe (|)</option>
                  <option value="	">Tab</option>
                </select>
              </div>

              <div class="form-row">
                <label>Encoding do Arquivo</label>
                <select v-model="layoutConfig.encoding" class="form-select" :disabled="savingConfig">
                  <option value="utf-8">UTF-8</option>
                  <option value="iso-8859-1">ISO-8859-1 (Latin-1)</option>
                  <option value="windows-1252">Windows-1252</option>
                </select>
              </div>

              <div class="form-row form-checkbox">
                <label class="checkbox-label">
                  <input v-model="layoutConfig.temCabecalho" type="checkbox" :disabled="savingConfig" />
                  Arquivo possui linha de cabeçalho
                </label>
              </div>

              <div class="form-row">
                <label>Mapeamento de Campos</label>
                <div class="mapping-grid">
                  <div class="mapping-row">
                    <span class="mapping-label">Código do Produto:</span>
                    <input v-model="layoutConfig.mapeamento.codigo" type="text" class="form-input-small" 
                           placeholder="ex: barcode, codigo" :disabled="savingConfig" />
                  </div>
                  <div class="mapping-row">
                    <span class="mapping-label">Descrição:</span>
                    <input v-model="layoutConfig.mapeamento.descricao" type="text" class="form-input-small" 
                           placeholder="ex: name, descricao" :disabled="savingConfig" />
                  </div>
                  <div class="mapping-row">
                    <span class="mapping-label">Preço:</span>
                    <input v-model="layoutConfig.mapeamento.preco" type="text" class="form-input-small" 
                           placeholder="ex: price, preco" :disabled="savingConfig" />
                  </div>
                </div>
                <small class="form-hint">Informe o nome da coluna ou índice (0, 1, 2...) para cada campo</small>
              </div>
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
                <button type="button" class="btn btn-test" :disabled="savingConfig || !form.parametro1" @click="previewApi">
                  <i class="pi pi-eye"></i>
                  Preview
                </button>
              </div>
              <small class="form-hint">Suporte a Bearer token em Parâmetro 2. Resposta JSON deve conter lista de produtos.</small>
            </div>

            <!-- Configuração Avançada para API -->
            <div v-if="form.tipo === 'api'" class="form-section">
              <h4 class="section-title">Configuração Avançada da API</h4>
              
              <div class="form-row">
                <label>Método HTTP</label>
                <select v-model="layoutConfig.metodo" class="form-select" :disabled="savingConfig">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
              </div>

              <div class="form-row">
                <label>Tipo de Autenticação</label>
                <select v-model="layoutConfig.authType" class="form-select" :disabled="savingConfig">
                  <option value="">Nenhuma</option>
                  <option value="bearer">Bearer Token</option>
                  <option value="basic">Basic Auth</option>
                  <option value="apikey">API Key</option>
                </select>
              </div>

              <div v-if="layoutConfig.authType === 'apikey'" class="form-row">
                <label>Nome do Header da API Key</label>
                <input v-model="layoutConfig.apiKeyHeader" type="text" class="form-input" 
                       placeholder="ex: X-API-Key, Authorization" :disabled="savingConfig" />
              </div>

              <div class="form-row">
                <label>Mapeamento de Campos JSON</label>
                <div class="mapping-grid">
                  <div class="mapping-row">
                    <span class="mapping-label">Código do Produto:</span>
                    <input v-model="layoutConfig.mapeamento.codigo" type="text" class="form-input-small" 
                           placeholder="ex: barcode, id, sku" :disabled="savingConfig" />
                  </div>
                  <div class="mapping-row">
                    <span class="mapping-label">Descrição:</span>
                    <input v-model="layoutConfig.mapeamento.descricao" type="text" class="form-input-small" 
                           placeholder="ex: name, description, title" :disabled="savingConfig" />
                  </div>
                  <div class="mapping-row">
                    <span class="mapping-label">Preço:</span>
                    <input v-model="layoutConfig.mapeamento.preco" type="text" class="form-input-small" 
                           placeholder="ex: price, value, cost" :disabled="savingConfig" />
                  </div>
                </div>
                <small class="form-hint">Informe o nome do campo JSON para cada informação</small>
              </div>

              <div class="form-row form-checkbox">
                <label class="checkbox-label">
                  <input v-model="layoutConfig.paginacao" type="checkbox" :disabled="savingConfig" />
                  API utiliza paginação
                </label>
              </div>

              <div v-if="layoutConfig.paginacao" class="form-row">
                <label>Parâmetro de Paginação</label>
                <input v-model="layoutConfig.paginacaoParam" type="text" class="form-input" 
                       placeholder="ex: page, offset, cursor" :disabled="savingConfig" />
              </div>
            </div>

            <div v-else-if="form.tipo === 'banco'" class="form-row">
              <label>String de Conexão</label>
              <div class="form-group">
                <input v-model="form.parametro1" type="text" class="form-input" 
                       placeholder="Ex: postgresql://user:pass@host:port/db" 
                       :disabled="savingConfig" required />
                <button type="button" class="btn btn-test" :disabled="savingConfig || !form.parametro1" @click="testDatabase">
                  <i class="pi pi-database"></i>
                  Testar Conexão
                </button>
              </div>
              <small class="form-hint">Suporte a PostgreSQL, MySQL, SQLite. Query SQL em Parâmetro 2.</small>
            </div>

            <!-- Configuração para Banco de Dados -->
            <div v-if="form.tipo === 'banco'" class="form-section">
              <h4 class="section-title">Configuração do Banco de Dados</h4>
              
              <div class="form-row">
                <label>Tipo de Banco</label>
                <select v-model="layoutConfig.dbType" class="form-select" :disabled="savingConfig">
                  <option value="postgresql">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="sqlite">SQLite</option>
                  <option value="sqlserver">SQL Server</option>
                </select>
              </div>

              <div class="form-row">
                <label>Query SQL</label>
                <textarea v-model="layoutConfig.query" class="form-textarea" 
                          placeholder="SELECT codigo, descricao, preco FROM produtos WHERE ativo = 1" 
                          rows="4" :disabled="savingConfig"></textarea>
                <small class="form-hint">Query deve retornar as colunas mapeadas abaixo</small>
              </div>

              <div class="form-row">
                <label>Mapeamento de Colunas</label>
                <div class="mapping-grid">
                  <div class="mapping-row">
                    <span class="mapping-label">Código do Produto:</span>
                    <input v-model="layoutConfig.mapeamento.codigo" type="text" class="form-input-small" 
                           placeholder="ex: codigo, barcode, sku" :disabled="savingConfig" />
                  </div>
                  <div class="mapping-row">
                    <span class="mapping-label">Descrição:</span>
                    <input v-model="layoutConfig.mapeamento.descricao" type="text" class="form-input-small" 
                           placeholder="ex: descricao, nome, title" :disabled="savingConfig" />
                  </div>
                  <div class="mapping-row">
                    <span class="mapping-label">Preço:</span>
                    <input v-model="layoutConfig.mapeamento.preco" type="text" class="form-input-small" 
                           placeholder="ex: preco, valor, price" :disabled="savingConfig" />
                  </div>
                </div>
                <small class="form-hint">Informe o nome da coluna retornada pela query</small>
              </div>
            </div>

            <div class="form-row">
              <label>Parâmetro 2</label>
              <input v-model="form.parametro2" type="text" class="form-input" 
                     placeholder="Ex: token, diretório, etc" 
                     :disabled="savingConfig" />
            </div>

            <!-- Seção de Agendamento -->
            <div class="form-section">
              <h4 class="section-title">Agendamento Automático</h4>
              
              <div class="form-row form-checkbox">
                <label class="checkbox-label">
                  <input v-model="layoutConfig.agendado" type="checkbox" :disabled="savingConfig" />
                  Executar importação automaticamente
                </label>
              </div>

              <div v-if="layoutConfig.agendado" class="scheduling-grid">
                <div class="form-row">
                  <label>Frequência</label>
                  <select v-model="layoutConfig.frequencia" class="form-select" :disabled="savingConfig">
                    <option value="manual">Manual</option>
                    <option value="horario">A cada hora</option>
                    <option value="diario">Diário</option>
                    <option value="semanal">Semanal</option>
                  </select>
                </div>

                <div v-if="layoutConfig.frequencia === 'diario'" class="form-row">
                  <label>Horário</label>
                  <input v-model="layoutConfig.horario" type="time" class="form-input" :disabled="savingConfig" />
                </div>

                <div v-if="layoutConfig.frequencia === 'semanal'" class="form-row">
                  <label>Dia da Semana</label>
                  <select v-model="layoutConfig.diaSemana" class="form-select" :disabled="savingConfig">
                    <option value="1">Segunda-feira</option>
                    <option value="2">Terça-feira</option>
                    <option value="3">Quarta-feira</option>
                    <option value="4">Quinta-feira</option>
                    <option value="5">Sexta-feira</option>
                    <option value="6">Sábado</option>
                    <option value="0">Domingo</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Seção de Backup e Segurança -->
            <div class="form-section">
              <h4 class="section-title">Backup e Segurança</h4>
              
              <div class="form-row form-checkbox">
                <label class="checkbox-label">
                  <input v-model="layoutConfig.backupAntes" type="checkbox" :disabled="savingConfig" />
                  Criar backup antes da importação
                </label>
              </div>

              <div class="form-row form-checkbox">
                <label class="checkbox-label">
                  <input v-model="layoutConfig.validarAntes" type="checkbox" :disabled="savingConfig" />
                  Validar dados antes de importar
                </label>
              </div>

              <div class="form-row form-checkbox">
                <label class="checkbox-label">
                  <input v-model="layoutConfig.logDetalhado" type="checkbox" :disabled="savingConfig" />
                  Log detalhado de importação
                </label>
              </div>
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

      <!-- Modal de Preview de Dados -->
      <div v-if="showPreviewModal" class="modal-backdrop" @click.self="closePreviewModal">
        <div class="modal modal-large">
          <div class="modal-header">
            <h3 class="modal-title">Preview dos Dados</h3>
            <button type="button" class="btn btn-cancel" @click="closePreviewModal">✕</button>
          </div>

          <div class="modal-body">
            <div v-if="previewLoading" class="preview-loading">
              <i class="pi pi-spin pi-spinner"></i>
              Carregando preview...
            </div>

            <div v-else-if="previewData.length" class="preview-content">
              <div class="preview-summary">
                <div class="summary-card">
                  <span class="summary-number">
                    {{ previewHitSafetyLimit ? '≥ ' : '' }}{{ previewStats.total || previewData.length }}
                  </span>
                  <span class="summary-label">
                    {{ previewHitSafetyLimit ? 'Total estimado na API' : 'Total encontrado na API' }}
                  </span>
                </div>
                <div class="summary-card">
                  <span class="summary-number">{{ previewData.length }}</span>
                  <span class="summary-label">Amostra no preview</span>
                </div>
                <div class="summary-card">
                  <span class="summary-number">{{ validRecords }}</span>
                  <span class="summary-label">Válidos na amostra</span>
                </div>
                <div class="summary-card">
                  <span class="summary-number">{{ previewStats.problemas ?? (previewData.length - validRecords) }}</span>
                  <span class="summary-label">Com problemas na amostra</span>
                </div>
              </div>
              
              <!-- Nota explicativa sobre cobertura -->
              <div v-if="previewStats.total && previewStats.total > previewData.length" class="preview-coverage">
                <i class="pi pi-info-circle"></i>
                <span>Visualizando {{ previewData.length }} de {{ previewHitSafetyLimit ? 'pelo menos ' : '' }}{{ previewStats.total }} registros 
                  ({{ Math.round((previewData.length / previewStats.total) * 100) }}% {{ previewHitSafetyLimit ? 'ou menos ' : '' }}da base)</span>
              </div>
              
              <!-- Aviso sobre limite de segurança -->
              <div v-if="previewHitSafetyLimit" class="preview-safety-warning">
                <i class="pi pi-exclamation-triangle"></i>
                <span><strong>Atenção:</strong> O total exato pode ser maior. A visualização foi limitada pelo limite de segurança do preview para preservar a performance.</span>
              </div>

              <div class="preview-table">
                <!-- Título da amostra -->
                <div class="preview-table-header">
                  <h4>Amostra dos dados (primeiros {{ Math.min(previewData.length, 50) }} registros)</h4>
                </div>
                <table class="data-preview-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Código</th>
                      <th>Descrição</th>
                      <th>Preço</th>
                      <th>Observações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in previewData.slice(0, 50)" :key="index"
                        :class="['preview-row', item.valid ? 'valid' : 'invalid']">
                      <td>
                        <span :class="['status-icon', item.valid ? 'valid' : 'invalid']">
                          <i :class="item.valid ? 'pi pi-check' : 'pi pi-times'"></i>
                        </span>
                      </td>
                      <td>{{ item.codigo || '-' }}</td>
                      <td>{{ item.descricao || '-' }}</td>
                      <td>{{ formatPrice(item.preco) }}</td>
                      <td class="observations">{{ item.errors?.join(', ') || 'OK' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="previewData.length > 50" class="preview-pagination">
                <small>Mostrando apenas os primeiros 50 registros da amostra de {{ previewData.length }}</small>
              </div>
              
              <!-- Nota explicativa sobre o preview -->
              <div class="preview-disclaimer">
                <i class="pi pi-info-circle"></i>
                <p><strong>Importante:</strong> Este preview mostra apenas uma amostra dos dados para preservar a performance. 
                A validação completa e importação será feita em {{ previewHitSafetyLimit ? 'pelo menos ' : 'todos os ' }}{{ previewStats.total || previewData.length }} registros encontrados na API.</p>
              </div>
            </div>

            <div v-else-if="previewError" class="preview-error">
              <i class="pi pi-exclamation-triangle"></i>
              <p>{{ previewError }}</p>
            </div>

            <div v-else class="preview-empty">
              <i class="pi pi-info-circle"></i>
              <p>Nenhum dado encontrado para preview</p>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-cancel" @click="closePreviewModal">
              Fechar
            </button>
            <button v-if="previewData.length && validRecords > 0" 
                    type="button" class="btn btn-save" @click="proceedWithImport"
                    :title="`Importar ${previewHitSafetyLimit ? 'pelo menos ' : 'todos os '}${previewStats.total || previewData.length} registros encontrados na API`">
              <i class="pi pi-upload"></i>
              Importar {{ previewHitSafetyLimit ? 'pelo menos ' : 'todos os ' }}{{ previewStats.total || previewData.length }} registros
            </button>
          </div>
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

// Preview de dados
const showPreviewModal = ref(false)
const previewData = ref([])
const previewStats = ref({ total: 0, validos: 0, problemas: 0 })
const previewLoading = ref(false)
const previewError = ref(null)
const previewHitSafetyLimit = ref(false) // Flag para indicar se atingiu limite de segurança

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

// Configuração de layout expandida
const layoutConfig = ref({
  // Para arquivos
  separador: ';',
  encoding: 'utf-8',
  temCabecalho: true,
  
  // Para APIs
  metodo: 'GET',
  authType: '',
  apiKeyHeader: 'X-API-Key',
  // Paginação/Preview
  paginacao: false,
  paginacaoParam: 'page',
  limiteParam: 'limit',
  tamanhoPagina: 100,
  limitePreview: 500,
  limiteSeguranca: 10000,
  
  // Para banco
  dbType: 'postgresql',
  query: '',
  
  // Mapeamento comum
  mapeamento: {
    codigo: 'codigo',
    descricao: 'descricao', 
    preco: 'preco'
  },
  
  // Agendamento
  agendado: false,
  frequencia: 'manual',
  horario: '02:00',
  diaSemana: '1',
  
  // Backup e segurança
  backupAntes: true,
  validarAntes: true,
  logDetalhado: false
})

// Computed
const totalPages = computed(() => Math.ceil(configs.value.length / itemsPerPage.value))
const paginatedConfigs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return configs.value.slice(start, end)
})

const validRecords = computed(() => {
  return previewData.value.filter(item => item.valid).length
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
  resetLayoutConfig()
  showModal.value = true
}

function resetLayoutConfig() {
  layoutConfig.value = {
    separador: ';',
    encoding: 'utf-8',
    temCabecalho: true,
  metodo: 'GET',
  authType: '',
  apiKeyHeader: 'X-API-Key',
  paginacao: false,
  paginacaoParam: 'page',
  limiteParam: 'limit',
  tamanhoPagina: 100,
  limitePreview: 500,
  limiteSeguranca: 10000,
    dbType: 'postgresql',
    query: '',
    mapeamento: {
      codigo: 'codigo',
      descricao: 'descricao', 
      preco: 'preco'
    },
    agendado: false,
    frequencia: 'manual',
    horario: '02:00',
    diaSemana: '1',
    backupAntes: true,
    validarAntes: true,
    logDetalhado: false
  }
}

function closeModal() {
  showModal.value = false
  feedback.value = null
}

function closePreviewModal() {
  showPreviewModal.value = false
  previewData.value = []
  previewError.value = null
  previewHitSafetyLimit.value = false
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
  
  // Carregar layout se existir
  try {
    if (config.layout) {
      const layout = JSON.parse(config.layout)
      Object.assign(layoutConfig.value, layout)
    } else {
      resetLayoutConfig()
    }
  } catch {
    resetLayoutConfig()
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
  if (!id || id === '' || id === null || id === undefined) {
    return 'Global'
  }
  
  console.log('getStoreName - Buscando loja com ID:', id, 'tipo:', typeof id)
  console.log('getStoreName - Lojas disponíveis:', stores.value.length)
  
  // Converter ID para string para comparação
  const searchId = String(id)
  
  // Buscar por ID (comparação flexível)
  let store = stores.value.find(s => String(s.id) === searchId)
  
  // Se não encontrou por ID, tentar por código
  if (!store) {
    store = stores.value.find(s => String(s.codigo) === searchId)
  }
  
  if (store) {
    const result = `${store.codigo} - ${store.nome}`
    console.log('getStoreName - Loja encontrada:', result)
    return result
  } else {
    const fallback = `Loja ${id}`
    console.log('getStoreName - Loja não encontrada, usando fallback:', fallback)
    return fallback
  }
}

function formatPrice(price) {
  if (!price) return '-'
  const num = parseFloat(price)
  if (isNaN(num)) return price
  return `R$ ${num.toFixed(2).replace('.', ',')}`
}

// Funções de preview e validação
async function previewFile() {
  if (!form.value.parametro1) return
  
  previewLoading.value = true
  previewError.value = null
  showPreviewModal.value = true
  
  try {
    console.log('previewFile - iniciando preview do arquivo:', form.value.parametro1)
    
    // Verificar se o arquivo existe e é acessível
    const response = await axios.post(api('/admin/integracoes/preview-arquivo'), {
      caminho: form.value.parametro1,
      layout: layoutConfig.value,
      loja_id: form.value.loja_id
    }, {
      timeout: 30000, // 30 segundos timeout
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('previewFile - resposta recebida:', response.data)
    
    if (response.data && response.data.success !== false) {
      const dados = response.data.dados || response.data.data || response.data
      
      if (Array.isArray(dados) && dados.length > 0) {
        previewData.value = dados.map(item => ({
          ...item,
          preco_formatado: formatPrice(item.preco || item.price || item.valor)
        }))
        
        previewStats.value = {
          total: dados.length,
          validos: dados.filter(item => 
            (item.codigo || item.barcode || item.id) && 
            (item.preco || item.price || item.valor)
          ).length,
          problemas: dados.filter(item => 
            !(item.codigo || item.barcode || item.id) || 
            !(item.preco || item.price || item.valor)
          ).length
        }
        
        console.log('previewFile - dados processados:', previewStats.value)
      } else {
        throw new Error('Nenhum dado encontrado no arquivo ou formato inválido')
      }
    } else {
      throw new Error(response.data.message || 'Erro ao processar arquivo')
    }
    
  } catch (error) {
    console.error('previewFile - erro:', error)
    
    let errorMessage = 'Erro ao carregar preview do arquivo'
    
    if (error.response) {
      // Erro do servidor
      if (error.response.status === 404) {
        errorMessage = 'Arquivo não encontrado. Verifique se o caminho está correto e se o arquivo existe.'
      } else if (error.response.status === 403) {
        errorMessage = 'Sem permissão para acessar o arquivo. Verifique as permissões.'
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      } else {
        errorMessage = `Erro do servidor (${error.response.status}): ${error.response.statusText}`
      }
    } else if (error.request) {
      // Erro de rede
      errorMessage = 'Erro de conexão. Verifique sua conexão com o servidor.'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    previewError.value = errorMessage
    previewData.value = []
    previewStats.value = { total: 0, validos: 0, problemas: 0 }
  } finally {
    previewLoading.value = false
  }
}

async function previewApi() {
  if (!form.value.parametro1) return
  
  previewLoading.value = true
  previewError.value = null
  showPreviewModal.value = true
  
  try {
    console.log('Preview API - Iniciando preview da API:', form.value.parametro1)
    
  let allData = []
  let currentPage = 1
  let hasMoreData = true
    
    // Se a API usa paginação, buscar todas as páginas
    // usar "paginacao" como flag canônica
    if (layoutConfig.value.paginacao === true || layoutConfig.value.usePagination === true) {
      console.log('Preview API - API usa paginação, buscando todas as páginas...')
      
      const pageSize = Number(layoutConfig.value.tamanhoPagina) || 100
      const safetyCap = Number(layoutConfig.value.limiteSeguranca) || 10000
      while (hasMoreData && allData.length < safetyCap) { // Limite de segurança
        const data = await fetchApiPage(currentPage)
        
        if (data && data.length > 0) {
          allData = allData.concat(data)
          currentPage++
          console.log(`Preview API - Página ${currentPage - 1}: ${data.length} registros, total: ${allData.length}`)
          
          // Se retornou menos registros que o esperado, provavelmente é a última página
          if (data.length < pageSize) {
            hasMoreData = false
          }
        } else {
          hasMoreData = false
        }
      }
      
      // Verificar se atingiu o limite de segurança
      if (allData.length >= safetyCap && hasMoreData) {
        previewHitSafetyLimit.value = true
        console.log('Preview API - Atingiu limite de segurança, pode haver mais registros')
      }
    } else {
      // API sem paginação, buscar tudo de uma vez
      console.log('Preview API - API sem paginação, buscando dados...')
      allData = await fetchApiPage(1)
    }
    
    console.log(`Preview API - Total de registros encontrados: ${allData.length}`)
    
  // Processar dados com mapeamento (limitando o preview para performance)
  const previewCap = Number(layoutConfig.value.limitePreview) || 500
  const previewLimit = Math.min(allData.length, previewCap)
    previewData.value = allData.slice(0, previewLimit).map((item, index) => {
      const mapped = mapApiData(item)
      return {
        ...mapped,
        preco_formatado: formatPrice(mapped.preco),
        valid: validateRecord(mapped),
        errors: getRecordErrors(mapped)
      }
    })
    
    // Calcular estatísticas
    previewStats.value = {
      total: allData.length,
      validos: previewData.value.filter(item => item.valid).length,
      problemas: previewData.value.filter(item => !item.valid).length
    }
    
    console.log('Preview API - Estatísticas:', previewStats.value)
    console.log('Preview API - Primeiros 3 registros processados:', previewData.value.slice(0, 3))
    
    if (allData.length > previewLimit) {
      feedback.value = { 
        success: true, 
        message: `Encontrados ${allData.length} registros. Mostrando os primeiros ${previewLimit} no preview.` 
      }
    }
    
  } catch (error) {
    console.error('Preview API Error:', error)
    let errorMessage = 'Erro ao carregar preview da API'
    
    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = 'Endpoint não encontrado (404). Verifique se a URL está correta.'
      } else if (error.response.status === 401) {
        errorMessage = 'Não autorizado (401). Verifique suas credenciais de autenticação.'
      } else if (error.response.status === 403) {
        errorMessage = 'Acesso negado (403). Você não tem permissão para acessar este endpoint.'
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      } else {
        errorMessage = `Erro do servidor (${error.response.status}): ${error.response.statusText}`
      }
    } else if (error.message) {
      errorMessage = error.message
    }
    
    previewError.value = errorMessage
    previewData.value = []
    previewStats.value = { total: 0, validos: 0, problemas: 0 }
  } finally {
    previewLoading.value = false
  }
}

async function fetchApiPage(page = 1) {
  const headers = {}
  
  // Configurar autenticação
  if (form.value.parametro2) {
    if (layoutConfig.value.authType === 'bearer' || !layoutConfig.value.authType) {
      headers.Authorization = `Bearer ${form.value.parametro2}`
    } else if (layoutConfig.value.authType === 'apikey') {
      headers[layoutConfig.value.apiKeyHeader || 'X-API-Key'] = form.value.parametro2
    } else if (layoutConfig.value.authType === 'basic') {
      headers.Authorization = `Basic ${btoa(form.value.parametro2)}`
    }
  }
  
  // Construir URL com parâmetros de paginação se necessário
  let url = form.value.parametro1
  const pageParam = layoutConfig.value.paginacaoParam || 'page'
  const limitParam = layoutConfig.value.limiteParam || 'limit'
  const pageSize = Number(layoutConfig.value.tamanhoPagina) || 100
  // Se a API usa paginação, sempre incluir página e limite (até na página 1)
  if (layoutConfig.value.paginacao === true || layoutConfig.value.usePagination === true) {
    const separator = url.includes('?') ? '&' : '?'
    const pageValue = page || 1
    url += `${separator}${pageParam}=${pageValue}&${limitParam}=${pageSize}`
  }
  
  console.log(`fetchApiPage - Buscando página ${page}:`, url)
  
  const response = await axios({
    method: layoutConfig.value.metodo || 'GET',
    url: url,
    headers: headers,
    timeout: 30000 // 30 segundos
  })
  
  let data = response.data
  console.log(`fetchApiPage - Resposta da página ${page}:`, data)
  
  // Extrair array de dados da resposta
  if (!Array.isArray(data)) {
    if (data.data && Array.isArray(data.data)) {
      data = data.data
    } else if (data.items && Array.isArray(data.items)) {
      data = data.items
    } else if (data.results && Array.isArray(data.results)) {
      data = data.results
    } else if (data.products && Array.isArray(data.products)) {
      data = data.products
    } else if (data.content && Array.isArray(data.content)) {
      data = data.content
    } else if (typeof data === 'object' && Object.keys(data).length > 0) {
      // Se não é array mas é objeto, tenta pegar o primeiro array encontrado
      const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]))
      if (arrayKey) {
        data = data[arrayKey]
      } else {
        // Último recurso: transformar objeto em array
        data = [data]
      }
    } else {
      data = []
    }
  }
  
  return data
}

async function testDatabase() {
  if (!form.value.parametro1) return
  
  try {
    const response = await axios.post(api('/admin/integracoes/testar-banco'), {
      connectionString: form.value.parametro1,
      dbType: layoutConfig.value.dbType,
      query: layoutConfig.value.query || 'SELECT 1 as test'
    })
    
    if (response.data.success) {
      feedback.value = { success: true, message: 'Conexão testada com sucesso!' }
    } else {
      feedback.value = { success: false, message: response.data.message }
    }
  } catch (error) {
    feedback.value = { success: false, message: 'Erro ao testar conexão: ' + (error.response?.data?.message || error.message) }
  }
}

function mapApiData(item) {
  const mapping = layoutConfig.value.mapeamento
  
  // Se o mapeamento não foi configurado, tentar mapear automaticamente
  const defaultMapping = {
    codigo: mapping.codigo || 'codigo' || 'barcode' || 'id' || 'sku',
    descricao: mapping.descricao || 'descricao' || 'name' || 'description' || 'title',
    preco: mapping.preco || 'preco' || 'price' || 'valor' || 'value'
  }
  
  const result = {
    codigo: getNestedValue(item, defaultMapping.codigo) || 
            getNestedValue(item, 'barcode') ||
            getNestedValue(item, 'id') ||
            getNestedValue(item, 'sku') ||
            getNestedValue(item, 'codigo'),
            
    descricao: getNestedValue(item, defaultMapping.descricao) ||
               getNestedValue(item, 'name') ||
               getNestedValue(item, 'description') ||
               getNestedValue(item, 'title') ||
               getNestedValue(item, 'descricao'),
               
    preco: getNestedValue(item, defaultMapping.preco) ||
           getNestedValue(item, 'price') ||
           getNestedValue(item, 'valor') ||
           getNestedValue(item, 'value') ||
           getNestedValue(item, 'preco')
  }
  
  console.log('mapApiData - mapping:', defaultMapping)
  console.log('mapApiData - item:', item)
  console.log('mapApiData - result:', result)
  
  return result
}

function getNestedValue(obj, path) {
  if (!obj || !path) return null
  
  try {
    // Se path é um número (índice), retorna direto
    if (typeof path === 'number') {
      return obj[path]
    }
    
    // Se path contém ponto, navega através das propriedades
    if (typeof path === 'string' && path.includes('.')) {
      return path.split('.').reduce((current, key) => current?.[key], obj)
    }
    
    // Caso simples: path é uma string direta
    return obj[path]
  } catch {
    return null
  }
}

function validateRecord(record) {
  return record.codigo && record.descricao && record.preco && !isNaN(parseFloat(record.preco))
}

function getRecordErrors(record) {
  const errors = []
  if (!record.codigo) errors.push('Código não informado')
  if (!record.descricao) errors.push('Descrição não informada')
  if (!record.preco) errors.push('Preço não informado')
  else if (isNaN(parseFloat(record.preco))) errors.push('Preço inválido')
  return errors
}

async function proceedWithImport() {
  closePreviewModal()
  await importNow()
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
    console.log('fetchStores - Buscando lojas...')
    const resp = await axios.get(api('/admin/stores'))
    stores.value = resp.data || []
    console.log('fetchStores - Lojas carregadas:', stores.value)
  } catch (error) {
    console.error('fetchStores - Erro ao carregar lojas:', error)
    stores.value = []
    
    // Se não conseguir carregar lojas da API, usar lojas simuladas para teste
    stores.value = [
      { id: 1001, codigo: '1001', nome: 'Loja Centro' },
      { id: 1002, codigo: '1002', nome: 'Loja Norte' },
      { id: 1003, codigo: '1003', nome: 'Loja Sul' },
      { id: 1004, codigo: '1004', nome: 'Loja Leste' },
      { id: 1005, codigo: '1005', nome: 'Loja Oeste' },
      { id: 1006, codigo: '1006', nome: 'Loja Shopping' },
      { id: 1007, codigo: '1007', nome: 'Loja Aeroporto' },
      { id: 1008, codigo: '1008', nome: 'Loja Rodoviária' },
      { id: 1009, codigo: '1009', nome: 'Loja Matriz' },
      { id: 1010, codigo: '1010', nome: 'Loja Filial' },
      { id: 1011, codigo: '1011', nome: 'Loja Express' },
      { id: 1012, codigo: '1012', nome: 'Loja Drive' },
      { id: 1013, codigo: '1013', nome: 'Loja 24h' },
      { id: 1014, codigo: '1014', nome: 'Loja Compacta' },
      { id: 1015, codigo: '1015', nome: 'Loja Mega' },
      { id: 1016, codigo: '1016', nome: 'Loja Hiper' },
      { id: 1017, codigo: '1017', nome: 'Loja Mini' }
    ]
    console.log('fetchStores - Usando lojas simuladas para teste')
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
      ativo: form.value.ativo,
      layout: JSON.stringify(layoutConfig.value)
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
  } catch (error) {
    feedback.value = { 
      success: false, 
      message: 'Erro ao salvar integração: ' + (error.response?.data?.message || error.message)
    }
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

onMounted(async () => {
  console.log('IntegrationConfig - Componente montado, carregando dados...')
  
  try {
    // Carregar dados em paralelo
    await Promise.all([
      fetchConfigs(),
      fetchStores(),
      fetchLogs()
    ])
    
    console.log('IntegrationConfig - Dados carregados com sucesso')
    console.log('- Configurações:', configs.value.length)
    console.log('- Lojas:', stores.value.length)
    console.log('- Logs:', logs.value.length)
  } catch (error) {
    console.error('IntegrationConfig - Erro ao carregar dados:', error)
  }
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

.form-section {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #ffe0b2;
}

.section-title {
  color: #ff6600;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 16px;
  background: #ff6600;
  border-radius: 2px;
}

.mapping-grid {
  display: grid;
  gap: 12px;
  background: #fff8e1;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ffd180;
}

.mapping-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mapping-label {
  color: #ff6600;
  font-weight: 600;
  min-width: 140px;
  font-size: 0.9rem;
}

.form-input-small {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ffd180;
  border-radius: 6px;
  background: #fff;
  color: #333;
  font-size: 0.9rem;
}

.form-input-small:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 0 2px #ff660020;
}

.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ffd180;
  border-radius: 6px;
  background: #fff;
  color: #333;
  font-family: monospace;
  font-size: 0.9rem;
  resize: vertical;
  box-sizing: border-box;
}

.form-textarea:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 0 2px #ff660020;
}

.scheduling-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  background: #fff8e1;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ffd180;
}

.modal-large {
  max-width: 900px;
  width: 95vw;
}

.preview-loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.preview-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.summary-card {
  background: #fff8e1;
  border: 1px solid #ffd180;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.summary-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff6600;
  margin-bottom: 4px;
}

.summary-label {
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-table {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ffe0b2;
  border-radius: 8px;
}

.data-preview-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.data-preview-table th {
  background: #fff3e0;
  color: #ff6600;
  font-weight: 700;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ff6600;
  position: sticky;
  top: 0;
  z-index: 1;
}

.data-preview-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #ffe0b2;
  color: #333;
}

.preview-row.valid {
  background: #f8fff8;
}

.preview-row.invalid {
  background: #fff8f8;
}

.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 0.8rem;
}

.status-icon.valid {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-icon.invalid {
  background: #ffebee;
  color: #c62828;
}

.observations {
  font-size: 0.85rem;
  color: #666;
  max-width: 200px;
}

.preview-pagination {
  text-align: center;
  padding: 16px;
  color: #666;
  font-style: italic;
  background: #fff8e1;
  border-top: 1px solid #ffd180;
}

/* Novos estilos para os elementos de clareza */
.preview-coverage {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 6px;
  margin: 16px 0;
  color: #1565c0;
  font-size: 0.9rem;
}

.preview-coverage i {
  color: #1976d2;
  font-size: 1rem;
}

.preview-safety-warning {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fff3e0;
  border: 1px solid #ffcc80;
  border-radius: 6px;
  margin: 8px 0 16px 0;
  color: #e65100;
  font-size: 0.9rem;
}

.preview-safety-warning i {
  color: #ff8f00;
  font-size: 1rem;
}

.preview-safety-warning strong {
  color: #bf360c;
}

.preview-table-header {
  padding: 12px 16px;
  background: #fff3e0;
  border-bottom: 2px solid #ff6600;
  margin-bottom: 0;
}

.preview-table-header h4 {
  margin: 0;
  color: #ff6600;
  font-size: 1rem;
  font-weight: 600;
}

.preview-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #fff8e1;
  border: 1px solid #ffcc80;
  border-radius: 6px;
  margin-top: 16px;
}

.preview-disclaimer i {
  color: #ff8f00;
  font-size: 1.1rem;
  margin-top: 2px;
  flex-shrink: 0;
}

.preview-disclaimer p {
  margin: 0;
  color: #e65100;
  font-size: 0.9rem;
  line-height: 1.4;
}

.preview-disclaimer strong {
  color: #bf360c;
}

.preview-error,
.preview-empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

.preview-error i,
.preview-empty i {
  font-size: 2rem;
  margin-bottom: 12px;
  display: block;
  color: #ff6600;
}

.modal-body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
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
  color: #333;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #ff6600;
  cursor: pointer;
  background: #fff;
  border: 2px solid #ffd180;
  border-radius: 3px;
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

/* Estilos para scrollbar e checkbox */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #fff3e0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #ff6600;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #e55a00;
}

::-webkit-scrollbar-corner {
  background: #fff3e0;
}

/* Estilos específicos para checkboxes */
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #fff !important;
  border: 2px solid #ff6600 !important;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  vertical-align: middle;
}

input[type="checkbox"]:checked {
  background: #ff6600 !important;
  border-color: #ff6600 !important;
}

input[type="checkbox"]:checked::after {
  content: '✓';
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  top: -2px;
  left: 1px;
}

input[type="checkbox"]:hover {
  border-color: #e55a00 !important;
}

input[type="checkbox"]:focus {
  outline: 2px solid #ff660040;
  outline-offset: 2px;
}

/* Modal scrollbar específico */
.modal {
  scrollbar-width: thin;
  scrollbar-color: #ff6600 #fff3e0;
}

.modal::-webkit-scrollbar {
  width: 8px;
}

.modal::-webkit-scrollbar-track {
  background: #fff3e0;
  border-radius: 4px;
}

.modal::-webkit-scrollbar-thumb {
  background: #ff6600;
  border-radius: 4px;
}

/* Preview table scrollbar */
.preview-table::-webkit-scrollbar {
  width: 8px;
}

.preview-table::-webkit-scrollbar-track {
  background: #fff3e0;
  border-radius: 4px;
}

.preview-table::-webkit-scrollbar-thumb {
  background: #ff6600;
  border-radius: 4px;
}

/* Logs scrollbar */
.logs-content::-webkit-scrollbar {
  width: 8px;
}

.logs-content::-webkit-scrollbar-track {
  background: #fff3e0;
  border-radius: 4px;
}

.logs-content::-webkit-scrollbar-thumb {
  background: #ff6600;
  border-radius: 4px;
}
</style>
