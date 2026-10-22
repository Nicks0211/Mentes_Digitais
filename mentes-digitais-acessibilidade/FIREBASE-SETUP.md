# Como ativar o Firebase no Mentes Digitais

O projeto já vem com o código de integração pronto (Authentication +
Firestore). Falta só configurar seu projeto Firebase. Enquanto isso não
for feito, o app continua funcionando no modo antigo (localStorage),
sem quebrar nada.

## 1. Criar o projeto no Firebase
1. Acesse https://console.firebase.google.com e crie um projeto.
2. Em **Compilação → Authentication → Sign-in method**, ative
   **E-mail/senha**.
3. Em **Compilação → Firestore Database**, clique em **Criar banco de
   dados** (modo produção, escolha a região mais próxima).

## 2. Pegar as credenciais do app Web
1. Nas configurações do projeto (ícone de engrenagem) → **Geral**.
2. Em "Seus apps", clique no ícone **Web (`</>`)** e registre um app.
3. Copie o objeto de configuração exibido (`apiKey`, `authDomain`,
   `projectId`, etc.).

## 3. Colar as credenciais no projeto
Abra `js/firebase-config.js` e substitua o objeto `FIREBASE_CONFIG`
pelos valores copiados:

```js
const FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## 4. Configurar as regras do Firestore
Em **Firestore Database → Regras**, use:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /ranking/{nivel} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Isso permite que cada usuário só leia/escreva os próprios dados, e
que o ranking seja público para leitura (necessário para a tela de
ranking) mas só editável por usuários autenticados.

## O que muda no app
- **Cadastro** (`cadastro.html`): cria a conta com
  `createUserWithEmailAndPassword` e salva o perfil em
  `usuarios/{uid}` no Firestore (a senha nunca é salva em texto).
- **Login** (`login.html`): aceita usuário OU e-mail — se for
  usuário, o app busca o e-mail correspondente no Firestore antes de
  autenticar com `signInWithEmailAndPassword`.
- **Sessão** (`requireAuth()` em `js/api.js`): confirma a sessão via
  `onAuthStateChanged` e redireciona para o login se o usuário não
  estiver realmente autenticado no Firebase.
- **Dados do usuário** (`mdSaveUser`/`mdGetUser`): continuam
  funcionando de forma síncrona via cache local, mas agora toda
  alteração é replicada para o Firestore em segundo plano
  (debounce de 300ms), e ao carregar uma página protegida os dados
  são atualizados a partir da nuvem (`mdSyncFromCloud`).
- **Ranking** (`mdSalvarRanking`): grava também em
  `ranking/{nivel}` no Firestore, permitindo (futuramente) um
  ranking global entre dispositivos.

## Sem configurar nada
Se você não mexer em `js/firebase-config.js`, o app detecta que não
há credenciais reais e continua 100% funcional no modo local antigo
(localStorage), exatamente como antes.
