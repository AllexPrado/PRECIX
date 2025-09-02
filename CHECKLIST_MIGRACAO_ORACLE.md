# Checklist de Migração e Integração – Oracle Cloud Free Tier (PostgreSQL)

## 1. Criar banco no Oracle Cloud
- [ ] Criar conta no Oracle Cloud Free Tier
- [ ] Criar Autonomous Database (PostgreSQL, 20GB)
- [ ] Anotar host, porta, service name, usuário e senha
- [ ] Baixar wallet/credenciais se necessário
- [ ] Liberar acesso externo (IP do backend ou 0.0.0.0/0 para testes)

## 2. Exportar dados do SQLite
- [ ] Fazer backup do arquivo SQLite
- [ ] Exportar tabelas para CSV (pode usar DB Browser for SQLite, sqlite3 CLI ou script Python)

## 3. Criar tabelas no PostgreSQL
- [ ] Gerar DDL (CREATE TABLE) compatível com PostgreSQL
- [ ] Ajustar tipos de dados se necessário
- [ ] Executar DDL no banco Oracle Cloud (via DBeaver, pgAdmin, SQLcl, etc)

## 4. Importar dados para PostgreSQL
- [ ] Importar CSVs usando pgAdmin, DBeaver, ou comando COPY
- [ ] Validar se todos os dados foram importados corretamente

## 5. Atualizar backend para PostgreSQL
- [ ] Instalar driver psycopg2 ou asyncpg
- [ ] Atualizar string de conexão no backend (exemplo abaixo)
- [ ] Testar backend localmente com o novo banco
- [ ] Corrigir queries SQL se necessário

## 6. Testar sistema completo
- [ ] Testar todos os fluxos do sistema
- [ ] Validar performance e integridade dos dados

## 7. Deploy
- [ ] Deploy do backend apontando para o banco Oracle Cloud
- [ ] Deploy do frontend (Vercel/Netlify)
- [ ] Teste final em produção

---

## Exemplo de string de conexão (Python/FastAPI)

```python
DATABASE_URL = "postgresql+psycopg2://<usuario>:<senha>@<host>:<porta>/<service_name>"
```

- Substitua `<usuario>`, `<senha>`, `<host>`, `<porta>`, `<service_name>` pelos dados do Oracle Cloud.
- Se usar wallet/SSL, configure as variáveis de ambiente conforme documentação Oracle.

---

## Dicas
- Use DBeaver ou pgAdmin para facilitar importação/exportação.
- Teste cada etapa antes de avançar.
- Documente credenciais em local seguro.

---

Se precisar de scripts de exportação/importação ou exemplos de DDL, solicite que eu gero para você!
