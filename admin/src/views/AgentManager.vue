<template>
  <div class="agent-manager-bg">
    <div class="agent-manager-card">
      <h2>Agentes Locais</h2>
      <div class="empty">Funcionalidade desabilitada. Endpoint /admin/agents não disponível.</div>
    </div>
  </div>
</template>

<script setup>
// Todas as funções de agentes desabilitadas temporariamente para evitar erro 404
</script>

<style scoped>
.agent-manager-bg {
  min-height: 100vh;
  background: #fff3e0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.agent-manager-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #ff66001a;
  padding: 36px 28px;
  min-width: 340px;
  max-width: 900px;
  width: 100%;
}
.empty {
  color: #ff6600;
  font-weight: bold;
  margin-top: 24px;
}
</style>
