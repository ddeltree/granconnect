# GranConnect

Este monorepo apresenta uma extensão de navegador para Firefox e Chromium e uma API que permitem o compartilhamento de uma mesma conta e os acessos simultâneos no [GranCursosOnline](https://grancursosonline.com.br/), sem expor a senha.

Um acesso simultâneo no GranCursos é detectado quando há a ocorrência de múltiplas ações de login, gerando múltiplos cookies de sessão. Portanto, ele não será detectado quando um único cookie for distribuído entre múltiplos dispositivos. Este projeto inclui uma API que realiza esse único login, e uma extensão para distribuir esse único cookie entre os múltiplos usuários.

## Como utilizar este projeto

Os recursos utilizados aqui são o [Firebase](https://firebase.google.com) (banco de dados e autenticação) e o [netlify](https://www.netlify.com/) (hospedar a API), ambos gratuitos.

Siga o [guia](#configuração-do-projeto-no-firebase) abaixo para configurar o projeto no Firebase. Após isso, consulte os guias para a configuração e uso da [API](apps/api/README.md) e da [extensão](apps/addon/README.md).

## Configuração do projeto no Firebase

O Firebase será utilizado para:

- autenticar os usuários da extensão anonimamente;
- armazenar o cookie de sessão da conta do GranCursos;
- gerenciar manualmente a permissão de acesso de cada usuário ao cookie.

### Firestore

1. Crie um novo projeto pelo [console de gerenciamento](https://console.firebase.google.com/).

2. Crie um banco de dados Firestore.

3. Configure as _regras de segurança_ para o seguinte:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
  	match /{document=**} {
    	allow read, write: if false;
    }
    match /users/{uid} {
      allow read, write: if request.auth != null && uid == request.auth.uid;
    }
  }
}
```

4. Nas **configurações do projeto**, crie um novo app web e copie o valor de `firebaseConfig`, e transforme em json:

```json
{
  "apiKey": "...",
  "authDomain": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}
```

5. Configure a variável de ambiente `VITE_FIREBASE_CONFIG`, criando o arquivo `apps/addon/.env`:

```bash
VITE_API_URL="..." # definido mais a frente
VITE_FIREBASE_CONFIG='{"apiKey": "...","authDomain": "...","projectId": "...","storageBucket": "...","messagingSenderId": "...","appId": "..."}'
```

### Authentication

É preciso habilitar o login anônimo como um método de login.
