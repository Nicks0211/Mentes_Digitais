const matematica = [
  // Fáceis
  {p:"Resolva: 2x + 5 = 15",o:["x=5","x=10","x=15","x=20"],c:0,e:"2x + 5 = 15 → 2x = 10 → x = 5.",d:"facil"},
  {p:"Calcule: √81",o:["7","8","9","10"],c:2,e:"A raiz quadrada de 81 é 9, pois 9×9 = 81.",d:"facil"},
  {p:"Soma dos ângulos internos de um triângulo?",o:["90°","120°","180°","360°"],c:2,e:"Todo triângulo tem soma dos ângulos internos igual a 180°.",d:"facil"},
  {p:"Resolva: 3x = 18",o:["x=3","x=6","x=9","x=12"],c:1,e:"3x = 18 → x = 6.",d:"facil"},
  {p:"Qual é 1/2 + 3/4?",o:["1","5/4","7/4","2"],c:1,e:"1/2 = 2/4 → 2/4 + 3/4 = 5/4.",d:"facil"},
  {p:"Calcule: 5²",o:["10","15","20","25"],c:3,e:"5² = 25, pois 5×5 = 25.",d:"facil"},
  {p:"Área de quadrado de lado 6 cm?",o:["12","24","36","48"],c:2,e:"Área = lado² → 6×6 = 36 cm².",d:"facil"},
  {p:"Resolva: x - 7 = 10",o:["x=13","x=15","x=17","x=20"],c:2,e:"x - 7 = 10 → x = 17.",d:"facil"},
  {p:"Raiz quadrada de 144?",o:["10","11","12","13"],c:2,e:"√144 = 12, pois 12×12 = 144.",d:"facil"},
  {p:"Valor de 2⁵?",o:["16","32","64","128"],c:1,e:"2⁵ = 32, pois 2×2×2×2×2 = 32.",d:"facil"},

  // Médias
  {p:"Resolva: x² - 9 = 0",o:["x=±2","x=±3","x=±4","x=±5"],c:1,e:"x² - 9 = 0 → x² = 9 → x = ±3.",d:"medio"},
  {p:"Calcule: log10(1000)",o:["1","2","3","4"],c:2,e:"log10(1000) = 3, pois 10³ = 1000.",d:"medio"},
  {p:"Área de círculo de raio 5 cm?",o:["25","25π","50","50π"],c:1,e:"Área = πr² → π×25 = 25π cm².",d:"medio"},
  {p:"Resolva: 2x² - 8 = 0",o:["x=±2","x=±3","x=±4","x=±5"],c:0,e:"2x² - 8 = 0 → x² = 4 → x = ±2.",d:"medio"},
  {p:"sen(30°)?",o:["0,25","0,5","√2/2","1"],c:1,e:"sen(30°) = 0,5.",d:"medio"},
  {p:"2/3 + 5/6?",o:["1","3/2","2","5/3"],c:1,e:"2/3 = 4/6 → 4/6 + 5/6 = 9/6 = 3/2.",d:"medio"},
  {p:"Resolva: x² + 5x + 6 = 0",o:["x=-1,-6","x=-2,-3","x=-3,-4","x=-1,-2"],c:1,e:"Fatorando: (x+2)(x+3)=0 → x=-2 ou -3.",d:"medio"},
  {p:"cos(60°)?",o:["0","0,25","0,5","√3/2"],c:2,e:"cos(60°) = 0,5.",d:"medio"},
  {p:"Volume de cubo de aresta 4 cm?",o:["16","32","64","128"],c:2,e:"Volume = lado³ → 4³ = 64 cm³.",d:"medio"},
  {p:"Resolva: 3x - 2 = 10",o:["x=3","x=4","x=5","x=6"],c:1,e:"3x - 2 = 10 → 3x = 12 → x = 4.",d:"medio"},

  // Difíceis
  {p:"Resolva: x² - 4x + 3 = 0",o:["x=1 ou 3","x=2 ou 4","x=-1 ou -3","x=0 ou 3"],c:0,e:"Fatorando: (x-1)(x-3)=0 → x=1 ou 3.",d:"dificil"},
  {p:"∫(2x) dx?",o:["x²+C","2x²+C","x³+C","2x³+C"],c:0,e:"Integral de 2x é x² + C.",d:"dificil"},
  {p:"Sistema: x+y=10; 2x-y=4",o:["x=4,y=6","x=5,y=5","x=14/3,y=16/3","x=3,y=7"],c:2,e:"Resolvendo: x=14/3 e y=16/3.",d:"dificil"},
  {p:"lim x→0 (sen(x)/x)?",o:["0","1","∞","indefinido"],c:1,e:"O limite de sen(x)/x quando x→0 é 1.",d:"dificil"},
  {p:"Resolva: x³ - 27 = 0",o:["x=2","x=3","x=4","x=5"],c:1,e:"x³ = 27 → x = 3.",d:"dificil"},
  {p:"d/dx (x² + 3x)?",o:["x+3","2x+3","x²+3","2x"],c:1,e:"Derivada: 2x + 3.",d:"dificil"},
  {p:"Resolva: 2ˣ = 16",o:["x=2","x=3","x=4","x=5"],c:2,e:"2⁴ = 16 → x = 4.",d:"dificil"},
  {p:"tan(45°)?",o:["0","1","√2","∞"],c:1,e:"tan(45°) = 1.",d:"dificil"},
  {p:"Resolva: x² - 2x - 8 = 0",o:["x=-2 ou 4","x=-1 ou 8","x=2 ou -4","x=0 ou 8"],c:0,e:"Fatorando: (x-4)(x+2)=0 → x=-2 ou 4.",d:"dificil"},
  {p:"∫(x²) dx?",o:["x³/3+C","x²/2+C","x³+C","2x³+C"],c:0,e:"Integral de x² é x³/3 + C.",d:"dificil"}
];

