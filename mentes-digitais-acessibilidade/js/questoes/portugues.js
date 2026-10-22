const portugues = [
  // Fáceis
  {p:"Figura de exagero:",o:["Metáfora","Hipérbole","Ironia","Antítese"],c:1,e:"Hipérbole é a figura que exagera uma ideia ou expressão.",d:"facil"},
  {p:"Denotação:",o:["Figurado","Literal","Duplo","Irônico"],c:1,e:"Denotação é o sentido literal, o significado real das palavras.",d:"facil"},
  {p:"Plural de 'cão':",o:["Cães","Cãos","Cãeses","Cãons"],c:0,e:"O plural correto de 'cão' é 'cães'.",d:"facil"},
  {p:"Antônimo de 'feliz':",o:["Alegre","Triste","Contente","Satisfeito"],c:1,e:"O antônimo de 'feliz' é 'triste'.",d:"facil"},
  {p:"Qual é o sujeito em 'Os alunos estudam'?",o:["Os alunos","Estudam","Alunos","Nenhum"],c:0,e:"O sujeito é 'os alunos', pois são eles que realizam a ação.",d:"facil"},
  {p:"Verbo em 'Maria canta bem':",o:["Maria","Canta","Bem","Canta bem"],c:1,e:"O verbo é 'canta', que indica a ação realizada por Maria.",d:"facil"},
  {p:"Adjetivo em 'Casa bonita':",o:["Casa","Bonita","Casa bonita","Nenhum"],c:1,e:"O adjetivo é 'bonita', pois caracteriza o substantivo 'casa'.",d:"facil"},
  {p:"Qual é o aumentativo de 'casa'?",o:["Casinha","Casão","Casita","Casal"],c:1,e:"O aumentativo de 'casa' é 'casão'.",d:"facil"},
  {p:"Qual é o diminutivo de 'flor'?",o:["Florinha","Florzinha","Floreta","Florita"],c:1,e:"O diminutivo de 'flor' é 'florzinha'.",d:"facil"},
  {p:"Qual é o gênero textual de uma receita?",o:["Narrativo","Descritivo","Instrucional","Argumentativo"],c:2,e:"Uma receita é um gênero instrucional, pois ensina como fazer algo.",d:"facil"},

  // Médias
  {p:"Conjunção adversativa:",o:["E","Mas","Ou","Logo"],c:1,e:"A conjunção 'mas' indica oposição, sendo adversativa.",d:"medio"},
  {p:"Texto dissertativo:",o:["Narrar","Argumentar","Descrever","Dialogar"],c:1,e:"O texto dissertativo argumenta e defende uma ideia.",d:"medio"},
  {p:"Qual é o sujeito oculto em 'Estudamos muito'?",o:["Nós","Eles","Vocês","Nenhum"],c:0,e:"O sujeito oculto é 'nós', indicado pela forma verbal 'estudamos'.",d:"medio"},
  {p:"Qual é a função da vírgula em 'João, venha cá'?",o:["Separar sujeito","Indicar vocativo","Indicar pausa","Separar verbo"],c:1,e:"A vírgula indica vocativo, chamando a pessoa pelo nome.",d:"medio"},
  {p:"Qual é o tempo verbal em 'Eu estudarei amanhã'?",o:["Presente","Passado","Futuro","Gerúndio"],c:2,e:"O verbo 'estudarei' está no futuro do presente.",d:"medio"},
  {p:"Qual é o modo verbal em 'Se eu fosse rico'?",o:["Indicativo","Subjuntivo","Imperativo","Gerúndio"],c:1,e:"O verbo 'fosse' está no modo subjuntivo, indicando hipótese.",d:"medio"},
  {p:"Qual é a figura de linguagem em 'O vento sussurra'?",o:["Metáfora","Personificação","Hipérbole","Ironia"],c:1,e:"Personificação: atribui características humanas a elementos da natureza.",d:"medio"},
  {p:"Qual é o gênero textual de uma notícia?",o:["Narrativo","Expositivo","Instrucional","Argumentativo"],c:1,e:"A notícia é um gênero expositivo, pois informa fatos.",d:"medio"},
  {p:"Qual é o tipo de discurso em 'Ele disse: vou embora'?",o:["Direto","Indireto","Indireto livre","Narrativo"],c:0,e:"É discurso direto, pois reproduz exatamente as palavras ditas.",d:"medio"},
  {p:"Qual é a função da conjunção 'porque'?",o:["Causa","Finalidade","Condição","Tempo"],c:0,e:"'Porque' indica causa, explicando o motivo da ação.",d:"medio"},

  // Difíceis
  {p:"Interpretação exige:",o:["Decorar","Analisar","Copiar","Ignorar"],c:1,e:"Interpretar exige análise e compreensão, não apenas decorar.",d:"dificil"},
  {p:"Qual é a figura em 'Estou morrendo de rir'?",o:["Metáfora","Hipérbole","Ironia","Antítese"],c:1,e:"É uma hipérbole, pois exagera a ideia de rir muito.",d:"dificil"},
  {p:"Qual é a função da oração em 'Estudo porque quero passar'?",o:["Principal","Subordinada causal","Subordinada temporal","Coordenada"],c:1,e:"A oração 'porque quero passar' é subordinada causal.",d:"dificil"},
  {p:"Qual é o tipo de sujeito em 'Há pessoas na sala'?",o:["Simples","Composto","Indeterminado","Inexistente"],c:3,e:"Com o verbo 'haver' no sentido de existir, o sujeito é inexistente.",d:"dificil"},
  {p:"Qual é a função da oração em 'Embora chova, sairemos'?",o:["Causal","Concessiva","Condicional","Temporal"],c:1,e:"'Embora chova' é oração subordinada concessiva.",d:"dificil"},
  {p:"Qual é a figura em 'O silêncio falou alto'?",o:["Metáfora","Personificação","Ironia","Antítese"],c:1,e:"Personificação: atribui ação humana ao silêncio.",d:"dificil"},
  {p:"Qual é o gênero textual de uma carta argumentativa?",o:["Narrativo","Instrucional","Argumentativo","Expositivo"],c:2,e:"A carta argumentativa pertence ao gênero argumentativo.",d:"dificil"},
  {p:"Qual é o tempo verbal em 'Se eu estudasse mais'?",o:["Presente","Futuro","Subjuntivo imperfeito","Gerúndio"],c:2,e:"O verbo 'estudasse' está no subjuntivo imperfeito.",d:"dificil"},
  {p:"Qual é a função da oração em 'Quero que você venha'?",o:["Principal","Subordinada substantiva objetiva direta","Adjetiva","Adverbial"],c:1,e:"'Que você venha' é oração subordinada substantiva objetiva direta.",d:"dificil"},
  {p:"Qual é a figura em 'Ele é um leão no trabalho'?",o:["Metáfora","Hipérbole","Ironia","Antítese"],c:0,e:"É uma metáfora, comparando o homem a um leão para indicar força.",d:"dificil"}
];

