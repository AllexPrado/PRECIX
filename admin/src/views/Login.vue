<template>
  <div class="login-bg">
    <div class="login-container">
      <h1>PreciX</h1>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Usuário" required autofocus />
        <input v-model="password" type="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
      <div v-if="error" class="error-msg">Usuário ou senha inválidos.</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { saveToken } from '../auth.js'

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
      if (data.success && data.access_token) {
        saveToken(data.access_token);
        // Salva permissoes, store_id e store_codigo padronizado
        localStorage.setItem('permissoes', JSON.stringify(data.permissoes || []));
        localStorage.setItem('store_id', data.store_id || '');
        if (data.store_codigo) {
          localStorage.setItem('precix_store_codigo', String(data.store_codigo));
        } else {
          localStorage.removeItem('precix_store_codigo');
        }
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
.login-bg {
  min-height: 100vh;
  width: 100vw;
  position: relative;
  background: linear-gradient(135deg, #fff 60%, #fff3e0 100%);
  overflow: hidden;
}
      .login-container {
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        border-radius: 18px;
        padding: 32px 32px 24px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 320px;
        max-width: 350px;
        width: 100%;
      }
.login-container h1 {
  color: #ff6600;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
}
.login-container form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.login-container input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1.5px solid #ff6600;
  font-size: 1rem;
  margin-bottom: 0;
  box-sizing: border-box;
}
.login-container button {
  width: 100%;
  background: linear-gradient(90deg, #ff6600 60%, #ffa600 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(255,102,0,0.06);
  transition: background 0.2s;
}
.login-container button:hover {
  background: linear-gradient(90deg, #ffa600 60%, #ff6600 100%);
}
.error-msg {
  color: #d32f2f;
  background: #fff0f0;
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 10px;
  font-size: 1rem;
  text-align: center;
}
@media (max-width: 500px) {
  .login-container {
    min-width: 0;
    max-width: 98vw;
    padding: 18px 6vw 18px 6vw;
  }
}
</style>
