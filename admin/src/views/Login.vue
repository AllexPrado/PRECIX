<template>
  <div class="login-bg" role="main">
    <div class="login-container" aria-label="Formulário de login">
      <!-- Brand (exibido em mobile; mantemos discreto no desktop) -->
      <img class="brand-logo" src="/logo-sonda.png" alt="Sonda" />
      <h1>PreciX</h1>
      <p class="subtitle">Acesse o painel administrativo</p>
      <form @submit.prevent="login" class="login-form">
        <input id="username" v-model="username" type="text" placeholder="Seu usuário" required autocomplete="username" autofocus />
        <div class="password-row">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" placeholder="Sua senha" required autocomplete="current-password" />
          <button type="button" class="toggle-pass" @click="showPassword = !showPassword" :aria-pressed="showPassword ? 'true' : 'false'">{{ showPassword ? 'Ocultar' : 'Mostrar' }}</button>
        </div>
        <div class="actions-row">
          <label class="remember">
            <input type="checkbox" v-model="remember" /> Lembrar-me
          </label>
          <span class="hint">Ambiente seguro</span>
        </div>
        <button class="submit-btn" type="submit" :disabled="loading">{{ loading ? 'Entrando…' : 'Entrar' }}</button>
      </form>
      <div v-if="error" class="error-msg" role="alert">Usuário ou senha inválidos.</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { saveToken } from '../auth.js'
import { api } from '../apiBase.js'

const username = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)
const remember = ref(true)

async function login() {
  error.value = false
  loading.value = true
  try {
    const response = await fetch(api('/admin/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.access_token) {
        saveToken(data.access_token);
        // Salva permissoes (aceita array ou string JSON), store_id e store_codigo padronizado
        let perms = [];
        if (Array.isArray(data.permissoes)) {
          perms = data.permissoes;
        } else if (typeof data.permissoes === 'string') {
          try { perms = JSON.parse(data.permissoes); } catch { perms = []; }
        }
        localStorage.setItem('permissoes', JSON.stringify(perms));
        localStorage.setItem('store_id', data.store_id || '');
        if (data.store_codigo) {
          localStorage.setItem('precix_store_codigo', String(data.store_codigo));
        } else {
          localStorage.removeItem('precix_store_codigo');
        }
        if (!remember.value) {
          // Se não lembrar, guarda um marcador para limpar no unload
          sessionStorage.setItem('precix_non_persist', '1')
        } else {
          sessionStorage.removeItem('precix_non_persist')
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
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Desktop (padrão): mantém o modelo anterior */
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
.brand-logo { display: none; height: 44px; margin-bottom: 10px; }
.login-container h1 {
  color: #ff6600;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
}
.subtitle { display:none; color:#6b7280; margin-top:-12px; margin-bottom: 14px; font-size: .96rem; }
.login-form {
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
.password-row { display: flex; gap: 8px; align-items: center; }
.password-row input { flex: 1; }
.toggle-pass {
  background: #fff;
  color: #ff6600;
  border: 2px solid #ff6600;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
}
.actions-row { display: flex; align-items: center; justify-content: space-between; margin-top: 0; }
.remember { color: #555; font-size: .95rem; display: inline-flex; align-items: center; gap: 8px; }
.hint { color: #999; font-size: .9rem; }
.submit-btn {
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
.submit-btn:hover { background: linear-gradient(90deg, #ffa600 60%, #ff6600 100%); }
.submit-btn:disabled { opacity: .7; cursor: not-allowed; }
.error-msg {
  color: #d32f2f;
  background: #fff0f0;
  border-radius: 8px;
  padding: 8px 16px;
  margin-top: 10px;
  font-size: 1rem;
  text-align: center;
}

/* Mobile e tablets: apenas ajuste responsivo, mantendo o visual */
@media (max-width: 900px) {
  .login-bg {
    /* Variáveis de marca válidas apenas no escopo mobile */
    --brand:#ff6600; --brand2:#ffa600; --brand-soft:#fff3e0;
    /* Centralização vertical responsiva, com respeito às barras de navegação */
    min-height: 100dvh;
    display: grid;
    place-items: center;
    padding:
      calc(env(safe-area-inset-top, 0px) + 12px)
      calc(env(safe-area-inset-right, 0px) + 24px)
      calc(env(safe-area-inset-bottom, 0px) + 12px)
      calc(env(safe-area-inset-left, 0px) + 24px);
    /* Fundo moderno com leve aura em brand e sem custo de imagem */
    background:
      radial-gradient(1000px 380px at 90% 110%, rgba(255,102,0,0.06), transparent 60%),
      radial-gradient(800px 300px at -10% -10%, rgba(255,166,0,0.05), transparent 60%),
      linear-gradient(135deg, #ffffff 55%, var(--brand-soft) 100%);
    position: relative;
    overflow: hidden;
  }
  .login-bg::before {
    /* Orb sutil animada no fundo para dar sensação tecnológica */
    content: '';
    position: absolute; inset: auto -20% -20% auto; width: 60vw; height: 60vw;
    background: radial-gradient(closest-side, rgba(255,102,0,0.12), rgba(255,102,0,0.04) 60%, transparent 65%);
    filter: blur(18px);
    border-radius: 50%;
    animation: float 12s ease-in-out infinite;
  }
  .login-container {
    position: relative;
    transform: none;
    left: auto; top: auto;
    margin: 0 auto;
    min-width: 0;
    max-width: 480px;
    width: 100%; /* usa o padding do container pai para o respiro lateral */
    padding: 22px 22px 22px 22px;
    box-sizing: border-box;
    background: rgba(255,255,255,0.72);
    -webkit-backdrop-filter: blur(10px) saturate(120%);
    backdrop-filter: blur(10px) saturate(120%);
    border: 1px solid rgba(255,102,0,0.14);
    box-shadow:
      0 20px 40px rgba(255,102,0,0.12),
      0 6px 18px rgba(0,0,0,0.08);
    border-radius: 20px;
  }
  /* Badge de marca para evitar "empilhamento" com o título */
  .brand-logo {
    display:block;
    position: absolute;
    top: -18px;
    left: 16px;
    height: 34px;
    background: #fff;
    border-radius: 10px;
    padding: 4px 8px;
    border: 1px solid #ffe0c2;
    box-shadow: 0 6px 16px rgba(255,102,0,0.12);
  }
  .login-container h1 { text-align: center; font-size: 1.68rem; margin: 12px 0 6px 0; letter-spacing: .2px; }
  .subtitle { display:block; text-align:center; }
  .login-form { gap: 12px; }
  .password-row { position: relative; }
  .password-row input { padding-right: 92px; }
  .toggle-pass {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    padding: 7px 12px;
    border-radius: 999px;
    background: rgba(255,247,239,0.9);
    border: 1px solid rgba(255,179,102,0.9);
    color: var(--brand);
    line-height: 1;
    white-space: nowrap;
    transition: background .15s ease, border-color .15s ease;
  }
  .toggle-pass:active { background: #ffe9d7; }
  .actions-row { gap: 10px; }
  .remember { white-space: nowrap; }
  .hint { display: none; }
  .login-container input {
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(255,179,102,0.85);
    transition: border-color .15s ease, box-shadow .15s ease;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
    border-radius: 14px;
    padding: 12px 14px;
  }
  /* Remove amarelo do autofill no iOS/Safari/Chrome */
  .login-container input:-webkit-autofill,
  .login-container input:-webkit-autofill:hover,
  .login-container input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
    box-shadow: 0 0 0px 1000px #ffffff inset;
    -webkit-text-fill-color: #222;
    caret-color: #222;
  }
  .login-container input:focus {
    outline: none;
    border-color: #ff7a1a;
    box-shadow: 0 0 0 4px rgba(255,166,0,0.18), inset 0 1px 2px rgba(0,0,0,0.05);
  }
  .submit-btn {
    border-radius: 999px;
    box-shadow: 0 10px 26px rgba(255,102,0,0.22), 0 3px 8px rgba(0,0,0,0.08);
    position: relative;
    overflow: hidden;
  }
  .submit-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -40%; height: 100%; width: 40%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent);
    transform: skewX(-20deg);
    animation: shine 3.2s ease-in-out infinite;
  }
}

@keyframes shine {
  0% { left: -40%; }
  60% { left: 120%; }
  100% { left: 120%; }
}
@keyframes float {
  0% { transform: translate(0,0) scale(1); opacity: .9 }
  50% { transform: translate(-10px,-6px) scale(1.03); opacity: 1 }
  100% { transform: translate(0,0) scale(1); opacity: .9 }
}
</style>
