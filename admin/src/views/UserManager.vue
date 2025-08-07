<template>
  <div class="user-manager">
    <button class="back-btn" @click="goToDashboard">Voltar ao Painel</button>
    <h2>Gestão de Usuários do Sistema</h2>
    <button class="add-user-btn" @click="showUserModal = true">Novo Usuário</button>
    <!-- Modal de cadastro/edição de usuário -->
    <div v-if="showUserModal" class="dialog">
      <div class="dialog-content">
        <form @submit.prevent="addUser">
          <input v-model="newUsername" placeholder="Novo usuário" required />
          <input v-model="newPassword" type="password" placeholder="Senha" required />
          <select v-model="newRole">
            <option value="admin">Administrador</option>
            <option value="operador">Operador</option>
          </select>
          <select v-model="newStoreId">
            <option value="">Selecione a loja</option>
            <option v-for="store in stores" :key="store.id" :value="store.id">
              {{ store.code ? store.code + ' - ' : '' }}{{ store.name }}
            </option>
          </select>
          <div class="permissoes">
            <label v-for="perm in permissoesDisponiveis" :key="perm.value">
              <input type="checkbox" v-model="newPermissoes" :value="perm.value" /> {{ perm.label }}
            </label>
          </div>
          <div class="modal-btns">
            <button type="submit">Adicionar</button>
            <button type="button" @click="closeUserModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="error" class="error-msg">{{ error }}</div>
    <ul class="user-list">
      <li v-for="user in users" :key="user.username">
        <div class="user-info">
          <span class="user-main">{{ user.username }}</span>
          <span class="user-role">({{ user.role || 'admin' }})</span>
          <span v-if="user.store_id" class="user-store">| Loja: {{ getStoreName(user.store_id) }}</span>
          <span v-if="user.permissoes" class="user-perms">| Permissões: {{ user.permissoes }}</span>
        </div>
        <div class="user-btns">
          <button v-if="userRole === 'admin'" @click="showChangePassword(user.username)">Alterar Senha</button>
          <button v-if="userRole === 'admin'" @click="showChangeRole(user)" :disabled="user.username === 'admin'">Alterar Perfil</button>
          <button v-if="userRole === 'admin'" @click="deleteUser(user.username)" :disabled="user.username === 'admin'">Remover</button>
        </div>
      </li>
    </ul>
    <!-- ...existing dialogs for senha/perfil... -->
    <div v-if="showPasswordDialog" class="dialog">
      <div class="dialog-content">
        <h3>Alterar senha de {{ selectedUser }}</h3>
        <input v-model="newPasswordDialog" type="password" placeholder="Nova senha" />
        <button @click="changePassword">Salvar</button>
        <button @click="showPasswordDialog = false">Cancelar</button>
      </div>
    </div>
    <div v-if="showRoleDialog" class="dialog">
      <div class="dialog-content">
        <h3>Alterar perfil de {{ selectedUserRole.username }}</h3>
        <select v-model="selectedUserRole.role">
          <option value="admin">Administrador</option>
          <option value="operador">Operador</option>
        </select>
        <div class="permissoes" style="margin-top:10px;">
          <label v-for="perm in permissoesDisponiveis" :key="perm.value">
            <input type="checkbox" v-model="selectedUserRolePerms" :value="perm.value" /> {{ perm.label }}
          </label>
        </div>
        <div class="modal-btns">
          <button @click="changeRole">Salvar</button>
          <button @click="showRoleDialog = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authFetch, getUserRole } from '../auth.js'

const router = useRouter()
const users = ref([])
const stores = ref([])
const newUsername = ref('')
const newPassword = ref('')
const newRole = ref('operador')
const newStoreId = ref('')
const newPermissoes = ref([])
const permissoesDisponiveis = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'banners', label: 'Banners' },
  { value: 'equipamentos', label: 'Equipamentos' },
  { value: 'auditoria', label: 'Auditoria' },
  { value: 'central_ia', label: 'Central de IAs' },
  { value: 'usuarios', label: 'Usuários' }
]
const error = ref('')
const showPasswordDialog = ref(false)
const showRoleDialog = ref(false)
const selectedUser = ref('')
const selectedUserRole = ref({ username: '', role: 'operador' })
const newPasswordDialog = ref('')
const userRole = ref(getUserRole())
const showUserModal = ref(false)
const selectedUserRolePerms = ref([])

function goToDashboard() {
  router.push('/dashboard')
}

function getStoreName(storeId) {
  const store = stores.value.find(s => s.id === storeId)
  return store ? store.name : '---'
}

async function fetchStores() {
  try {
    const res = await authFetch('http://localhost:8000/admin/stores')
    const data = await res.json()
    // Aceita tanto {stores: [...]} quanto array simples
    stores.value = Array.isArray(data) ? data : (data.stores || [])
  } catch (e) {
    stores.value = []
  }
}

async function fetchUsers() {
  try {
    const res = await authFetch('http://localhost:8000/admin/users')
    const data = await res.json()
    users.value = data.users
  } catch (e) {
    error.value = 'Erro ao buscar usuários.'
  }
}

onMounted(() => {
  fetchUsers()
  fetchStores()
})

async function addUser() {
  error.value = ''
  try {
    const res = await authFetch('http://localhost:8000/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: newUsername.value,
        password: newPassword.value,
        role: newRole.value,
        store_id: newStoreId.value || null,
        permissoes: JSON.stringify(newPermissoes.value)
      })
    })
    if (res.ok) {
      closeUserModal()
      fetchUsers()
    } else {
      const data = await res.json()
      error.value = data.detail || 'Erro ao adicionar usuário.'
    }
  } catch (e) {
    error.value = 'Erro ao adicionar usuário.'
  }
}

function showChangePassword(user) {
  selectedUser.value = user
  newPasswordDialog.value = ''
  showPasswordDialog.value = true
}

function showChangeRole(user) {
  selectedUserRole.value = { ...user }
  // Permissões podem estar como string JSON ou array
  let perms = []
  if (typeof user.permissoes === 'string') {
    try { perms = JSON.parse(user.permissoes) } catch { perms = [] }
  } else if (Array.isArray(user.permissoes)) {
    perms = user.permissoes
  }
  selectedUserRolePerms.value = perms
  showRoleDialog.value = true
}

async function changePassword() {
  error.value = ''
  try {
    const res = await authFetch(`http://localhost:8000/admin/users/${selectedUser.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPasswordDialog.value })
    })
    if (res.ok) {
      showPasswordDialog.value = false
    } else {
      const data = await res.json()
      error.value = data.detail || 'Erro ao alterar senha.'
    }
  } catch (e) {
    error.value = 'Erro ao alterar senha.'
  }
}

async function changeRole() {
  error.value = ''
  try {
    const body = {
      role: selectedUserRole.value.role,
      permissoes: selectedUserRolePerms.value // envia como array puro
    }
    const res = await authFetch(`http://localhost:8000/admin/users/${selectedUserRole.value.username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.ok) {
      showRoleDialog.value = false
      fetchUsers()
    } else {
      const data = await res.json()
      error.value = data.detail || 'Erro ao alterar perfil.'
      alert('Erro ao salvar permissões: ' + error.value)
    }
  } catch (e) {
    error.value = 'Erro ao alterar perfil.'
    alert('Erro ao salvar permissões: ' + e)
  }
}

async function deleteUser(user) {
  if (!confirm(`Remover usuário ${user}?`)) return
  error.value = ''
  try {
    const res = await authFetch(`http://localhost:8000/admin/users/${user}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      fetchUsers()
    } else {
      const data = await res.json()
      error.value = data.detail || 'Erro ao remover usuário.'
    }
  } catch (e) {
    error.value = 'Erro ao remover usuário.'
  }
}

function closeUserModal() {
  showUserModal.value = false
  newUsername.value = ''
  newPassword.value = ''
  newRole.value = 'operador'
  newStoreId.value = ''
  newPermissoes.value = []
}
</script>

<style scoped>
.user-manager {
  max-width: 540px;
  min-width: 340px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px #ff66001a;
  padding: 32px 24px 24px 24px;
  /* Garante que nada saia do card */
  overflow: hidden;
}
.back-btn {
  background: #fff7ef;
  color: #ff6600;
  border: 2px solid #ff6600;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #ff66001a;
}
.user-manager h2 {
  color: #FF6600;
  margin-bottom: 18px;
  font-size: 1.3rem;
}
.add-user-btn {
  background: #FF6600;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 18px;
  cursor: pointer;
}
.user-manager form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
}
.user-manager input,
.user-manager select {
  padding: 8px 10px;
  border: 2px solid #FF6600;
  border-radius: 6px;
  font-size: 1rem;
}
.user-manager button {
  background: #FF6600;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.user-manager button:hover {
  background: #FF4500;
}
.user-list {
  list-style: none;
  padding: 0;
}
.user-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  gap: 12px;
  /* Garante que os botões não ultrapassem o card */
  flex-wrap: wrap;
}
.user-info {
  display: flex;
  flex-direction: column;
  min-width: 180px;
  flex: 1;
}
.user-main {
  font-size: 1.13rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 2px;
}
.user-role, .user-store, .user-perms {
  font-size: 0.98rem;
  color: #666;
  margin-right: 6px;
}
.user-btns {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.user-btns button {
  min-width: 90px;
  font-size: 0.98rem;
  padding: 7px 10px;
  white-space: nowrap;
}
.dialog {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-content {
  background: #fff;
  padding: 24px 18px;
  border-radius: 10px;
  box-shadow: 0 2px 16px #ff66001a;
  min-width: 260px;
}
.error-msg {
  color: #c00;
  margin-bottom: 10px;
  font-size: 0.98rem;
}
.permissoes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}
.modal-btns {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}
</style>
