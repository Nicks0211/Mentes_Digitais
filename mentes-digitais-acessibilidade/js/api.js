/**
 * api.js — MENTES DIGITAIS
 * Módulo central de autenticação e dados do usuário.
 * OTIMIZADO: cache em memória, lazy-loading, debounce de saves.
 */

/* ============================================================
   CACHE EM MEMÓRIA — evita JSON.parse repetido por chamada
============================================================ */
let _userCache = null;
let _saveTimer = null;

/* ============================================================
   AUTH HELPERS
   Funciona em dois modos:
   - Firebase configurado (js/firebase-config.js com credenciais reais):
     a sessão é validada contra o Firebase Auth e os dados do
     usuário são sincronizados com o Firestore (coleção "usuarios").
   - Firebase não configurado: cai automaticamente no modo local
     antigo (localStorage), sem quebrar nada.
============================================================ */
function requireAuth() {
  if (!localStorage.getItem('md_logado')) {
    window.location.href = 'login.html';
    return;
  }

  // Se o Firebase estiver configurado, confirma a sessão de forma
  // assíncrona e sincroniza os dados do usuário com a nuvem.
  if (typeof mdFirebaseOk !== 'undefined' && mdFirebaseOk) {
    mdAuth.onAuthStateChanged(function (user) {
      if (!user) {
        localStorage.removeItem('md_logado');
        localStorage.removeItem('md_uid');
        window.location.href = 'login.html';
        return;
      }
      localStorage.setItem('md_uid', user.uid);
      mdSyncFromCloud(user.uid);
    });
  }
}

function getBasePath() {
  return '';
}

function mdLogout() {
  if (!confirm('Deseja sair da plataforma?')) return;

  const finalizarLogout = function () {
    localStorage.removeItem('md_logado');
    localStorage.removeItem('md_uid');
    _userCache = null;
    window.location.href = 'login.html';
  };

  if (typeof mdFirebaseOk !== 'undefined' && mdFirebaseOk && mdAuth.currentUser) {
    mdAuth.signOut().then(finalizarLogout).catch(finalizarLogout);
  } else {
    finalizarLogout();
  }
}

/**
 * Busca o documento do usuário no Firestore e atualiza o cache
 * local (localStorage + memória) para que mdGetUser() continue
 * síncrono e instantâneo em todo o resto do app.
 */
function mdSyncFromCloud(uid) {
  if (!(typeof mdFirebaseOk !== 'undefined' && mdFirebaseOk) || !uid) return Promise.resolve(null);

  return mdDb.collection('usuarios').doc(uid).get().then(function (doc) {
    if (doc.exists) {
      const dados = doc.data();
      _userCache = Object.assign({}, MD_USER_DEFAULTS, dados);
      localStorage.setItem('md_usuario', JSON.stringify(_userCache));
      mdShowNavUser();
      document.dispatchEvent(new CustomEvent('md:cloud-sync', { detail: _userCache }));
      return _userCache;
    }
    return null;
  }).catch(function (e) {
    console.error('[Firebase] Erro ao sincronizar usuário:', e);
    return null;
  });
}

/**
 * Envia os dados do usuário para o Firestore (merge), sem bloquear
 * a interface. Usa o mesmo debounce de mdSaveUser.
 */
function mdCloudSaveUser(data) {
  if (!(typeof mdFirebaseOk !== 'undefined' && mdFirebaseOk)) return;
  const uid = localStorage.getItem('md_uid');
  if (!uid) return;

  const dadosSemSenha = Object.assign({}, data);
  delete dadosSemSenha.senha; // senha nunca é salva no Firestore

  mdDb.collection('usuarios').doc(uid).set(dadosSemSenha, { merge: true })
    .catch(function (e) { console.error('[Firebase] Erro ao salvar usuário:', e); });
}

/* ============================================================
   USUÁRIO — com cache em memória
============================================================ */
const MD_USER_DEFAULTS = {
  nome: 'Estudante', sob: '', user: 'usuario', email: '',
  avatar: '🦁', nivel: 'medio', discs: [], meta: '20',
  escola: '', serie: '', genero: '', bio: '', nasc: '',
  stats: { total: 0, acertos: 0, streak: 0, rank: '—' },
  atividade: [0, 0, 0, 0, 0, 0, 0],
  historico: {}
};

function mdGetUser() {
  if (_userCache) return _userCache;
  try {
    const saved = JSON.parse(localStorage.getItem('md_usuario') || '{}');
    _userCache = Object.assign({}, MD_USER_DEFAULTS, saved);
    return _userCache;
  } catch {
    _userCache = { ...MD_USER_DEFAULTS };
    return _userCache;
  }
}

/**
 * Salva com debounce de 300ms — evita múltiplos writes seguidos
 * ao localStorage durante uma mesma sessão de respostas.
 */
function mdSaveUser(data) {
  const merged = Object.assign(mdGetUser(), data);
  _userCache = merged;

  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    localStorage.setItem('md_usuario', JSON.stringify(merged));
    mdCloudSaveUser(merged); // no-op se o Firebase não estiver configurado
  }, 300);

  return merged;
}

function mdShowNavUser() {
  const el = document.getElementById('nav-user');
  if (!el) return;
  const u = mdGetUser();
  if (u.nome) el.textContent = '👤 ' + u.nome;
}

/* ============================================================
   RANKING — cache por nível
============================================================ */
const MD_NIVEIS = ['facil', 'medio', 'dificil'];
const _rankingCache = {};

function mdSalvarRanking(nome, acertos, total, dificuldade, disciplinas) {
  const chave = 'ranking_' + dificuldade;
  let ranking = mdGetRanking(dificuldade);
  ranking.push({ nome, acertos, total, disciplinas });
  ranking.sort((a, b) => b.acertos - a.acertos);
  ranking = ranking.slice(0, 5);
  _rankingCache[dificuldade] = ranking;
  localStorage.setItem(chave, JSON.stringify(ranking));

  if (typeof mdFirebaseOk !== 'undefined' && mdFirebaseOk) {
    mdDb.collection('ranking').doc(dificuldade).set({ lista: ranking }, { merge: true })
      .catch(function (e) { console.error('[Firebase] Erro ao salvar ranking:', e); });
  }
}

/**
 * Busca o ranking mais recente na nuvem (opcional, para telas que
 * queiram mostrar o ranking global em vez do ranking só local).
 * Não substitui mdGetRanking(), que continua síncrono.
 */
function mdSyncRankingFromCloud(dificuldade) {
  if (!(typeof mdFirebaseOk !== 'undefined' && mdFirebaseOk)) return Promise.resolve(null);
  return mdDb.collection('ranking').doc(dificuldade).get().then(function (doc) {
    if (!doc.exists) return null;
    const lista = doc.data().lista || [];
    _rankingCache[dificuldade] = lista;
    localStorage.setItem('ranking_' + dificuldade, JSON.stringify(lista));
    return lista;
  }).catch(function (e) {
    console.error('[Firebase] Erro ao buscar ranking:', e);
    return null;
  });
}

function mdGetRanking(nivel) {
  if (_rankingCache[nivel]) return _rankingCache[nivel];
  const r = JSON.parse(localStorage.getItem('ranking_' + nivel) || '[]');
  _rankingCache[nivel] = r;
  return r;
}

function mdLimparRanking() {
  MD_NIVEIS.forEach(n => {
    localStorage.removeItem('ranking_' + n);
    delete _rankingCache[n];
  });
}

/* ============================================================
   DISCIPLINAS — mapeamento global
============================================================ */
const MD_DISCIPLINAS = {
  matematica: 'Matemática', portugues: 'Português', biologia: 'Biologia',
  fisica: 'Física', quimica: 'Química', historia: 'História',
  geografia: 'Geografia', sociologia: 'Sociologia', ingles: 'Inglês'
};

/* ============================================================
   UTILITÁRIOS
============================================================ */
function mdFormatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

/** Fisher-Yates in-place */
function mdShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Registra histórico em batch — uma única chamada de mdSaveUser
 * independente do tamanho do array de respostas.
 */
function mdRegistrarHistorico(respostas) {
  if (!respostas || respostas.length === 0) return;
  const user = mdGetUser();
  if (!user.historico) user.historico = {};
  if (!user.stats) user.stats = { total: 0, acertos: 0, streak: 0, rank: '—' };

  let acSessao = 0;
  respostas.forEach(r => {
    const disc = r.disciplina;
    if (!disc) return;
    if (!user.historico[disc]) user.historico[disc] = { total: 0, acertos: 0 };
    user.historico[disc].total++;
    if (r.acertou) { user.historico[disc].acertos++; acSessao++; }
  });

  user.stats.total   += respostas.length;
  user.stats.acertos += acSessao;

  mdSaveUser(user); // único write
}

/* ============================================================
   REVISÃO DE ERROS — cache em memória
============================================================ */
const MD_ERROS_KEY = 'md_erros';
let _errosCache = null;

function _persistErros(arr) {
  _errosCache = arr;
  localStorage.setItem(MD_ERROS_KEY, JSON.stringify(arr));
}

function mdGetErros() {
  if (_errosCache) return _errosCache;
  try {
    _errosCache = JSON.parse(localStorage.getItem(MD_ERROS_KEY) || '[]');
    return _errosCache;
  } catch {
    _errosCache = [];
    return [];
  }
}

/**
 * Salva erros usando um Set de chaves compostas para deduplicação O(1)
 * em vez de Array.some() O(n²).
 */
function mdSalvarErros(questoesErradas) {
  if (!questoesErradas || questoesErradas.length === 0) return;
  let erros = mdGetErros();

  const existentes = new Set(erros.map(e => `${e.disciplina}||${e.p}`));
  const agora = new Date().toISOString();

  questoesErradas.forEach(q => {
    const key = `${q.disciplina}||${q.p}`;
    if (!existentes.has(key)) {
      existentes.add(key);
      erros.push({ p: q.p, o: q.o, c: q.c, e: q.e, d: q.d, disciplina: q.disciplina, salvoEm: agora });
    }
  });

  if (erros.length > 200) erros = erros.slice(erros.length - 200);
  _persistErros(erros);
}

function mdRemoverErro(pergunta, disciplina) {
  _persistErros(mdGetErros().filter(e => !(e.p === pergunta && e.disciplina === disciplina)));
}

function mdLimparErros() {
  _errosCache = [];
  localStorage.removeItem(MD_ERROS_KEY);
}

function mdContarErros() {
  return mdGetErros().length;
}