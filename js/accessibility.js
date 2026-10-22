/* Preferências de acessibilidade compartilhadas entre todas as páginas. */
(function () {
  'use strict';

  const STORAGE_KEY = 'md_acessibilidade';
  const defaultMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let preferences = {
    contrast: false,
    zoom: 1,
    spacing: 1.2,
    speechRate: 1,
    reducedMotion: defaultMotion
  };
  let returnFocus = null;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    preferences = {
      contrast: Boolean(saved.contrast),
      zoom: Number.isFinite(saved.zoom) ? Math.min(1.5, Math.max(1, saved.zoom)) : 1,
      spacing: Number.isFinite(saved.spacing) ? Math.min(1.8, Math.max(1, saved.spacing)) : 1.2,
      speechRate: Number.isFinite(saved.speechRate)
        ? Math.min(1.5, Math.max(0.7, saved.speechRate))
        : 1,
      reducedMotion: typeof saved.reducedMotion === 'boolean'
        ? saved.reducedMotion
        : defaultMotion
    };
  } catch (_) {
    // As opções continuam disponíveis mesmo quando o navegador bloqueia o armazenamento.
  }

  function savePreferences() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (_) {
      announce('As opções foram aplicadas, mas não puderam ser salvas neste navegador.');
    }
  }

  function announce(message) {
    const status = document.getElementById('md-a11y-status');
    if (status) status.textContent = message;
  }

  function applyPreferences() {
    document.body.classList.toggle('md-high-contrast', preferences.contrast);
    document.body.classList.toggle('md-reduced-motion', preferences.reducedMotion);
    document.body.classList.toggle('md-a11y-line-spacing', preferences.spacing !== 1.2);
    document.body.classList.toggle(
      'md-login-accessible-scroll',
      Boolean(document.querySelector('.login-card')) && preferences.zoom > 1
    );
    document.documentElement.style.setProperty('--md-page-zoom', preferences.zoom);
    document.documentElement.style.setProperty('--md-line-height', preferences.spacing);

    const contrastButton = document.getElementById('md-a11y-contrast');
    const motionButton = document.getElementById('md-a11y-motion');
    const zoomLabel = document.getElementById('md-a11y-zoom-label');
    const zoomRange = document.getElementById('md-a11y-zoom-range');
    const spacingRange = document.getElementById('md-a11y-spacing-range');
    const spacingLabel = document.getElementById('md-a11y-spacing-label');
    const speechRateRange = document.getElementById('md-a11y-speech-rate');
    const speechRateLabel = document.getElementById('md-a11y-speech-rate-label');
    const preview = document.getElementById('md-a11y-preview-text');
    if (contrastButton) contrastButton.setAttribute('aria-pressed', String(preferences.contrast));
    if (motionButton) motionButton.setAttribute('aria-pressed', String(preferences.reducedMotion));
    if (zoomLabel) zoomLabel.textContent = Math.round(preferences.zoom * 100) + '%';
    if (zoomRange) zoomRange.value = String(Math.round(preferences.zoom * 100));
    if (spacingRange) spacingRange.value = String(Math.round(preferences.spacing * 100));
    if (spacingLabel) spacingLabel.textContent = Math.round(preferences.spacing * 100) + '%';
    if (speechRateRange) speechRateRange.value = String(Math.round(preferences.speechRate * 100));
    if (speechRateLabel) speechRateLabel.textContent = Math.round(preferences.speechRate * 100) + '%';
    if (preview) {
      preview.style.fontSize = (14 * preferences.zoom) + 'px';
      preview.style.lineHeight = String(preferences.spacing);
    }
  }

  function createWidget() {
    const primary = document.querySelector('main, .main, .container, .page, .wrapper');
    const skipLink = document.createElement('a');
    skipLink.className = 'md-a11y-skip';
    skipLink.href = '#md-a11y-main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    if (primary) {
      primary.id = primary.id || 'md-a11y-main';
      primary.setAttribute('tabindex', primary.getAttribute('tabindex') || '-1');
      if (!primary.matches('main, [role="main"]')) primary.setAttribute('role', 'main');
    } else {
      skipLink.hidden = true;
    }

    const widget = document.createElement('div');
    widget.id = 'md-accessibility';
    widget.innerHTML = `
      <button class="md-a11y-launcher" id="md-a11y-open"
        type="button" aria-expanded="false" aria-controls="md-a11y-panel">
        Acessibilidade
      </button>
      <section class="md-a11y-panel" id="md-a11y-panel" aria-label="Opções de acessibilidade" hidden>
        <div class="md-a11y-heading">
          <h2>Opções de acessibilidade</h2>
          <button class="md-a11y-close" id="md-a11y-close" type="button" aria-label="Fechar opções">×</button>
        </div>
        <div class="md-a11y-group">
          <label class="md-a11y-label" for="md-a11y-zoom-range">Tamanho do texto</label>
          <div class="md-a11y-zoom">
            <button class="md-a11y-control" id="md-a11y-zoom-out" type="button" aria-label="Diminuir tamanho do texto">A−</button>
            <output id="md-a11y-zoom-label" for="md-a11y-zoom-range" aria-live="polite">100%</output>
            <button class="md-a11y-control" id="md-a11y-zoom-in" type="button" aria-label="Aumentar tamanho do texto">A+</button>
          </div>
          <input class="md-a11y-range" id="md-a11y-zoom-range" type="range" min="100" max="150" step="5" value="100">
        </div>
        <div class="md-a11y-group">
          <label class="md-a11y-label" for="md-a11y-spacing-range">Espaçamento entre linhas</label>
          <input class="md-a11y-range" id="md-a11y-spacing-range" type="range" min="100" max="180" step="10" value="120">
          <output class="md-a11y-output" id="md-a11y-spacing-label" for="md-a11y-spacing-range" aria-live="polite">120%</output>
        </div>
        <button class="md-a11y-option" id="md-a11y-contrast" type="button" aria-pressed="false">
          <span>Alto contraste</span><span aria-hidden="true">◐</span>
        </button>
        <button class="md-a11y-option" id="md-a11y-motion" type="button" aria-pressed="false">
          <span>Reduzir animações</span><span aria-hidden="true">Ⅱ</span>
        </button>
        <button class="md-a11y-option md-a11y-speech" id="md-a11y-speech" type="button">
          <span id="md-a11y-speech-label">Ler esta página em voz alta</span><span aria-hidden="true">▶</span>
        </button>
        <div class="md-a11y-group">
          <label class="md-a11y-label" for="md-a11y-speech-rate">Velocidade da leitura</label>
          <input class="md-a11y-range" id="md-a11y-speech-rate" type="range" min="70" max="150" step="10" value="100">
          <output class="md-a11y-output" id="md-a11y-speech-rate-label" for="md-a11y-speech-rate" aria-live="polite">100%</output>
        </div>
        <div class="md-a11y-preview">
          <span class="md-a11y-label">Prévia ao vivo</span>
          <p id="md-a11y-preview-text">Este texto mostra como ficam a ampliação e o espaçamento.</p>
        </div>
        <button class="md-a11y-reset" id="md-a11y-reset" type="button">Restaurar opções padrão</button>
        <p class="md-a11y-captions">
          <strong>Videoaulas:</strong> no YouTube, ative <strong>Legendas/CC</strong> no menu ⚙️ quando disponível.
        </p>
        <p class="md-a11y-note">Suas opções ficam salvas neste navegador. Atalho: Alt + Shift + A.</p>
        <p class="md-a11y-status" id="md-a11y-status" role="status" aria-live="polite"></p>
      </section>`;

    document.body.insertBefore(skipLink, document.body.firstChild);
    document.body.appendChild(widget);

    const panel = document.getElementById('md-a11y-panel');
    const openButton = document.getElementById('md-a11y-open');
    const closeButton = document.getElementById('md-a11y-close');
    const speechButton = document.getElementById('md-a11y-speech');
    const speechLabel = document.getElementById('md-a11y-speech-label');
    let reading = false;

    function closePanel() {
      panel.hidden = true;
      openButton.setAttribute('aria-expanded', 'false');
      if (returnFocus) returnFocus.focus();
    }

    function stopReading() {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      reading = false;
      speechLabel.textContent = 'Ler esta página em voz alta';
      speechButton.setAttribute('aria-pressed', 'false');
    }

    openButton.addEventListener('click', function () {
      returnFocus = openButton;
      panel.hidden = !panel.hidden;
      openButton.setAttribute('aria-expanded', String(!panel.hidden));
      if (panel.hidden) openButton.focus();
      else closeButton.focus();
    });
    closeButton.addEventListener('click', closePanel);

    function updateZoom(value) {
      preferences.zoom = Math.min(1.5, Math.max(1, Number(value)));
      applyPreferences();
      savePreferences();
      announce('Texto ampliado para ' + Math.round(preferences.zoom * 100) + '%.');
    }

    document.getElementById('md-a11y-zoom-range').addEventListener('input', function (event) {
      updateZoom(event.target.value / 100);
    });
    document.getElementById('md-a11y-spacing-range').addEventListener('input', function (event) {
      preferences.spacing = Number(event.target.value) / 100;
      applyPreferences();
      savePreferences();
      announce('Espaçamento entre linhas: ' + event.target.value + '%.');
    });
    document.getElementById('md-a11y-speech-rate').addEventListener('input', function (event) {
      preferences.speechRate = Number(event.target.value) / 100;
      applyPreferences();
      savePreferences();
      announce('Velocidade da leitura: ' + event.target.value + '%.');
    });
    document.getElementById('md-a11y-contrast').addEventListener('click', function () {
      preferences.contrast = !preferences.contrast;
      applyPreferences();
      savePreferences();
      announce(preferences.contrast ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
    });
    document.getElementById('md-a11y-motion').addEventListener('click', function () {
      preferences.reducedMotion = !preferences.reducedMotion;
      applyPreferences();
      savePreferences();
      announce(preferences.reducedMotion ? 'Animações reduzidas.' : 'Animações restauradas.');
    });
    document.getElementById('md-a11y-zoom-in').addEventListener('click', function () {
      updateZoom(preferences.zoom + 0.05);
    });
    document.getElementById('md-a11y-zoom-out').addEventListener('click', function () {
      updateZoom(preferences.zoom - 0.05);
    });
    document.getElementById('md-a11y-reset').addEventListener('click', function () {
      preferences = {
        contrast: false,
        zoom: 1,
        spacing: 1.2,
        speechRate: 1,
        reducedMotion: defaultMotion
      };
      applyPreferences();
      savePreferences();
      stopReading();
      announce('Opções padrão restauradas.');
    });
    speechButton.addEventListener('click', function () {
      if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
        announce('A leitura em voz alta não está disponível neste navegador.');
        return;
      }
      if (reading) {
        stopReading();
        announce('Leitura interrompida.');
        return;
      }

      const content = document.querySelector('main, .main, .container, .page, .wrapper') || document.body;
      const text = content.innerText
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 12000);
      if (!text) {
        announce('Não há texto disponível para leitura nesta página.');
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = preferences.speechRate;
      utterance.onend = function () {
        reading = false;
        speechLabel.textContent = 'Ler esta página em voz alta';
        speechButton.setAttribute('aria-pressed', 'false');
        announce('Leitura concluída.');
      };
      utterance.onerror = function () {
        reading = false;
        speechLabel.textContent = 'Ler esta página em voz alta';
        speechButton.setAttribute('aria-pressed', 'false');
        announce('Não foi possível ler a página em voz alta.');
      };
      reading = true;
      speechLabel.textContent = 'Parar leitura';
      speechButton.setAttribute('aria-pressed', 'true');
      announce('Leitura da página iniciada.');
      window.speechSynthesis.speak(utterance);
    });
    document.addEventListener('keydown', function (event) {
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        openButton.click();
      } else if (event.key === 'Escape' && !panel.hidden) {
        closePanel();
      }
    });

    skipLink.addEventListener('click', function () {
      if (primary) primary.focus();
    });
    applyPreferences();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget, { once: true });
  } else {
    createWidget();
  }
})();