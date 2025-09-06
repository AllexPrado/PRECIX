## Segurança e variáveis de ambiente

- Nunca comite senhas/segredos no repositório.
- Use o arquivo `.env` local (copie de `.env.example`) para configurar `PRECIX_PG_USER` e `PRECIX_PG_PASS`.
- O backend tenta carregar `.env` (se `python-dotenv` estiver instalado) e também lê variáveis do ambiente do processo.
- Em produção, use secret stores (GitHub Actions secrets, Azure Key Vault, etc.).

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

## Melhorias e funcionalidades (07/08/2025)
- Gestão de usuários aprimorada: exibição e edição da loja vinculada ao usuário (campo store_id)
- Modal de perfil permite alterar a loja do usuário facilmente
- Barra de pesquisa e filtro por loja na tela de usuários (busca por nome, ID ou loja)
- Operadores só visualizam equipamentos da própria loja e não podem editar/excluir
- Envio de banners restrito à loja do usuário logado
- Backend atualizado para aceitar e persistir o campo store_id nas operações de usuário
- Ajustes visuais e de UX no painel admin e lista de equipamentos

## Funcionalidades já implementadas
- Consulta de preços (frontend) com fallback offline
- Sincronização automática e periódica do catálogo
- Carrossel de banners (dinâmico e restrito por loja)
- Painel admin: login, dashboard, upload/listagem/exclusão de banners
- Gestão de usuários/admins com permissões e loja vinculada
- Endpoints REST para produtos, banners, status, login e usuários
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

## Histórico do dia (07/08/2025)
- Gestão de usuários com loja vinculada e edição de perfil
- Filtro e pesquisa de usuários por nome, ID e loja
- Permissões refinadas para operadores (visualização restrita de equipamentos)
- Integração e persistência do campo store_id no backend e frontend
- Melhorias visuais e de UX no admin

---

## Licença
Projeto privado para uso interno Sonda Supermercados.
