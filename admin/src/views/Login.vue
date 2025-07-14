<template>
  <div class="login-container">
    <h1>Administração PreciX</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Usuário" required autofocus />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <div v-if="error" class="error-msg">Usuário ou senha inválidos.</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()

async function login() {
  error.value = false
  try {
    const response = await fetch('http://localhost:8000/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        error.value = false;
        router.push('/dashboard');
      } else {
        error.value = true;
      }
    } else {
      error.value = true;
    }
  } catch (e) {
    error.value = true;
  }
}
</script>

<style scoped>
.login-container {
  max-width: 340px;
  margin: 10vh auto 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px #ff66001a;
  padding: 36px 28px 28px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-container h1 {
  color: #FF6600;
  margin-bottom: 24px;
  font-size: 1.5rem;
}
.login-container input {
  width: 100%;
  margin-bottom: 16px;
  padding: 12px 14px;
  border: 2px solid #FF6600;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
.login-container input:focus {
  border-color: #FF9900;
}
.login-container button {
  width: 100%;
  background: linear-gradient(90deg, #FF6600 60%, #FF9900 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  box-shadow: 0 2px 8px #ff66001a;
  transition: background 0.2s, box-shadow 0.2s;
}
.login-container button:hover {
  background: linear-gradient(90deg, #FF4500 60%, #FF9900 100%);
  box-shadow: 0 4px 16px #ff66002a;
}
.error-msg {
  color: #c00;
  margin-top: 10px;
  font-size: 0.98rem;
}
</style>
