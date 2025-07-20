<template>
  <div class="user-manager">
    <button class="back-btn" @click="goToDashboard">Voltar ao Painel</button>
    <h2>Usuários Administradores</h2>
    <form v-if="userRole === 'admin'" @submit.prevent="addUser">
      <input v-model="newUsername" placeholder="Novo usuário" required />
      <input v-model="newPassword" type="password" placeholder="Senha" required />
      <select v-model="newRole">
        <option value="admin">Administrador</option>
        <option value="operador">Operador</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
    <div v-if="error" class="error-msg">{{ error }}</div>
    <ul class="user-list">
      <li v-for="user in users" :key="user.username">
        <span>{{ user.username }} <small>({{ user.role || 'admin' }})</small></span>
        <button v-if="userRole === 'admin'" @click="showChangePassword(user.username)">Alterar Senha</button>
        <button v-if="userRole === 'admin'" @click="showChangeRole(user)" :disabled="user.username === 'admin'">Alterar Perfil</button>
        <button v-if="userRole === 'admin'" @click="deleteUser(user.username)" :disabled="user.username === 'admin'">Remover</button>
      </li>
    </ul>
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
        <button @click="changeRole">Salvar</button>
        <button @click="showRoleDialog = false">Cancelar</button>
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
const newUsername = ref('')
const newPassword = ref('')
const newRole = ref('operador')
const error = ref('')
const showPasswordDialog = ref(false)
const showRoleDialog = ref(false)
const selectedUser = ref('')
const selectedUserRole = ref({ username: '', role: 'operador' })
const newPasswordDialog = ref('')
const userRole = ref(getUserRole())

function goToDashboard() {
  router.push('/dashboard')
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

async function addUser() {
  error.value = ''
  try {
    const res = await authFetch('http://localhost:8000/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: newUsername.value, password: newPassword.value, role: newRole.value })
    })
    if (res.ok) {
      newUsername.value = ''
      newPassword.value = ''
      newRole.value = 'operador'
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
    const res = await authFetch(`http://localhost:8000/admin/users/${selectedUserRole.value.username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: selectedUserRole.value.role })
    })
    if (res.ok) {
      showRoleDialog.value = false
      fetchUsers()
    } else {
      const data = await res.json()
      error.value = data.detail || 'Erro ao alterar perfil.'
    }
  } catch (e) {
    error.value = 'Erro ao alterar perfil.'
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

onMounted(fetchUsers)
</script>

<style scoped>
.user-manager {
  max-width: 420px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px #ff66001a;
  padding: 32px 24px 24px 24px;
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
.user-manager form {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}
.user-manager input {
  flex: 1;
  padding: 8px 10px;
  border: 2px solid #FF6600;
  border-radius: 6px;
  font-size: 1rem;
}
.user-manager select {
  padding: 8px 10px;
  border: 2px solid #FF6600;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
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
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
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
</style>
