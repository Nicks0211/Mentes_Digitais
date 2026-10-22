/* ==========================
   quiz.js — MENTES DIGITAIS
   OTIMIZADO:
   - DocumentFragment para batch DOM
   - requestAnimationFrame para animações
   - Seleção de elementos cacheada
   - Remoção de innerHTML repetido
   - Timer com requestAnimationFrame
========================== */

/* ==========================
   CACHE DE ELEMENTOS DOM
   Evita querySelector repetido
   em cada questão exibida
========================== */
const $ = id => document.getElementById(id);

const EL = {
  // Quiz
  pergunta:    () => $('pergunta'),
  respostas:   () => $('respostas'),
  explicacao:  () => $('explicacao'),
  nextBtn:     () => $('nextBtn'),
  contador:    () => $('contador'),
  progress:    () => $('progress'),
  timer:       () => $('timer'),
  resultado:   () => $('resultado'),
  // Simulado
  simPergunta:    () => $('simPergunta'),
  simRespostas:   () => $('simRespostas'),
  simExplicacao:  () => $('simExplicacao'),
  simNextBtn:     () => $('simNextBtn'),
  simContador:    () => $('simContador'),
  progress2:      () => $('progress2'),
  simTimer:       () => $('simTimer'),
  simDiscTag:     () => $('simDisciplinaTag'),
  simResultGeral: () => $('simResultadoGeral'),
  simResultDisc:  () => $('simResultadoPorDisciplina'),
  simGabarito:    () => $('simGabarito'),
  // Revisão
  revisaoContador:    () => $('revisaoContador'),
  progressRevisao:    () => $('progressRevisao'),
  revisaoDiscTag:     () => $('revisaoDisciplinaTag'),
  revisaoPergunta:    () => $('revisaoPergunta'),
  revisaoRespostas:   () => $('revisaoRespostas'),
  revisaoExplicacao:  () => $('revisaoExplicacao'),
  revisaoNextBtn:     () => $('revisaoNextBtn'),
  revisaoResultado:   () => $('revisaoResultado'),
  revisaoResumoDisc:  () => $('revisaoResumoDisc'),
  revisaoTotal:       () => $('revisaoTotalCount'),
};

/* ==========================
   NAVEGAÇÃO
========================== */
const todasAsTelas = [
  'startScreen','quizScreen','endScreen',
  'simuladoScreen','simQuizScreen','simEndScreen',
  'revisaoScreen','revisaoQuizScreen','revisaoEndScreen'
];

// Cache das seções para não re-query a cada navegação
const _secoes = {};
todasAsTelas.forEach(id => { _secoes[id] = null; }); // lazy-init

function _getSec(id) {
  if (!_secoes[id]) _secoes[id] = $(id);
  return _secoes[id];
}

function mostrarTela(id) {
  todasAsTelas.forEach(t => {
    const el = _getSec(t);
    if (el) el.style.display = 'none';
  });
  _getSec(id).style.display = 'block';
}

function navegarPara(telaId, btnClicado) {
  mostrarTela(telaId);
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btnClicado) btnClicado.classList.add('active');
}

function voltarInicio() {
  _stopQuizTimer();
  mostrarTela('startScreen');
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns[0]?.classList.add('active');
  navBtns[1]?.classList.remove('active');
  atualizarBotaoRevisao();
}

function voltarSimulado() {
  _stopSimTimer();
  mostrarTela('simuladoScreen');
}

/* ==========================
   BANCO DE QUESTÕES
========================== */
// eslint-disable-next-line no-undef
const bancoDeDados = { matematica, portugues, biologia, fisica, quimica, historia, geografia, sociologia, ingles };

/* ==========================
   HELPERS DE OPÇÕES (DocumentFragment)
   Renderiza botões sem innerHTML concatenado
========================== */
function _criarBotoesOpcoes(opcoes, onclickFn, container) {
  const frag = document.createDocumentFragment();
  opcoes.forEach((opcao, idx) => {
    const btn = document.createElement('button');
    btn.className = 'optionBtn';
    btn.textContent = opcao;
    btn.addEventListener('click', () => onclickFn(idx));
    frag.appendChild(btn);
  });
  container.innerHTML = '';
  container.appendChild(frag);
}

/* ==========================
   INÍCIO DO QUIZ
========================== */
function start() {
  const nome = $('nome').value.trim();
  const dificuldade = $('dificuldade').value;
  const selecionadas = Array.from(
    document.querySelectorAll('#startScreen input[type=checkbox]:checked')
  ).map(cb => cb.value);

  if (!nome) { alert('Digite seu nome antes de começar!'); return; }
  if (!selecionadas.length) { alert('Selecione pelo menos uma disciplina!'); return; }

  let banco = [];
  selecionadas.forEach(disc => {
    if (bancoDeDados[disc]) {
      bancoDeDados[disc].forEach(q => banco.push({ ...q, disciplina: disc }));
    }
  });

  banco = banco.filter(q => q.d === dificuldade);
  if (!banco.length) { alert('Nenhuma questão disponível para essa configuração!'); return; }
  mdShuffle(banco);

  window.quizState = { nome, dificuldade, banco, indice: 0, acertos: 0, respondeu: false, selecionadas, respostas: [], tempoInicio: Date.now() };
  mostrarTela('quizScreen');
  _startQuizTimer();
  mostrarQuestao();
}

/* ==========================
   EXIBIÇÃO DAS QUESTÕES
========================== */
function mostrarQuestao() {
  const state = window.quizState;
  const q = state.banco[state.indice];
  const screen = _getSec('quizScreen');

  screen.classList.remove('fadeIn');
  screen.classList.add('fadeOut');

  setTimeout(() => {
    EL.pergunta().textContent = q.p;
    _criarBotoesOpcoes(q.o, selecionarResposta, EL.respostas());
    EL.explicacao().textContent = '';
    EL.nextBtn().style.display = 'none';
    EL.contador().textContent = `Questão ${state.indice + 1} de ${state.banco.length}`;
    EL.progress().style.width = `${(state.indice / state.banco.length) * 100}%`;

    screen.classList.remove('fadeOut');
    screen.classList.add('fadeIn');
    state.respondeu = false;
  }, 300);
}

/* ==========================
   SELEÇÃO DE RESPOSTAS
========================== */
function selecionarResposta(valor) {
  const state = window.quizState;
  if (state.respondeu) return;

  const botoes = EL.respostas().querySelectorAll('.optionBtn');
  botoes.forEach(b => b.classList.remove('selected'));
  botoes[valor]?.classList.add('selected');

  const questao = state.banco[state.indice];
  const acertou = valor === questao.c;

  EL.explicacao().textContent = (acertou ? '✅ Correto! ' : '❌ Errado! ') + questao.e;
  if (acertou) state.acertos++;

  state.respostas.push({
    disciplina: questao.disciplina,
    pergunta: questao.p,
    escolhida: questao.o[valor],
    correta: questao.o[questao.c],
    acertou
  });
  state.respondeu = true;
  EL.nextBtn().style.display = 'inline-block';
}

$('nextBtn').addEventListener('click', () => {
  const state = window.quizState;
  if (++state.indice < state.banco.length) mostrarQuestao();
  else mostrarResultado();
});

/* ==========================
   RESULTADO FINAL (QUIZ)
========================== */
function mostrarResultado() {
  _stopQuizTimer();
  const state = window.quizState;
  mostrarTela('endScreen');

  EL.resultado().textContent =
    `${state.nome}, você acertou ${state.acertos} de ${state.banco.length} questões (${state.dificuldade}).`;

  const erradas = state.banco.filter((q, i) => state.respostas[i] && !state.respostas[i].acertou);
  if (erradas.length) mdSalvarErros(erradas);

  mdRegistrarHistorico(state.respostas);
  mdSalvarRanking(state.nome, state.acertos, state.banco.length, state.dificuldade, state.selecionadas);
  mostrarRanking();
  atualizarBotaoRevisao();
}

/* ==========================
   RANKING
========================== */
function mostrarRanking() {
  const rankingDiv = $('ranking');
  const frag = document.createDocumentFragment();

  ['facil', 'medio', 'dificil'].forEach(nivel => {
    const ranking = mdGetRanking(nivel);
    if (!ranking.length) return;

    const wrapper = document.createElement('div');
    const medals = ['🥇','🥈','🥉'];

    let html = `<h3>Ranking ${nivel.toUpperCase()}</h3>
    <table class="rankingTable">
      <tr><th>Posição</th><th>Nome</th><th>Resultado</th><th>Disciplinas</th></tr>`;

    ranking.forEach((r, i) => {
      html += `<tr>
        <td>${medals[i] ?? i + 1}</td>
        <td>${r.nome}</td>
        <td>${r.acertos}/${r.total}</td>
        <td>${r.disciplinas.join(', ')}</td>
      </tr>`;
    });
    html += '</table>';
    wrapper.innerHTML = html;
    frag.appendChild(wrapper);
  });

  rankingDiv.innerHTML = '';
  rankingDiv.appendChild(frag);
}

function limparRanking() {
  mdLimparRanking();
  mostrarRanking();
  alert('Ranking limpo com sucesso!');
}

/* ==========================
   SIMULADO — CONFIGURAÇÃO
========================== */
let simQtdPorDisciplina = 10;

function ajustarQtd(delta) {
  simQtdPorDisciplina = Math.max(5, Math.min(30, simQtdPorDisciplina + delta));
  $('simQtd').textContent = simQtdPorDisciplina;
  atualizarResumoSimulado();
}

function atualizarResumoSimulado() {
  const selecionadas = Array.from(document.querySelectorAll('.sim-check:checked')).map(cb => cb.value);
  const resumo = $('simResumo');
  if (!selecionadas.length) { resumo.innerHTML = ''; return; }

  const total = selecionadas.length * simQtdPorDisciplina;
  resumo.innerHTML = `
    <div class="resumo-box">
      📚 <strong>${selecionadas.length}</strong> disciplina(s) selecionada(s)<br>
      ❓ <strong>${total}</strong> questões no total<br>
      ⏱ Tempo estimado: <strong>~${Math.ceil(total * 1.5)} min</strong>
    </div>`;
}

document.addEventListener('change', e => {
  if (e.target.classList.contains('sim-check')) atualizarResumoSimulado();
});

/* ==========================
   SIMULADO — INÍCIO
========================== */
function iniciarSimulado() {
  const nome = $('simNome').value.trim();
  const dificuldade = $('simDificuldade').value;
  const selecionadas = Array.from(document.querySelectorAll('.sim-check:checked')).map(cb => cb.value);

  if (!nome) { alert('Digite seu nome!'); return; }
  if (!selecionadas.length) { alert('Selecione pelo menos uma disciplina!'); return; }

  let banco = [];
  selecionadas.forEach(disc => {
    let questoes = bancoDeDados[disc] ? [...bancoDeDados[disc]] : [];
    if (dificuldade !== 'mista') questoes = questoes.filter(q => q.d === dificuldade);
    mdShuffle(questoes);
    questoes.slice(0, simQtdPorDisciplina).forEach(q => banco.push({ ...q, disciplina: disc }));
  });

  if (!banco.length) { alert('Nenhuma questão disponível para essa configuração!'); return; }
  mdShuffle(banco);

  window.simState = {
    nome, dificuldade, selecionadas, banco,
    indice: 0, acertos: 0, respondeu: false,
    respostas: [], tempoInicio: Date.now()
  };

  mostrarTela('simQuizScreen');
  _startSimTimer();
  mostrarQuestaoSimulado();
}

/* ==========================
   SIMULADO — TIMER (rAF)
========================== */
let _simRafId = null;
let _simTimerEl = null;
let _simLastSec = -1;

function _startSimTimer() {
  _stopSimTimer();
  _simTimerEl = EL.simTimer();
  _simLastSec = -1;

  function tick() {
    const elapsed = Math.floor((Date.now() - window.simState.tempoInicio) / 1000);
    if (elapsed !== _simLastSec) {
      _simLastSec = elapsed;
      _simTimerEl.textContent = `⏱ ${mdFormatTime(elapsed)}`;
    }
    _simRafId = requestAnimationFrame(tick);
  }
  _simRafId = requestAnimationFrame(tick);
}

function _stopSimTimer() {
  if (_simRafId) { cancelAnimationFrame(_simRafId); _simRafId = null; }
  // fallback legado
  if (window.simTimerInterval) { clearInterval(window.simTimerInterval); window.simTimerInterval = null; }
}

/* ==========================
   QUIZ — TIMER (rAF)
========================== */
let _quizRafId = null;
let _quizLastSec = -1;

function _startQuizTimer() {
  if (_quizRafId) cancelAnimationFrame(_quizRafId);
  _quizLastSec = -1;
  const timerEl = EL.timer();
  function tick() {
    const elapsed = Math.floor((Date.now() - window.quizState.tempoInicio) / 1000);
    if (elapsed !== _quizLastSec) {
      _quizLastSec = elapsed;
      if (timerEl) timerEl.textContent = `⏱ ${mdFormatTime(elapsed)}`;
    }
    _quizRafId = requestAnimationFrame(tick);
  }
  _quizRafId = requestAnimationFrame(tick);
}

function _stopQuizTimer() {
  if (_quizRafId) { cancelAnimationFrame(_quizRafId); _quizRafId = null; }
}

/* ==========================
   SIMULADO — QUESTÃO
========================== */
function mostrarQuestaoSimulado() {
  const state = window.simState;
  const q = state.banco[state.indice];

  EL.simContador().textContent = `Questão ${state.indice + 1} de ${state.banco.length}`;
  EL.progress2().style.width = `${(state.indice / state.banco.length) * 100}%`;
  EL.simDiscTag().textContent = MD_DISCIPLINAS[q.disciplina] || q.disciplina;
  EL.simPergunta().textContent = q.p;

  _criarBotoesOpcoes(q.o, selecionarRespostaSimulado, EL.simRespostas());
  EL.simExplicacao().textContent = '';
  EL.simNextBtn().style.display = 'none';
  state.respondeu = false;
}

/* ==========================
   SIMULADO — RESPOSTA
========================== */
function selecionarRespostaSimulado(valor) {
  const state = window.simState;
  if (state.respondeu) return;

  const botoes = EL.simRespostas().querySelectorAll('.optionBtn');
  botoes.forEach(b => b.classList.remove('selected'));
  botoes[valor]?.classList.add('selected');

  const questao = state.banco[state.indice];
  const correta = valor === questao.c;
  if (correta) state.acertos++;

  EL.simExplicacao().textContent = (correta ? '✅ Correto! ' : '❌ Errado! ') + questao.e;
  state.respostas.push({
    disciplina: questao.disciplina,
    pergunta: questao.p,
    escolhida: questao.o[valor],
    correta: questao.o[questao.c],
    acertou: correta,
    questaoObj: questao
  });

  state.respondeu = true;
  EL.simNextBtn().style.display = 'inline-block';
}

$('simNextBtn').addEventListener('click', () => {
  const state = window.simState;
  if (++state.indice < state.banco.length) mostrarQuestaoSimulado();
  else mostrarResultadoSimulado();
});

/* ==========================
   SIMULADO — RESULTADO
========================== */
function mostrarResultadoSimulado() {
  _stopSimTimer();

  const state = window.simState;
  mostrarTela('simEndScreen');
  mdRegistrarHistorico(state.respostas);

  const erradas = state.respostas.filter(r => !r.acertou && r.questaoObj).map(r => r.questaoObj);
  if (erradas.length) mdSalvarErros(erradas);
  atualizarBotaoRevisao();

  const pct = Math.round((state.acertos / state.banco.length) * 100);
  const elapsed = Math.floor((Date.now() - state.tempoInicio) / 1000);

  EL.simResultGeral().innerHTML = `
    <strong>${state.nome}</strong>, você acertou <strong>${state.acertos}</strong> de <strong>${state.banco.length}</strong> questões
    — <strong>${pct}%</strong> de aproveitamento<br>
    ⏱ Tempo total: ${Math.floor(elapsed / 60)}min ${elapsed % 60}s`;

  // Resultado por disciplina — tudo em frag para um único reflow
  const porDisc = {};
  state.respostas.forEach(r => {
    if (!porDisc[r.disciplina]) porDisc[r.disciplina] = { acertos: 0, total: 0 };
    porDisc[r.disciplina].total++;
    if (r.acertou) porDisc[r.disciplina].acertos++;
  });

  const frag = document.createDocumentFragment();
  const titulo = document.createElement('h3');
  titulo.textContent = '📚 Por Disciplina';
  frag.appendChild(titulo);

  const grid = document.createElement('div');
  grid.className = 'disc-grid';

  Object.entries(porDisc).forEach(([disc, dados]) => {
    const p = Math.round((dados.acertos / dados.total) * 100);
    const cor = p >= 70 ? '#00ff99' : p >= 50 ? '#ffd700' : '#ff4444';
    const card = document.createElement('div');
    card.className = 'disc-card';
    card.style.borderColor = cor;
    card.innerHTML = `
      <strong>${MD_DISCIPLINAS[disc] || disc}</strong><br>
      ${dados.acertos}/${dados.total} — <span style="color:${cor}">${p}%</span>
      <div class="disc-bar"><div style="width:${p}%;background:${cor}"></div></div>`;
    grid.appendChild(card);
  });

  frag.appendChild(grid);
  const discEl = EL.simResultDisc();
  discEl.innerHTML = '';
  discEl.appendChild(frag);

  // Gabarito
  const totalErros = state.respostas.filter(r => !r.acertou).length;
  EL.simGabarito().innerHTML = `
  <details class="gabarito" id="gabaritoDetails">
    <summary>📄 Ver Gabarito Completo</summary>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:14px 0 10px;">
      <button id="gabFiltroTodos" onclick="filtrarGabarito('todos')"
        style="padding:7px 20px;font-size:13px;border-radius:25px;cursor:pointer;border:1px solid rgba(0,245,255,0.4);background:rgba(0,245,255,0.15);color:#00f5ff;transition:all .2s;">
        📋 Todas (${state.respostas.length})
      </button>
      <button id="gabFiltroErros" onclick="filtrarGabarito('erros')"
        style="padding:7px 20px;font-size:13px;border-radius:25px;cursor:pointer;border:1px solid rgba(255,68,68,0.4);background:rgba(255,68,68,0.08);color:#ff4444;transition:all .2s;">
        ❌ Só Erros (${totalErros})
      </button>
    </div>
    <table class="rankingTable" id="gabaritoTabela" style="margin-top:4px">
      <thead><tr><th>#</th><th>Disciplina</th><th>Pergunta</th><th>Sua resposta</th><th>Correta</th><th>✓</th></tr></thead>
      <tbody id="gabaritoCorpo"></tbody>
    </table>
  </details>`;

  window._simRespostas = state.respostas;
  filtrarGabarito('todos');
}

/* ==========================
   REVISÃO DE ERROS
========================== */
function atualizarBotaoRevisao() {
  const btn = $('btnRevisarErros');
  if (!btn) return;
  const count = mdContarErros();
  if (!count) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'inline-flex';
    btn.innerHTML = `🔁 Revisar Erros <span class="erros-badge">${count}</span>`;
  }
}

function abrirRevisao() {
  const erros = mdGetErros();
  if (!erros.length) { alert('Nenhum erro salvo para revisar. Continue praticando! 💪'); return; }

  const porDisc = {};
  erros.forEach(q => { porDisc[q.disciplina] = (porDisc[q.disciplina] || 0) + 1; });

  const frag = document.createDocumentFragment();
  Object.entries(porDisc).forEach(([disc, qtd]) => {
    const div = document.createElement('div');
    div.className = 'revisao-disc-item';
    div.innerHTML = `<span>${MD_DISCIPLINAS[disc] || disc}</span><span class="erros-badge">${qtd}</span>`;
    frag.appendChild(div);
  });

  const resumoEl = EL.revisaoResumoDisc();
  resumoEl.innerHTML = '';
  resumoEl.appendChild(frag);
  EL.revisaoTotal().textContent = erros.length;
  mostrarTela('revisaoScreen');
}

function iniciarRevisao() {
  const nome = ($('revisaoNome')?.value || '').trim();
  if (!nome) { alert('Digite seu nome para começar a revisão!'); return; }

  let banco = mdGetErros();
  if (!banco.length) { alert('Nenhum erro salvo!'); voltarInicio(); return; }
  mdShuffle(banco);

  window.revisaoState = { nome, banco, indice: 0, acertos: 0, respondeu: false, respostas: [], questoesAcertadas: [] };
  mostrarTela('revisaoQuizScreen');
  mostrarQuestaoRevisao();
}

function mostrarQuestaoRevisao() {
  const state = window.revisaoState;
  const q = state.banco[state.indice];

  EL.revisaoContador().textContent = `Questão ${state.indice + 1} de ${state.banco.length}`;
  EL.progressRevisao().style.width = `${(state.indice / state.banco.length) * 100}%`;
  EL.revisaoDiscTag().textContent = MD_DISCIPLINAS[q.disciplina] || q.disciplina;
  EL.revisaoPergunta().textContent = q.p;

  _criarBotoesOpcoes(q.o, selecionarRespostaRevisao, EL.revisaoRespostas());
  EL.revisaoExplicacao().textContent = '';
  EL.revisaoNextBtn().style.display = 'none';
  state.respondeu = false;
}

function selecionarRespostaRevisao(valor) {
  const state = window.revisaoState;
  if (state.respondeu) return;

  const botoes = EL.revisaoRespostas().querySelectorAll('.optionBtn');
  botoes.forEach(b => b.classList.remove('selected'));
  botoes[valor]?.classList.add('selected');

  const questao = state.banco[state.indice];
  const correta = valor === questao.c;
  if (correta) {
    state.acertos++;
    state.questoesAcertadas.push({ p: questao.p, disciplina: questao.disciplina });
  }

  EL.revisaoExplicacao().textContent = (correta ? '✅ Correto! ' : '❌ Errado! ') + questao.e;
  state.respostas.push({ disciplina: questao.disciplina, acertou: correta });
  state.respondeu = true;
  EL.revisaoNextBtn().style.display = 'inline-block';
}

$('revisaoNextBtn').addEventListener('click', () => {
  const state = window.revisaoState;
  if (++state.indice < state.banco.length) mostrarQuestaoRevisao();
  else mostrarResultadoRevisao();
});

function mostrarResultadoRevisao() {
  const state = window.revisaoState;
  state.questoesAcertadas.forEach(q => mdRemoverErro(q.p, q.disciplina));
  atualizarBotaoRevisao();
  mdRegistrarHistorico(state.respostas);
  mostrarTela('revisaoEndScreen');

  const pct = Math.round((state.acertos / state.banco.length) * 100);
  const restantes = mdContarErros();
  const cor = pct >= 70 ? '#00ff99' : pct >= 50 ? '#ffd700' : '#ff4444';

  EL.revisaoResultado().innerHTML = `
    <strong>${state.nome}</strong>, você acertou <strong>${state.acertos}</strong>
    de <strong>${state.banco.length}</strong> questões revisadas —
    <strong style="color:${cor}">${pct}%</strong><br><br>
    ${state.questoesAcertadas.length
      ? `<span style="color:#00ff99">✅ ${state.questoesAcertadas.length} questão(ões) removida(s) do banco de erros!</span>`
      : `<span style="color:#ff8c42">Nenhuma questão foi dominada desta vez. Continue tentando!</span>`
    }<br>
    ${restantes
      ? `<span style="color:#8ab4cc">📌 Ainda há <strong>${restantes}</strong> erro(s) para revisar.</span>`
      : `<span style="color:#00ff99">🎉 Banco de erros zerado! Você dominou todas as questões!</span>`
    }`;
}

function limparBancoErros() {
  if (confirm('Limpar todos os erros salvos? Esta ação não pode ser desfeita.')) {
    mdLimparErros();
    atualizarBotaoRevisao();
    mostrarTela('startScreen');
    alert('Banco de erros limpo com sucesso!');
  }
}

/* ==========================
   GABARITO — FILTRO
========================== */
function filtrarGabarito(modo) {
  const respostas = window._simRespostas || [];
  const corpo = $('gabaritoCorpo');
  if (!corpo) return;

  const btnTodos = $('gabFiltroTodos');
  const btnErros = $('gabFiltroErros');

  if (btnTodos && btnErros) {
    const ativo = modo === 'todos';
    btnTodos.style.cssText += ativo
      ? ';background:rgba(0,245,255,0.28);font-weight:700'
      : ';background:rgba(0,245,255,0.08);font-weight:400';
    btnErros.style.cssText += ativo
      ? ';background:rgba(255,68,68,0.08);font-weight:400'
      : ';background:rgba(255,68,68,0.28);font-weight:700';
  }

  const lista = modo === 'erros' ? respostas.filter(r => !r.acertou) : respostas;

  if (!lista.length) {
    corpo.innerHTML = `<tr><td colspan="6" style="color:#00ff99;padding:16px;">🎉 Nenhum erro! Gabarito perfeito!</td></tr>`;
    return;
  }

  // DocumentFragment para reflow único
  const frag = document.createDocumentFragment();
  lista.forEach(r => {
    const numOriginal = respostas.indexOf(r) + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${numOriginal}</td>
      <td>${MD_DISCIPLINAS[r.disciplina] || r.disciplina}</td>
      <td style="text-align:left">${r.pergunta}</td>
      <td style="color:${r.acertou ? '#00ff99' : '#ff4444'}">${r.escolhida}</td>
      <td>${r.correta}</td>
      <td>${r.acertou ? '✅' : '❌'}</td>`;
    frag.appendChild(tr);
  });
  corpo.innerHTML = '';
  corpo.appendChild(frag);
}

/* ==========================
   INIT
========================== */
mostrarRanking();
atualizarResumoSimulado();
atualizarBotaoRevisao();