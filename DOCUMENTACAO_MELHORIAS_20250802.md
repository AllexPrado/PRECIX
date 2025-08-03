# Documentação de Melhorias e Próximos Passos

## Melhorias Realizadas (02/08/2025)

### 1. Carrossel de Banners
- CSS ajustado para imagens ocuparem o máximo da tela em todos os dispositivos.
- Uso de `object-fit: cover` para banners, eliminando bordas e cortes.
- Carrossel restaurado para rodar automaticamente após 15s de inatividade, mantendo interação.

### 2. PWA e HTTPS
- Manifest configurado para modo `fullscreen` no Android.
- Orientação para configuração de HTTPS no backend, necessário para ocultar barra de endereço e evitar aviso de conexão não segura.

### 3. Painel Admin – Lojas e Equipamentos
- Localização e revisão dos arquivos das telas de cadastro/gestão de lojas (`StoreManager.vue`) e equipamentos (`DeviceManager.vue`).
- Validação de campos obrigatórios e prevenção de duplicidade de identificador nos equipamentos.
- Mensagens de sucesso/erro ao cadastrar/excluir equipamentos.
- Confirmação antes de excluir equipamento.
- Contagem de equipamentos por loja implementada.
- Filtros avançados e busca presentes, com sugestão de aprimoramento.

---

## Próximos Passos

1. **Exibir contagem de equipamentos por loja na interface**
   - Mostrar junto ao nome da loja ou em painel resumido.

2. **Aplicar melhorias na tela de lojas**
   - Validação de nome (evitar duplicados/vazios).
   - Mensagens de sucesso/erro ao adicionar/excluir loja.
   - Filtro/busca por nome.

3. **Aprimorar feedback visual**
   - Substituir `alert` por toasts/avisos visuais.
   - Adicionar loaders para operações assíncronas.

4. **Dashboard Resumido**
   - Exibir total de lojas, total de equipamentos, equipamentos offline, agrupamento por loja.

5. **Documentação Técnica**
   - Documentar endpoints, fluxos, telas e plano de implantação.

6. **Configuração de HTTPS**
   - Implementar SSL no backend para garantir segurança e experiência PWA completa.

7. **Testes Finais**
   - Validar todas as funcionalidades em diferentes dispositivos e navegadores.

---

> Para priorizar algum ponto, basta informar!
