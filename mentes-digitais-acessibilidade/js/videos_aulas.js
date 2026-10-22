const videoaulasData = [
  // MATEMÁTICA
  { disc: "matematica", titulo: "Função do 1º Grau (Função Afim) — Conceitos",url: "https://www.youtube.com/watch?v=hdMFlAv5GkU", nivel: "ENEM" },
  { disc: "matematica", titulo: "Função do 2º Grau",url: "https://www.youtube.com/watch?v=Z5aVW_Zgifk&list=PLTPg64KdGgYjXe1Gcc6ji-juawdTSouUU", nivel: "ENEM" },
  { disc: "matematica", titulo: "Probabilidade",url: "https://www.youtube.com/watch?v=iNCkGogNtKI", nivel: "ENEM" },
  { disc: "matematica", titulo: "Progressão Aritmética",url: "https://www.youtube.com/watch?v=BWwQa8c22Pw", nivel: "ENEM" },
  { disc: "matematica", titulo: "Trigonometria para o ENEM",url: "https://www.youtube.com/watch?v=C7NrVLmEYcs", nivel: "ENEM" },
  { disc: "matematica", titulo: "Logaritmos",url: "https://www.youtube.com/watch?v=hA9HecU1p9g", nivel: "ENEM" },

  // PORTUGUÊS
  { disc: "portugues", titulo: "Interpretação e compreensão textual",url: "https://www.youtube.com/watch?v=W3XrpIRTgzA", nivel: "ENEM" },
  { disc: "portugues", titulo: "Figuras de Linguagem — Aula 01",url: "https://www.youtube.com/watch?v=n0e75nRstcU", nivel: "ENEM" },
  { disc: "portugues", titulo: "Figuras de Linguagem — Aula 02",url: "https://www.youtube.com/watch?v=Hi-2LNNg4SE", nivel: "ENEM" },
  { disc: "portugues", titulo: "Sintaxe: Sujeito e Predicado",url: "https://www.youtube.com/watch?v=d3n-w6YHwOc", nivel: "ENEM" },
  { disc: "portugues", titulo: "Concordância Verbal e Nominal",url: "https://www.youtube.com/watch?v=IjVd1jviQrA", nivel: "ENEM" },
  { disc: "portugues", titulo: "Redação ENEM",url: "https://www.youtube.com/watch?v=mYmrLdf5AWE", nivel: "ENEM" },

  // BIOLOGIA
  { disc: "biologia", titulo: "DNA E RNA",url: "https://www.youtube.com/watch?v=4zarJk8j3rE", nivel: "ENEM" },
  { disc: "biologia", titulo: "Divisão Celular — Mitose e Meiose",url: "https://www.youtube.com/watch?v=-itsecqH25o", nivel: "ENEM" },
  { disc: "biologia", titulo: "Genética: Leis de Mendel",url: "https://www.youtube.com/watch?v=-Vv3USW7iRU", nivel: "ENEM" },
  { disc: "biologia", titulo: "Síntese de Proteína",url: "https://www.youtube.com/watch?v=JbzM3wtWOUU", nivel: "ENEM" },
  { disc: "biologia", titulo: "Fotossíntese e Respiração Celular",url: "https://www.youtube.com/watch?v=you08pxTph4", nivel: "ENEM" },
  { disc: "biologia", titulo: "Ecologia: Cadeias e Teias Alimentares",url: "https://www.youtube.com/watch?v=QPFeWfM_6fs", nivel: "ENEM" },

  // FÍSICA 
  { disc: "fisica", titulo: "Leis de Newton",url: "https://www.youtube.com/watch?v=wJwDTUL6fz0", nivel: "ENEM" },
  { disc: "fisica", titulo: "Segunda Lei de Newton",url: "https://www.youtube.com/watch?v=EvUXk6eu6Ds", nivel: "ENEM" },
  { disc: "fisica", titulo: "Cinemática: MRU e MRUV",url: "https://www.youtube.com/watch?v=4nbrPfeBbWY", nivel: "ENEM" },
  { disc: "fisica", titulo: "Circuitos Elétricos",url: "https://www.youtube.com/watch?v=tMGdMAtLWIY", nivel: "ENEM" },
  { disc: "fisica", titulo: "  Primeira Lei da Termodinâmica",url: "https://www.youtube.com/watch?v=U_2AJc1mcas", nivel: "ENEM" },
  { disc: "fisica", titulo: "Óptica Geométrica",url: "https://www.youtube.com/watch?v=kHYpjD6HYGs", nivel: "ENEM" },

  // QUÍMICA 
  { disc: "quimica", titulo: "Tabela Periódica Completa", url: "https://www.youtube.com/watch?v=Vsnq2hJ2UZc", nivel: "ENEM" },
  { disc: "quimica", titulo: "Ligações Químicas",url: "https://www.youtube.com/watch?v=FDnxddw0P1g", nivel: "ENEM" },
  { disc: "quimica", titulo: "Estequiometria",url: "https://www.youtube.com/watch?v=9PH2whlpg4o", nivel: "ENEM" },
  { disc: "quimica", titulo: "pH e pOH",url: "https://www.youtube.com/watch?v=2KCRv3mKaNs", nivel: "ENEM" },
  { disc: "quimica", titulo: "Reações Orgânicas",url: "https://www.youtube.com/watch?v=-tUrBm4Dfbw", nivel: "ENEM" },

  // HISTÓRIA 
  { disc: "historia", titulo: "A Primeira República do Brasil (República Velha)",url: "https://www.youtube.com/watch?v=RlF9YmjNkFs", nivel: "ENEM" },
  { disc: "historia", titulo: "Ditadura Militar no Brasil",url: "https://www.youtube.com/watch?v=Ux64F6jfSuo", nivel: "ENEM" },
  { disc: "historia", titulo: "Segunda Guerra Mundial",url: "https://www.youtube.com/watch?v=tZLILC19Nzg", nivel: "ENEM" },
  { disc: "historia", titulo: "Revolução Industrial",url: "https://www.youtube.com/watch?v=xD5jl8IatY0", nivel: "ENEM" },
  { disc: "historia", titulo: "Guerra Fria",url: "https://www.youtube.com/watch?v=6QOkLu4kOOI", nivel: "ENEM" },
  { disc: "historia", titulo: "Revolução Francesa",url: "https://www.youtube.com/watch?v=QGZQemPn1IY", nivel: "ENEM" },

  // GEOGRAFIA 
  { disc: "geografia", titulo: "Geopolítica Mundial",url: "https://www.youtube.com/watch?v=-qMB3e-d-Ow", nivel: "ENEM" },
  { disc: "geografia", titulo: "Climatologia e Biomas Brasileiros",url: "https://www.youtube.com/watch?v=WYkUVasw-DY", nivel: "ENEM" },
  { disc: "geografia", titulo: "Urbanização Brasileira", url: "https://www.youtube.com/watch?v=g-DEwpP2xuM", nivel: "ENEM" },
  { disc: "geografia", titulo: "COORDENADAS GEOGRÁFICAS - CARTOGRAFIA: PARALELOS, MERIDIANOS, LATITUDE, LOGITUDE, ZONAS CLIMÁTICAS", url: "https://www.youtube.com/watch?v=6WPETLFx5tE", nivel: "ENEM" },

  // SOCIOLOGIA
  { disc: "sociologia", titulo: "Marx, Weber e Durkheim",url: "https://www.youtube.com/watch?v=s9rk_2TbWAY", nivel: "ENEM" },
  { disc: "sociologia", titulo: "Identidade conceito e processo de construção",url: "https://www.youtube.com/watch?v=u8dUzolP-pU&t=308s", nivel: "ENEM" },
  { disc: "sociologia", titulo: "Movimentos Sociais",url: "https://www.youtube.com/watch?v=qVKlaY4QoAk", nivel: "ENEM" },
  { disc: "sociologia", titulo: "Estratificação e Desigualdade Social",url: "https://www.youtube.com/watch?v=zHMUzQhv9fM", nivel: "ENEM" },

  // INGLÊS
  { disc: "ingles", titulo: "Interpretação de Texto em Inglês",url: "https://www.youtube.com/watch?v=C-Mc6SlvrfM", nivel: "ENEM" },
  { disc: "ingles", titulo: "Tempos Verbais em Inglês",url: "https://www.youtube.com/watch?v=w1TbQEPP020", nivel: "ENEM" },
  { disc: "ingles", titulo: "Conheça essa Figura de Linguagem em Inglês",url: "https://www.youtube.com/watch?v=yM7PIfytTec", nivel: "ENEM" },
  { disc: "ingles", titulo: "PHRASAL VERBS – O QUE SÃO E COMO USAR?",url: "https://www.youtube.com/watch?v=1Jt1t3NyY84", nivel: "ENEM" },
];