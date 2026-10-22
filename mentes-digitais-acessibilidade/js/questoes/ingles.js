const ingles = [
  // Fáceis
  {p:"What is the plural of 'child'?",o:["Childs","Childrens","Children","Childes"],c:2,e:"'Child' tem plural irregular: 'children'. Não segue a regra do -s.",d:"facil"},
  {p:"Translate: 'Cachorro'",o:["Cat","Dog","Bird","Fish"],c:1,e:"'Dog' significa cachorro em inglês.",d:"facil"},
  {p:"Which is a verb?",o:["Beautiful","Quickly","Run","Happiness"],c:2,e:"'Run' é um verbo (correr). Os outros são adjetivo, advérbio e substantivo.",d:"facil"},
  {p:"Translate: 'Obrigado'",o:["Please","Sorry","Thank you","Welcome"],c:2,e:"'Thank you' significa obrigado/a em inglês.",d:"facil"},
  {p:"What color is 'azul' in English?",o:["Green","Red","Yellow","Blue"],c:3,e:"'Blue' significa azul em inglês.",d:"facil"},
  {p:"What is the opposite of 'hot'?",o:["Warm","Cool","Cold","Freeze"],c:2,e:"O oposto de 'hot' (quente) é 'cold' (frio).",d:"facil"},
  {p:"Choose the correct article: '___ apple'",o:["A","An","The","No article"],c:1,e:"Usa-se 'an' antes de palavras que começam com som de vogal, como 'apple'.",d:"facil"},
  {p:"Translate: 'Escola'",o:["Hospital","Library","School","Market"],c:2,e:"'School' significa escola em inglês.",d:"facil"},
  {p:"What number is 'fifteen'?",o:["13","14","15","16"],c:2,e:"'Fifteen' é o número 15 em inglês.",d:"facil"},
  {p:"Which word means 'grande'?",o:["Small","Tall","Big","Short"],c:2,e:"'Big' significa grande em inglês.",d:"facil"},

  // Médias
  {p:"Choose the correct form: 'She ___ to school every day.'",o:["go","goes","going","gone"],c:1,e:"Com sujeito na 3ª pessoa do singular (She/He/It), o verbo recebe -s ou -es: 'goes'.",d:"medio"},
  {p:"What is the past tense of 'go'?",o:["Goed","Goes","Went","Gone"],c:2,e:"O passado irregular de 'go' é 'went'. É um dos verbos mais importantes em inglês.",d:"medio"},
  {p:"Which sentence is correct?",o:["I am go to school","I going to school","I am going to school","I goes to school"],c:2,e:"O presente contínuo usa: sujeito + am/is/are + verbo-ing. 'I am going to school' está correto.",d:"medio"},
  {p:"What does 'however' mean?",o:["Portanto","Também","No entanto","Além disso"],c:2,e:"'However' é uma conjunção adversativa que significa 'no entanto' ou 'porém'.",d:"medio"},
  {p:"Complete: 'If it rains, I ___ stay home.'",o:["will","would","am","was"],c:0,e:"No primeiro condicional (situação real), usa-se 'will' na oração principal.",d:"medio"},
  {p:"What is the comparative of 'good'?",o:["Gooder","More good","Better","Best"],c:2,e:"'Good' tem comparativo irregular: 'better' (melhor). O superlativo é 'best'.",d:"medio"},
  {p:"Choose the correct question tag: 'You like pizza, ___?'",o:["do you","don't you","are you","aren't you"],c:1,e:"Question tags negativas são usadas com frases afirmativas: 'don't you'.",d:"medio"},
  {p:"What tense is: 'I have studied English for 3 years.'",o:["Simple Past","Present Perfect","Past Perfect","Future"],c:1,e:"'Have + particípio' forma o Present Perfect, usado para ações com ligação ao presente.",d:"medio"},
  {p:"Which is a conjunction?",o:["Quickly","Although","Beautiful","Running"],c:1,e:"'Although' é uma conjunção (embora). Conjunções conectam orações ou palavras.",d:"medio"},
  {p:"What does 'throughout' mean?",o:["Através de / durante todo","Embora","Portanto","Antes de"],c:0,e:"'Throughout' significa 'ao longo de' ou 'por todo', indicando extensão de tempo ou espaço.",d:"medio"},

  // Difíceis
  {p:"Identify the passive voice: 'The book ___ written by her.'",o:["is","was","has","did"],c:1,e:"A voz passiva no passado simples usa 'was/were + particípio': 'was written'.",d:"dificil"},
  {p:"Choose the correct form: 'I wish I ___ taller.'",o:["am","was","were","be"],c:2,e:"Após 'wish' (desejo irreal), usa-se 'were' para todos os sujeitos no subjuntivo.",d:"dificil"},
  {p:"What does 'albeit' mean?",o:["Embora","Portanto","Além disso","Enquanto"],c:0,e:"'Albeit' é uma conjunção formal que significa 'embora' ou 'apesar de'.",d:"dificil"},
  {p:"'Had she known, she ___ helped.' Complete correctly.",o:["would help","would have helped","will help","helps"],c:1,e:"No terceiro condicional (passado hipotético), usa-se 'would have + particípio'.",d:"dificil"},
  {p:"Which sentence uses the subjunctive correctly?",o:["I suggest that he goes","I suggest that he go","I suggest that he is going","I suggest that he went"],c:1,e:"O subjuntivo em inglês usa o verbo na forma base: 'I suggest that he go'.",d:"dificil"},
  {p:"What is the meaning of 'notwithstanding'?",o:["Apesar de","Portanto","Além de","Enquanto"],c:0,e:"'Notwithstanding' é uma preposição/conjunção formal que significa 'apesar de' ou 'não obstante'.",d:"dificil"},
  {p:"Choose the correct reported speech: He said 'I am tired.'",o:["He said he is tired","He said he was tired","He said he were tired","He said he be tired"],c:1,e:"No discurso indireto, o presente simples recua para o passado: 'am' → 'was'.",d:"dificil"},
  {p:"Which word is a gerund in: 'Swimming is healthy'?",o:["Is","Healthy","Swimming","None"],c:2,e:"'Swimming' é um gerúndio — o verbo 'swim' + -ing funcionando como substantivo sujeito.",d:"dificil"},
  {p:"'The more you study, ___ you learn.' Complete.",o:["the more","more","most","the most"],c:0,e:"A estrutura 'the more... the more...' expressa proporção em inglês.",d:"dificil"},
  {p:"What does 'hitherto' mean?",o:["Até agora","Portanto","No entanto","Além disso"],c:0,e:"'Hitherto' é um advérbio formal que significa 'até agora' ou 'até então'.",d:"dificil"}
];

