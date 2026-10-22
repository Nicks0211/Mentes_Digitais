const fisica = [
  // Fáceis
  {p:"Unidade de força:",o:["Joule","Newton","Watt","Pascal"],c:1,e:"A unidade de força no SI é o Newton (N), definido como kg·m/s².",d:"facil"},
  {p:"Velocidade é:",o:["Espaço/tempo","Tempo/espaço","Massa/tempo","Energia/tempo"],c:0,e:"Velocidade é a razão entre espaço percorrido e tempo gasto: v = Δs/Δt.",d:"facil"},
  {p:"Unidade de energia:",o:["Joule","Newton","Watt","Pascal"],c:0,e:"Energia é medida em Joules (J), equivalente a N·m.",d:"facil"},
  {p:"Unidade de potência:",o:["Joule","Newton","Watt","Pascal"],c:2,e:"Potência é medida em Watt (W), que equivale a Joule por segundo.",d:"facil"},
  {p:"Unidade de pressão:",o:["Joule","Newton","Watt","Pascal"],c:3,e:"Pressão é medida em Pascal (Pa), equivalente a N/m².",d:"facil"},
  {p:"Unidade de trabalho:",o:["Joule","Newton","Watt","Pascal"],c:0,e:"Trabalho é medido em Joules (J), pois é força vezes deslocamento.",d:"facil"},
  {p:"Unidade de tempo:",o:["Segundo","Minuto","Hora","Dia"],c:0,e:"No SI, a unidade de tempo é o segundo (s).",d:"facil"},
  {p:"Unidade de massa:",o:["Kg","g","mg","t"],c:0,e:"No SI, a unidade de massa é o quilograma (kg).",d:"facil"},
  {p:"Unidade de comprimento:",o:["Metro","Centímetro","Milímetro","Quilômetro"],c:0,e:"No SI, a unidade de comprimento é o metro (m).",d:"facil"},
  {p:"Unidade de temperatura:",o:["Kelvin","Celsius","Fahrenheit","Newton"],c:0,e:"No SI, a unidade de temperatura é o Kelvin (K).",d:"facil"},

  // Médias
  {p:"1ª Lei de Newton:",o:["Ação e reação","Inércia","Força","Gravidade"],c:1,e:"A 1ª lei é a da inércia: um corpo tende a permanecer em repouso ou movimento uniforme.",d:"medio"},
  {p:"2ª Lei de Newton:",o:["F=ma","Inércia","Ação e reação","Gravidade"],c:0,e:"A 2ª lei: F = m·a, força é massa vezes aceleração.",d:"medio"},
  {p:"3ª Lei de Newton:",o:["Ação e reação","Inércia","Força","Gravidade"],c:0,e:"A 3ª lei: toda ação gera uma reação de mesma intensidade e direção oposta.",d:"medio"},
  {p:"Energia cinética fórmula:",o:["mv","mv²","½mv²","ma"],c:2,e:"Energia cinética: Ec = ½mv².",d:"medio"},
  {p:"Energia potencial gravitacional:",o:["mgh","½mv²","F·d","P·V"],c:0,e:"Epg = mgh, energia armazenada pela altura.",d:"medio"},
  {p:"Trabalho fórmula:",o:["F·d","mgh","½mv²","P·V"],c:0,e:"Trabalho = força × deslocamento (F·d).",d:"medio"},
  {p:"Potência fórmula:",o:["E/t","F·d","mgh","½mv²"],c:0,e:"Potência = energia/tempo (P = E/t).",d:"medio"},
  {p:"Pressão fórmula:",o:["F/A","mgh","E/t","½mv²"],c:0,e:"Pressão = força/área (P = F/A).",d:"medio"},
  {p:"Velocidade da luz:",o:["3x10⁵ m/s","3x10⁶ m/s","3x10⁸ m/s","3x10⁹ m/s"],c:2,e:"A velocidade da luz no vácuo é aproximadamente 3×10⁸ m/s.",d:"medio"},
  {p:"Aceleração da gravidade na Terra:",o:["8 m/s²","9,8 m/s²","10 m/s²","12 m/s²"],c:1,e:"Na Terra, g ≈ 9,8 m/s².",d:"medio"},

  // Difíceis
  {p:"Lei de Coulomb:",o:["F=k·q1q2/r²","F=ma","E=mc²","P=F/A"],c:0,e:"A força elétrica entre cargas: F = k·q₁q₂/r².",d:"dificil"},
  {p:"Lei de Ohm:",o:["V=IR","P=E/t","F=ma","E=mc²"],c:0,e:"Lei de Ohm: V = I·R.",d:"dificil"},
  {p:"Equação da energia de Einstein:",o:["E=mc²","F=ma","V=IR","P=F/A"],c:0,e:"Equação de Einstein: E = mc².",d:"dificil"},
  {p:"Lei da gravitação universal:",o:["F=G·m1m2/r²","F=ma","E=mc²","V=IR"],c:0,e:"A força gravitacional: F = G·m₁m₂/r².",d:"dificil"},
  {p:"Equação da onda:",o:["v=λ·f","F=ma","E=mc²","P=F/A"],c:0,e:"Velocidade da onda: v = λ·f.",d:"dificil"},
  {p:"Equação da frequência:",o:["f=1/T","v=λ·f","E=mc²","P=F/A"],c:0,e:"Frequência é inverso do período: f = 1/T.",d:"dificil"},
  {p:"Equação da dilatação linear:",o:["ΔL=Lo·α·ΔT","F=ma","E=mc²","P=F/A"],c:0,e:"Dilatação linear: ΔL = L₀·α·ΔT.",d:"dificil"},
  {p:"Equação da pressão hidrostática:",o:["P=ρ·g·h","F=ma","E=mc²","V=IR"],c:0,e:"Pressão hidrostática: P = ρ·g·h.",d:"dificil"},
  {p:"Equação da energia elétrica:",o:["E=V·I·t","F=ma","E=mc²","P=F/A"],c:0,e:"Energia elétrica: E = V·I·t.",d:"dificil"},
  {p:"Equação da potência elétrica:",o:["P=V·I","F=ma","E=mc²","P=F/A"],c:0,e:"Potência elétrica: P = V·I.",d:"dificil"}
];

