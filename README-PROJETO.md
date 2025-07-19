# Documentação Técnica – Projeto PRECIX

## 1. Estrutura do Projeto

- **Backend** (`backend/`): API em FastAPI (Python), banco SQLite, endpoints para produtos, banners, dispositivos, lojas, importação/exportação TXT.
- **Frontend** (`frontend/`): Vue 3 + Vite, IndexedDB para funcionamento offline, PWA (manifest, service worker), carrossel de banners dinâmico.
- **Admin** (`admin/`): Vue 3, gerenciamento de dispositivos, banners, lojas, login, dashboard.
- **Sync** (`sync/`): Script Python para importar produtos via TXT.

---

## 2. Funcionalidades Implementadas

- CRUD completo de produtos, banners, dispositivos e lojas (backend e admin).
- Importação de produtos via TXT.
- Exportação de produtos para TXT.
- Carrossel de banners dinâmico no frontend.
- Consulta de preços com IndexedDB para uso offline.
- PWA com manifest e service worker.
- Registro de dispositivos no backend.
- Painel de administração para gestão de dispositivos, banners e lojas.

---

## 3. Integrações

- Integração via TXT: funcional.
- Integração via API: funcional.
- Integração via view de banco: planejada.

---

## 4. Offline/PWA

- IndexedDB para consulta offline de produtos.
- Service worker implementado para cache de assets e fallback de navegação.
- Manifest.json configurado.
- Testes em Android/iOS: app funciona offline se não fechar a página; cold start offline ainda com ajuste pendente (não bloqueia uso real).

---

## 5. Status Atual

- Todas as rotinas principais implementadas e testadas.
- Sistema pronto para uso em produção, com exceção do cold start offline do PWA (pode ser resolvido depois).

---

## 6. Próximos Passos (Checklist)

- [ ] Seguir com novas features, ajustes e testes de integração.
- [ ] Documentar workaround do PWA offline.
- [ ] Retomar ajuste do service worker/PWA após as próximas entregas.
- [ ] Validar integração via view de banco.
- [ ] Realizar testes finais em produção.

---

> Qualquer dúvida ou necessidade de atualização, consulte este arquivo ou solicite suporte técnico.
