/**
 * firebase-config.js — MENTES DIGITAIS
 * ------------------------------------------------------------
 * Inicializa o Firebase (Auth + Firestore) para o projeto.
 *
 * COMO CONFIGURAR:
 * 1. Crie um projeto em https://console.firebase.google.com
 * 2. No projeto, vá em "Configurações do projeto" → "Geral" →
 *    role até "Seus apps" → clique no ícone Web (</>) → registre o app.
 * 3. Copie o objeto de configuração que o Firebase mostrar e cole
 *    substituindo o objeto FIREBASE_CONFIG abaixo.
 * 4. No console, ative:
 *      - Authentication → Sign-in method → E-mail/senha (Ativar)
 *      - Firestore Database → Criar banco de dados (modo produção)
 * 5. Em Firestore → Regras, use como ponto de partida:
 *
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        match /usuarios/{uid} {
 *          allow read, write: if request.auth != null && request.auth.uid == uid;
 *        }
 *        match /ranking/{nivel} {
 *          allow read: if true;
 *          allow write: if request.auth != null;
 *        }
 *      }
 *    }
 *
 * Este arquivo deve ser incluído ANTES de js/api.js em toda página
 * que usa autenticação/dados de usuário, junto com os SDKs do
 * Firebase (compat), por exemplo:
 *
 *   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"></script>
 *   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"></script>
 *   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js"></script>
 *   <script src="js/firebase-config.js"></script>
 *   <script src="js/api.js"></script>
 */

const FIREBASE_CONFIG = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

let mdAuth = null;
let mdDb = null;
let mdFirebaseOk = false;

try {
  if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey !== 'SUA_API_KEY_AQUI') {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    mdAuth = firebase.auth();
    mdDb = firebase.firestore();
    mdFirebaseOk = true;
  } else if (typeof firebase !== 'undefined') {
    console.warn('[Firebase] Configure js/firebase-config.js com as credenciais do seu projeto antes de usar login/cadastro na nuvem. Rodando em modo local (localStorage) por enquanto.');
  }
} catch (e) {
  console.error('[Firebase] Falha ao inicializar:', e);
  mdFirebaseOk = false;
}

/**
 * Resolve um "usuário ou e-mail" digitado no login para o e-mail
 * real necessário para o Firebase Auth (que só aceita e-mail/senha).
 */
async function mdResolverEmailPorUsuario(idDigitado) {
  if (!idDigitado) return null;
  if (idDigitado.includes('@')) return idDigitado;
  if (!mdFirebaseOk) return null;

  try {
    const snap = await mdDb.collection('usuarios')
      .where('user', '==', idDigitado.toLowerCase())
      .limit(1)
      .get();
    if (snap.empty) return null;
    return snap.docs[0].data().email || null;
  } catch (e) {
    console.error('[Firebase] Erro ao resolver usuário:', e);
    return null;
  }
}
