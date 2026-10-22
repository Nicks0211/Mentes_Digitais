# 🧠 MENTES DIGITAIS

Plataforma de quiz e simulado para estudantes do Ensino Médio / ENEM.

---

## 📁 Estrutura do Projeto

```
mentes-digitais/
│
├── index.html          ← Quiz + Simulado (requer login)
├── login.html          ← Tela de login
├── cadastro.html       ← Cadastro de novo usuário
├── home.html           ← Dashboard do usuário
├── ranking.json        ← Arquivo de ranking (referência)
│
├── CSS/
│   └── style.css       ← Estilos globais (design tokens, componentes)
│
└── js/
    ├── api.js          ← ⭐ Módulo central: auth, usuário, ranking, utils
    ├── quiz.js         ← Lógica do Quiz e Simulado
    ├── videos_aulas.js ← Dados das videoaulas
    │
    └── questoes/       ← Bancos de questões por disciplina
        ├── matematica.js
        ├── portugues.js
        ├── biologia.js
        ├── fisica.js
        ├── quimica.js
        ├── historia.js
        ├── geografia.js
        ├── sociologia.js
        └── ingles.js
```

---

## 🚀 Como executar

Abra `login.html` em um servidor local (ex: Live Server no VS Code) ou direto no navegador.

> ⚠️ O projeto usa `localStorage` — não funciona se aberto diretamente via `file://` em alguns navegadores. Use um servidor local.

**Conta demo:** Na tela de login, cadastre um usuário ou use qualquer cadastro feito anteriormente.

---

## 🗂️ Arquivos e responsabilidades

### `js/api.js` — Módulo central
Exporta funções globais usadas por todas as páginas:

| Função | Descrição |
|--------|-----------|
| `requireAuth()` | Redireciona para login se não autenticado |
| `mdLogout()` | Faz logout com confirmação |
| `mdGetUser()` | Lê dados do usuário do localStorage |
| `mdSaveUser(data)` | Salva/atualiza dados do usuário |
| `mdSalvarRanking(...)` | Salva entrada no ranking |
| `mdGetRanking(nivel)` | Retorna ranking de um nível |
| `mdLimparRanking()` | Limpa todos os rankings |
| `mdFormatTime(seg)` | Formata segundos → `mm:ss` |
| `mdShuffle(arr)` | Embaralha array (Fisher-Yates) |
| `MD_DISCIPLINAS` | Mapeamento `chave → nome legível` |
| `mdShowNavUser()` | Exibe nome do usuário na navbar |

### `js/quiz.js` — Quiz & Simulado
Toda a lógica de navegação entre telas, exibição de questões, contagem de acertos, timer do simulado e exibição de resultados.

### `js/questoes/*.js`
Cada arquivo exporta um array `const <disciplina> = [...]` com objetos no formato:
```js
{
  p: "Pergunta",            // string
  o: ["A","B","C","D"],     // opções
  c: 0,                     // índice da opção correta
  e: "Explicação...",       // texto explicativo
  d: "facil"                // "facil" | "medio" | "dificil"
}
```

### `css/style.css`
Estilos globais com design tokens no `:root`. Inclui: navbar, container, botões, cards, barra de progresso, ranking, simulado, animações e responsivo.

### Acessibilidade
O botão **Acessibilidade**, disponível nas páginas principais, oferece alto contraste, ampliação da página, redução de animações e leitura em voz alta. As opções ficam salvas no navegador. Use **Alt + Shift + A** para abrir o painel pelo teclado. Nas videoaulas do YouTube, ative **Legendas/CC** no menu do player quando houver legendas disponíveis.

---

## ✨ Funcionalidades

- **Quiz**: selecione disciplinas + dificuldade e responda questões aleatórias
- **Simulado**: configure quantidade por disciplina, dificuldade e tempo estimado; ao final mostra gabarito completo e resultado por disciplina
- **Ranking**: top 5 por nível (fácil/médio/difícil), persistido no localStorage
- **Dashboard (home.html)**: estatísticas, atividade semanal, ranking, videoaulas
- **Videoaulas**: links para aulas no YouTube organizados por disciplina
- **Perfil**: edição de dados pessoais, avatar, preferências
- **Autenticação**: login/cadastro com validação, persistência via localStorage

---

## 🛠️ Tecnologias

- HTML5 + CSS3 puro
- JavaScript vanilla (ES6+)
- Fontes: Orbitron + Exo 2 (Google Fonts)
- Persistência: localStorage
- Sem dependências externas / sem framework

---

## 👨‍💻 Desenvolvedor

**Nicks0211** — [github.com/Nicks0211](https://github.com/Nicks0211)
