# PreciX – Sistema Profissional de Consulta de Preços

Projeto completo para totens/terminais de consulta de preços em supermercados, com painel administrativo, funcionamento offline e integração moderna.

---

## Visão Geral

- **Frontend (Vue 3 + Vite + PWA):**
  - Consulta de preços por código de barras (online e offline)
  - Carrossel fullscreen de banners promocionais
  - Sincronização automática do catálogo (IndexedDB)
  - Interface responsiva, pronta para tablets/kiosk
  - PWA: funciona offline, instalável

- **Backend (FastAPI + SQLite):**
  - API REST para consulta de produtos
  - Endpoints para catálogo, banners, status do sistema
  - Upload, listagem e exclusão de banners
  - Autenticação de admin
  - Servidor pronto para integração com frontend

- **Admin (Vue 3 + Vite):**
  - Login protegido
  - Dashboard com status do sistema
  - Gerenciamento visual de banners do carrossel
  - UI moderna e responsiva

---

## Funcionalidades já implementadas
- Consulta de preços (frontend) com fallback offline
- Sincronização automática e periódica do catálogo
- Carrossel de banners (atualmente estático, pronto para integração dinâmica)
- Painel admin: login, dashboard, upload/listagem/exclusão de banners
- Endpoints REST para produtos, banners, status e login
- Scripts para importação de catálogo via .txt

---

## Como rodar localmente

### 1. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt  # (crie se necessário)
uvicorn main:app --reload
```

### 2. Frontend (Consulta)
```bash
cd frontend
npm install
npm run dev
```
Acesse: http://localhost:5173

### 3. Admin
```bash
cd admin
npm install
npm run dev
```
Acesse: http://localhost:5174

---

## Próximos Passos Sugeridos
- Melhorar logs, auditoria e monitoramento
- Gerenciamento de usuários/admins
- Tela de monitoramento de equipamentos

---

## Histórico do dia (14/07/2025)
- Correção crítica no BannerManager.vue (admin)
- Painel admin voltou a funcionar normalmente
- Validação de todo o fluxo admin/backend/frontend
- Definição do próximo passo: integração dinâmica dos banners
- Projeto versionado e publicado neste repositório

---

## Licença
Projeto privado para uso interno Sonda Supermercados.
