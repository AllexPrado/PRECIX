<template>
  <div class="store-manager-bg">
    <div class="store-manager-card">
      <header>
        <h2>Gerenciar Lojas</h2>
        <button @click="$router.back()">&larr; Voltar</button>
      </header>
      <form @submit.prevent="addStore" class="add-store-form">
        <input v-model="newCodigo" placeholder="Código da loja" required class="form-input-code" />
        <input v-model="newStore" placeholder="Nome da loja" required class="form-input-name" />
        <button type="submit" class="form-btn-add">Adicionar Loja</button>
      </form>
      <div v-if="stores.length === 0" class="empty-state">Nenhuma loja cadastrada.</div>
      <ul class="store-list">
        <li v-for="store in stores" :key="store.id" class="store-item">
          <input v-model="store.codigo" @blur="updateStore(store)" placeholder="Código" class="input-code" />
          <input v-model="store.name" @blur="updateStore(store)" placeholder="Nome" class="input-name" />
          <select v-model="store.status" @change="updateStore(store)" class="select-status">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <button @click="deleteStore(store.id)" class="btn-delete">Excluir</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../apiBase.js'
const stores = ref([])
const newStore = ref('')
const newCodigo = ref('')

async function fetchStores() {
  try {
  const res = await fetch(api('/admin/stores'))
    const data = await res.json()
    if (Array.isArray(data)) {
      stores.value = data
    } else {
      stores.value = []
    }
  } catch (e) {
    stores.value = []
  }
}

async function addStore() {
  if (!newStore.value.trim() || !newCodigo.value.trim()) return
  await fetch(api('/admin/stores'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: newCodigo.value, name: newStore.value })
  })
  newStore.value = ''
  newCodigo.value = ''
  await fetchStores()
}

async function updateStore(store) {
  await fetch(api(`/admin/stores/${store.id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: store.codigo, name: store.name, status: store.status })
  })
  await fetchStores()
}

async function deleteStore(id) {
  await fetch(api(`/admin/stores/${id}`), { method: 'DELETE' })
  await fetchStores()
}

onMounted(fetchStores)
</script>

<style scoped>
.store-manager-bg {
  min-height: 100vh;
  background: #fff3e0; /* Cor de fundo original restaurada */
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.store-manager-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 6px 24px #ff66001a; /* Sombra original */
  padding: 24px;
  width: 100%;
  max-width: 900px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

header h2 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
}

.add-store-form {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
}

.add-store-form input,
.store-item input,
.store-item select {
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #FF6600; /* Borda laranja original */
  transition: border-color 0.2s;
  background: #fff;
}

.add-store-form input:focus,
.store-item input:focus,
.store-item select:focus {
  outline: none;
  border-color: #e65c00;
}

.form-btn-add, header button {
  background: #FF6600; /* Cor laranja original */
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.form-btn-add:hover, header button:hover {
  background: #e65c00;
}

.empty-state {
  color: #888;
  text-align: center;
  padding: 40px 0;
  background: #fafafa;
  border-radius: 8px;
}

.store-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.store-item {
  display: grid;
  grid-template-columns: 100px 1fr 110px 100px;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #fdfaf6;
  border: 1px solid #fdeee0;
}

.btn-delete {
  background-color: #fbe9e7;
  color: #c62828;
  border: none;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  transition: background-color 0.2s;
  height: 100%;
}

.btn-delete:hover {
  background-color: #ffcdd2;
}

/* --- Responsive Design --- */

@media (max-width: 768px) {
  .add-store-form {
    grid-template-columns: 1fr; /* Stack form inputs */
  }

  .store-item {
    grid-template-columns: 1fr 1fr; /* Two columns for items */
    grid-template-areas:
      "code name"
      "status actions";
    gap: 10px;
  }

  .input-code { grid-area: code; }
  .input-name { grid-area: name; }
  .select-status { grid-area: status; }
  .btn-delete { grid-area: actions; }
}

@media (max-width: 480px) {
  .store-manager-card {
    padding: 16px;
  }
  
  header {
    margin-bottom: 16px;
  }

  .store-item {
    grid-template-columns: 1fr; /* Single column on very small screens */
    grid-template-areas:
      "code"
      "name"
      "status"
      "actions";
  }
}
</style>
