const biologia = [
  // Fáceis
  {p:"Unidade básica da vida:",o:["Célula","Tecido","Órgão","Sistema"],c:0,e:"A célula é a unidade básica da vida, presente em todos os seres vivos.",d:"facil"},
  {p:"DNA significa:",o:["Ácido ribonucleico","Ácido desoxirribonucleico","Proteína","Lipídio"],c:1,e:"DNA = ácido desoxirribonucleico, responsável por armazenar informações genéticas.",d:"facil"},
  {p:"RNA significa:",o:["Ácido ribonucleico","Ácido desoxirribonucleico","Proteína","Lipídio"],c:0,e:"RNA = ácido ribonucleico, atua na síntese de proteínas.",d:"facil"},
  {p:"Organelo responsável pela respiração celular:",o:["Mitocôndria","Cloroplasto","Núcleo","Ribossomo"],c:0,e:"A mitocôndria produz energia (ATP) através da respiração celular.",d:"facil"},
  {p:"Organelo responsável pela fotossíntese:",o:["Mitocôndria","Cloroplasto","Núcleo","Ribossomo"],c:1,e:"O cloroplasto realiza a fotossíntese, convertendo energia luminosa em química.",d:"facil"},
  {p:"Organelo responsável pela síntese de proteínas:",o:["Mitocôndria","Cloroplasto","Núcleo","Ribossomo"],c:3,e:"Os ribossomos são responsáveis pela síntese de proteínas.",d:"facil"},
  {p:"Organelo que armazena DNA:",o:["Mitocôndria","Cloroplasto","Núcleo","Ribossomo"],c:2,e:"O núcleo armazena o DNA, controlando as funções celulares.",d:"facil"},
  {p:"Organelo responsável pela digestão intracelular:",o:["Lisossomo","Mitocôndria","Cloroplasto","Ribossomo"],c:0,e:"O lisossomo contém enzimas que digerem substâncias dentro da célula.",d:"facil"},
  {p:"Organelo responsável pelo transporte de substâncias:",o:["Retículo endoplasmático","Mitocôndria","Cloroplasto","Ribossomo"],c:0,e:"O retículo endoplasmático transporta e armazena substâncias na célula.",d:"facil"},
  {p:"Organelo responsável pela secreção:",o:["Complexo de Golgi","Mitocôndria","Cloroplasto","Ribossomo"],c:0,e:"O Complexo de Golgi modifica e secreta proteínas e lipídios.",d:"facil"},

  // Médias
  {p:"Sistema que transporta sangue:",o:["Digestório","Respiratório","Circulatório","Nervoso"],c:2,e:"O sistema circulatório transporta sangue, oxigênio e nutrientes pelo corpo.",d:"medio"},
  {p:"Sistema que controla movimentos:",o:["Digestório","Respiratório","Circulatório","Nervoso"],c:3,e:"O sistema nervoso controla movimentos e funções corporais.",d:"medio"},
  {p:"Sistema que absorve nutrientes:",o:["Digestório","Respiratório","Circulatório","Nervoso"],c:0,e:"O sistema digestório absorve nutrientes dos alimentos.",d:"medio"},
  {p:"Sistema que realiza trocas gasosas:",o:["Digestório","Respiratório","Circulatório","Nervoso"],c:1,e:"O sistema respiratório realiza trocas de oxigênio e gás carbônico.",d:"medio"},
  {p:"Sistema que protege o corpo:",o:["Digestório","Respiratório","Circulatório","Tegumentar"],c:3,e:"O sistema tegumentar (pele) protege contra agentes externos.",d:"medio"},
  {p:"Sistema que produz hormônios:",o:["Digestório","Respiratório","Endócrino","Nervoso"],c:2,e:"O sistema endócrino produz e regula hormônios.",d:"medio"},
  {p:"Sistema que elimina resíduos:",o:["Digestório","Respiratório","Excretor","Nervoso"],c:2,e:"O sistema excretor elimina resíduos metabólicos, como a urina.",d:"medio"},
  {p:"Sistema que dá sustentação:",o:["Digestório","Respiratório","Circulatório","Esquelético"],c:3,e:"O sistema esquelético dá sustentação e proteção ao corpo.",d:"medio"},
  {p:"Sistema que permite movimento:",o:["Digestório","Respiratório","Muscular","Nervoso"],c:2,e:"O sistema muscular permite movimento e força.",d:"medio"},
  {p:"Sistema que produz gametas:",o:["Digestório","Respiratório","Reprodutor","Nervoso"],c:2,e:"O sistema reprodutor produz gametas (óvulos e espermatozoides).",d:"medio"},

  // Difíceis
  {p:"Meiose gera:",o:["Células iguais","Células haploides","Células diploides","Nenhuma"],c:1,e:"A meiose gera células haploides, reduzindo o número de cromossomos pela metade.",d:"dificil"},
  {p:"Mitose gera:",o:["Células iguais","Células haploides","Células diploides","Nenhuma"],c:0,e:"A mitose gera células iguais à célula-mãe, mantendo o número de cromossomos.",d:"dificil"},
  {p:"Fase da mitose em que cromossomos se alinham:",o:["Prófase","Metáfase","Anáfase","Telófase"],c:1,e:"Na metáfase, os cromossomos se alinham no centro da célula.",d:"dificil"},
  {p:"Fase da mitose em que cromátides se separam:",o:["Prófase","Metáfase","Anáfase","Telófase"],c:2,e:"Na anáfase, as cromátides irmãs se separam e vão para os polos opostos.",d:"dificil"},
  {p:"Fase da mitose em que núcleo se reorganiza:",o:["Prófase","Metáfase","Anáfase","Telófase"],c:3,e:"Na telófase, o núcleo se reorganiza e a célula se prepara para dividir.",d:"dificil"},
  {p:"Fase da mitose em que cromossomos aparecem:",o:["Prófase","Metáfase","Anáfase","Telófase"],c:0,e:"Na prófase, os cromossomos tornam-se visíveis pela condensação da cromatina.",d:"dificil"},
  {p:"Divisão celular que ocorre em células somáticas:",o:["Mitose","Meiose","Ambas","Nenhuma"],c:0,e:"A mitose ocorre em células somáticas, garantindo crescimento e reparo.",d:"dificil"},
  {p:"Divisão celular que ocorre em células germinativas:",o:["Mitose","Meiose","Ambas","Nenhuma"],c:1,e:"A meiose ocorre em células germinativas, formando gametas.",d:"dificil"},
  {p:"Processo que converte glicose em energia:",o:["Respiração celular","Fotossíntese","Fermentação","Digestão"],c:0,e:"A respiração celular converte glicose em energia (ATP).",d:"dificil"},
  {p:"Processo que converte energia luminosa em química:",o:["Respiração celular","Fotossíntese","Fermentação","Digestão"],c:1,e:"A fotossíntese converte energia luminosa em energia química (glicose).",d:"dificil"}
];

