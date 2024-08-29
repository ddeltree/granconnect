### Testar no navegador

```bash
pnpm --filter=addon run dev
```

### Construir a extensão

```bash
pnpm --filter=addon run build # Chromium
pnpm --filter=addon run build:ff # Firefox
```

## Habilitar acesso do usuário

Quando a extensão é instalada, é criado um usuário anônimo.
O usuário pode definir seu nome e e-mail de forma opcional.
Isto é apenas uma redundância para manter cada usuário humanamente identificável, desde que seu acesso é permitido de forma manual.

De qualquer forma, para que se habilite o acesso é necessário criar o documento `admin/users`, onde os usuários com acesso habilitado são dispostos na lista `arrayEnabledUID`. Logo, para habilitar o acesso é necessário incluir seu UID nessa lista manualmente, através do [console de gerenciamento do Firebase](https://console.firebase.google.com/).

![](/screenshots/arrayEnabledUID.png)
