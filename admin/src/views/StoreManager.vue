<template>
  <div class="store-manager-bg">
    <div class="store-manager-card">
      <header>
        <h2>Gerenciar Lojas</h2>
        <button @click="$router.back()">&larr; Voltar</button>
      </header>
      <form @submit.prevent="addStore" class="store-form-flex">
        <input v-model="newCodigo" placeholder="Código da loja" required style="max-width:90px" />
        <input v-model="newStore" placeholder="Nome da loja" required />
        <button type="submit">Adicionar Loja</button>
      </form>
      <div v-if="stores.length === 0" class="empty">Nenhuma loja cadastrada.</div>
      <ul>
        <li v-for="store in stores" :key="store.id">
          <input v-model="store.codigo" @blur="updateStore(store)" placeholder="Código" style="max-width:90px" />
          <input v-model="store.name" @blur="updateStore(store)" placeholder="Nome" />
          <select v-model="store.status" @change="updateStore(store)">
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <button @click="deleteStore(store.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const stores = ref([])
const newStore = ref('')
const newCodigo = ref('')

async function fetchStores() {
  try {
    const res = await fetch('http://localhost:8000/admin/stores')
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
  await fetch('http://localhost:8000/admin/stores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: newCodigo.value, name: newStore.value })
  })
  newStore.value = ''
  newCodigo.value = ''
  await fetchStores()
}

async function updateStore(store) {
  await fetch(`http://localhost:8000/admin/stores/${store.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: store.codigo, name: store.name, status: store.status })
  })
  await fetchStores()
}

async function deleteStore(id) {
  await fetch(`http://localhost:8000/admin/stores/${id}`, { method: 'DELETE' })
  await fetchStores()
}

onMounted(fetchStores)
</script>

<style scoped>
.store-form-flex {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}
.store-manager-bg {
  min-height: 100vh;
  background: #fff3e0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.store-manager-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #ff66001a;
  padding: 36px 28px;
  min-width: 340px;
  max-width: 480px;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
form {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}
input {
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
}
li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
select {
  border-radius: 8px;
  border: 2px solid #FF6600;
  padding: 4px 8px;
}
</style>
