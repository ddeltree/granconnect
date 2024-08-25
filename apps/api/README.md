## Configurando Netlify

### Instalação e login

```bash
npm i -g netlify-cli
netlify login
```

### Criar um site

```bash
netlify sites:create
```

Copie a url da saída desse comando e crie o arquivo `/apps/addon/.env` com o conteúdo:

```
VITE_API_URL=...
```

### Configurar a conta de serviço do firebase

A API precisa acessar o banco de dados para retornar o cookie de sessão e autorizar o usuário anônimo. Crie uma conta de serviço no firebase (_configurações do projeto > contas de serviço_), e cole o conteúdo do json como uma string:

```bash
netlify env:set SERVICE_ACCOUNT '...'
```

- Crie também um arquivo `apps/api/.env`, caso deseje **testar localmente** (`pnpm run dev`).

### Dar deploy

```bash
netlify deploy --prod
```
