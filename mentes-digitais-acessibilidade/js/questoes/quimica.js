const quimica = [
  // Fáceis
  {p:"Símbolo químico da água:",o:["H2O","O2","CO2","HO"],c:0,e:"A fórmula da água é H₂O, formada por dois átomos de hidrogênio e um de oxigênio.",d:"facil"},
  {p:"Número atômico do Oxigênio:",o:["6","7","8","9"],c:2,e:"O oxigênio possui número atômico 8, ou seja, 8 prótons em seu núcleo.",d:"facil"},
  {p:"Símbolo do Sódio:",o:["Na","So","Sn","Sd"],c:0,e:"O símbolo do sódio é Na, derivado do latim 'Natrium'.",d:"facil"},
  {p:"Símbolo do Potássio:",o:["P","Po","K","Pt"],c:2,e:"O símbolo do potássio é K, do latim 'Kalium'.",d:"facil"},
  {p:"Símbolo do Ferro:",o:["Fe","Ir","Fr","Fo"],c:0,e:"O ferro é representado por Fe, do latim 'Ferrum'.",d:"facil"},
  {p:"Símbolo do Ouro:",o:["Ag","Au","Or","Ou"],c:1,e:"O ouro é Au, do latim 'Aurum'.",d:"facil"},
  {p:"Símbolo do Prata:",o:["Ag","Pt","Pr","Pa"],c:0,e:"A prata é Ag, do latim 'Argentum'.",d:"facil"},
  {p:"Símbolo do Carbono:",o:["C","Ca","Cb","Co"],c:0,e:"O carbono é representado pela letra C.",d:"facil"},
  {p:"Símbolo do Hidrogênio:",o:["H","He","Hi","Ho"],c:0,e:"O hidrogênio é H, o elemento mais leve da tabela periódica.",d:"facil"},
  {p:"Símbolo do Cloro:",o:["Cl","Cr","Co","Ca"],c:0,e:"O cloro é Cl, muito usado em processos de desinfecção.",d:"facil"},

  // Médias
  {p:"Ligação no NaCl:",o:["Covalente","Iônica","Metálica","Hidrogênio"],c:1,e:"O sal de cozinha (NaCl) é formado por ligação iônica entre sódio e cloro.",d:"medio"},
  {p:"pH menor que 7 indica:",o:["Base","Ácido","Neutro","Sal"],c:1,e:"Soluções com pH menor que 7 são ácidas.",d:"medio"},
  {p:"pH maior que 7 indica:",o:["Base","Ácido","Neutro","Sal"],c:0,e:"Soluções com pH maior que 7 são básicas (alcalinas).",d:"medio"},
  {p:"pH igual a 7 indica:",o:["Base","Ácido","Neutro","Sal"],c:2,e:"pH igual a 7 indica solução neutra, como a água pura.",d:"medio"},
  {p:"Mol é:",o:["6,02x10²³ partículas","1g de substância","1 litro de solução","1 átomo"],c:0,e:"Um mol equivale a 6,02 × 10²³ partículas (constante de Avogadro).",d:"medio"},
  {p:"Reação de combustão consome:",o:["Água","Oxigênio","Carbono","Hidrogênio"],c:1,e:"Toda combustão consome oxigênio (O₂).",d:"medio"},
  {p:"Reação de neutralização ocorre entre:",o:["Ácido + Base","Ácido + Sal","Base + Sal","Sal + Água"],c:0,e:"Neutralização ocorre entre ácido e base, formando sal e água.",d:"medio"},
  {p:"Número atômico é:",o:["Prótons","Nêutrons","Elétrons","Massa"],c:0,e:"Número atômico corresponde ao número de prótons no núcleo.",d:"medio"},
  {p:"Número de massa é:",o:["Prótons","Nêutrons","Prótons+Nêutrons","Elétrons"],c:2,e:"Número de massa = prótons + nêutrons.",d:"medio"},
  {p:"Isótopos têm mesmo:",o:["Número de massa","Número atômico","Número de nêutrons","Número de elétrons"],c:1,e:"Isótopos possuem mesmo número atômico, mas massas diferentes.",d:"medio"},

  // Difíceis
  {p:"Catalisador serve para:",o:["Aumentar velocidade","Diminuir energia","Alterar produto","Parar reação"],c:0,e:"Catalisador aumenta a velocidade da reação sem ser consumido.",d:"dificil"},
  {p:"Equação balanceada de H2 + O2 → H2O:",o:["H2+O2→H2O","2H2+O2→2H2O","H2+2O2→2H2O","2H2+2O2→2H2O"],c:1,e:"A equação correta é 2H₂ + O₂ → 2H₂O.",d:"dificil"},
  {p:"Número de oxidação do O no H2O:",o:["-2","+2","0","+1"],c:0,e:"No H₂O, o oxigênio tem número de oxidação -2.",d:"dificil"},
  {p:"Número de oxidação do H no H2O:",o:["-1","+1","0","+2"],c:1,e:"No H₂O, o hidrogênio tem número de oxidação +1.",d:"dificil"},
  {p:"Reação endotérmica absorve:",o:["Calor","Energia","Luz","Som"],c:0,e:"Reações endotérmicas absorvem calor do meio.",d:"dificil"},
  {p:"Reação exotérmica libera:",o:["Calor","Energia","Luz","Som"],c:0,e:"Reações exotérmicas liberam calor para o meio.",d:"dificil"},
  {p:"Equação da fotossíntese:",o:["CO2+H2O→C6H12O6+O2","C6H12O6+O2→CO2+H2O","H2O+2O2→CO2+C6H12O6","CO2+O2→H2O+C6H12O6"],c:0,e:"Fotossíntese: CO₂ + H₂O → C₆H₁₂O₆ + O₂.",d:"dificil"},
  {p:"Equação da respiração celular:",o:["C6H12O6+O2→CO2+H2O","CO2+H2O→C6H12O6+O2","C6H12O6→CO2+O2","O2+H2O→C6H12O6+CO2"],c:0,e:"Respiração celular: C₆H₁₂O₆ + O₂ → CO₂ + H₂O.",d:"dificil"},
  {p:"Energia de ligação é:",o:["Energia para quebrar ligação","Energia para formar ligação","Energia liberada","Energia absorvida"],c:0,e:"Energia de ligação é a energia necessária para quebrar uma ligação química.",d:"dificil"},
  {p:"Equação do metano CH4 + O2:",o:["CH4+O2→CO2+H2O","CH4+2O2→CO2+2H2O","CH4+O2→C+H2O","CH4+O2→CO+H2"],c:1,e:"Combustão completa do metano: CH₄ + 2O₂ → CO₂ + 2H₂O.",d:"dificil"}
];

