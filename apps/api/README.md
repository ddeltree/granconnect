## Configurando Netlify

### Instalação e login

```bash
cd apps/api
npm i -g netlify-cli
netlify login
```

### Criar um site

```bash
netlify sites:create
```

Copie a url da saída desse comando e configure a variável de ambiente `VITE_API_URL` no arquivo `/apps/addon/.env`:

```bash
VITE_API_URL="https://XXXX.netlify.app"
VITE_FIREBASE_CONFIG='...'
```

### Configurar credenciais

A API precisa acessar o banco de dados para retornar o cookie de sessão e autorizar o usuário anônimo. Crie uma **conta de serviço no firebase** (_configurações do projeto > contas de serviço_), e cole o conteúdo do json como uma string, juntos ao **e-mail e senha da conta do grancursos**:

```bash
netlify env:set EMAIL '...'
netlify env:set SENHA '...'
netlify env:set SERVICE_ACCOUNT '...'
```

## Utilização

Execute o comando abaixo para testar localmente:

```bash
pnpm --filter=api run dev
```

O projeto terá sido bem configurado caso o retorno da requisição _GET /_ seja "**Unsupported method**". Senão, provavelmente é um erro ao configurar as variáveis de ambiente.

### Dar deploy

```bash
netlify deploy --prod
```
