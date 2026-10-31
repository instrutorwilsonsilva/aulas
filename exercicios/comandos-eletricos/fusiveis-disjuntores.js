// ================================================================
//  EXERCÍCIOS: Fusíveis e disjuntores — Comandos Elétricos
//  Baseados no conteúdo da aula (PPTX "Eletricista Industrial", slides 6 a 27)
//
//  tipo "escolha": alternativas + correta (posição, começando em 0)
//  tipo "numero":  resposta numérica + unidade (tolerancia opcional)
//  imagem (opcional): arquivo da pasta img/comandos-eletricos/fusiveis-disjuntores/
// ================================================================
registrarExercicios({
  questoes: [
    {
      id: "q1",
      tipo: "escolha",
      enunciado: "Um fusível rompeu (queimou) depois de um curto-circuito. O que é preciso fazer para restabelecer o funcionamento do circuito?",
      alternativas: [
        "Rearmar o fusível pela alavanca frontal",
        "Esperar o fusível esfriar, que ele volta a conduzir",
        "Substituir o fusível por um novo",
        "Nada: o fusível continua conduzindo com corrente reduzida"
      ],
      correta: 2,
      resolucao: "Os fusíveis não são reaproveitáveis. Uma vez rompidos, não é possível restabelecer o funcionamento sem substituí-los."
    },
    {
      id: "q2",
      tipo: "escolha",
      enunciado: "Qual fusível é indicado para proteger contra curto-circuito o circuito de partida de um motor assíncrono, que tem picos elevados de corrente?",
      alternativas: [
        "Fusível de ação retardada (aM)",
        "Fusível de ação rápida (gG)",
        "Fusível de ação ultrarrápida (aR)",
        "Qualquer um deles, pois todos toleram picos de corrente"
      ],
      correta: 0,
      resolucao: "O fusível aM tolera os picos de corrente durante a energização ou a partida das cargas sem queimar, mas interrompe o circuito em caso de curto-circuito. É o indicado para primários de transformadores, eletroímãs e partida de motores assíncronos."
    },
    {
      id: "q3",
      tipo: "escolha",
      enunciado: "Na face de um fusível aparece a indicação gL-gG. O que isso significa?",
      alternativas: [
        "É um fusível de ação retardada, para partida de motores",
        "É um fusível de ação rápida: gL é a especificação antiga do gG",
        "É um fusível que serve tanto para curto-circuito quanto para choque elétrico",
        "É um fusível ultrarrápido para equipamentos eletrônicos"
      ],
      correta: 1,
      resolucao: "A especificação antiga do fusível de ação rápida era gL. Por isso ainda se encontra a indicação gL-gG na face desses fusíveis."
    },
    {
      id: "q4",
      tipo: "escolha",
      enunciado: "Qual destas afirmações sobre o fusível de ação retardada (aM) está correta?",
      alternativas: [
        "Protege contra curto-circuito e também contra sobrecarga",
        "É o mais indicado para fornos elétricos resistivos",
        "Protege contra curto-circuito, mas é inadequado para proteção contra sobrecarga",
        "É destinado a circuitos com equipamentos tiristorizados"
      ],
      correta: 2,
      resolucao: "O fusível aM oferece proteção contra curtos-circuitos, mas é inadequado para a proteção dos circuitos contra sobrecarga. Quem protege contra curto-circuito e sobrecarga é o gG."
    },
    {
      id: "q5",
      tipo: "escolha",
      enunciado: "O fusível da imagem é do tipo D (Diazed). Qual é a faixa de corrente nominal desse tipo de fusível?",
      imagem: "fusivel-diazed-1.webp",
      alternativas: [
        "De 2 A a 63 A",
        "De 4 A a 1000 A",
        "De 63 A a 1000 A",
        "De 2 A a 120 A"
      ],
      correta: 0,
      resolucao: "Os fusíveis D (Diazed) abrangem a faixa de corrente nominal de 2 A a 63 A, com capacidade de ruptura de até 70 kA. A faixa de 4 A a 1000 A é a do fusível NH."
    },
    {
      id: "q6",
      tipo: "escolha",
      enunciado: "Por que os fusíveis NH só podem ser manipulados por pessoas qualificadas, com ferramentas adequadas?",
      alternativas: [
        "Porque queimam com qualquer pico de corrente",
        "Porque contêm partes metálicas expostas energizadas, que podem provocar acidentes graves",
        "Porque só existem para correntes acima de 1000 A",
        "Porque precisam ser rearmados depois de cada curto-circuito"
      ],
      correta: 1,
      resolucao: "Os fusíveis NH contêm partes metálicas expostas energizadas que podem provocar acidentes graves. Por isso são indicados para circuitos aos quais o usuário comum não tenha acesso."
    },
    {
      id: "q7",
      tipo: "escolha",
      enunciado: "No disjuntor termomagnético, qual parte atua quando ocorre um curto-circuito?",
      alternativas: [
        "O dispositivo térmico",
        "O dispositivo magnético",
        "O dispositivo diferencial residual",
        "A alavanca de manobra"
      ],
      correta: 1,
      resolucao: "O disjuntor protege os cabos contra curto-circuito por meio do seu dispositivo magnético. O dispositivo térmico é o que protege contra sobrecarga."
    },
    {
      id: "q8",
      tipo: "escolha",
      enunciado: "Qual destas funções NÃO faz parte das três funções básicas do disjuntor termomagnético?",
      alternativas: [
        "Abrir e fechar os circuitos (manobra)",
        "Proteger contra sobrecarga",
        "Proteger contra curto-circuito",
        "Proteger contra choque elétrico"
      ],
      correta: 3,
      resolucao: "As três funções básicas do disjuntor termomagnético são manobra, proteção contra sobrecarga e proteção contra curto-circuito. A proteção contra choque elétrico é uma característica do disjuntor DR."
    },
    {
      id: "q9",
      tipo: "escolha",
      enunciado: "Qual curva de disjuntor é indicada para proteger um motor elétrico, que é uma carga de média corrente de partida?",
      alternativas: [
        "Curva B",
        "Curva C",
        "Curva D",
        "Qualquer curva, pois a curva não depende da carga"
      ],
      correta: 1,
      resolucao: "A curva C é indicada para cargas de média corrente de partida, como motores elétricos, lâmpadas fluorescentes e máquinas de lavar. A curva B é para cargas resistivas e a D para cargas com grande corrente de partida, como transformadores."
    },
    {
      id: "q10",
      tipo: "numero",
      enunciado: "Um disjuntor de curva C tem corrente nominal de 10 A. A partir de qual corrente ele começa a ter disparo instantâneo?",
      resposta: 50,
      unidade: "A",
      resolucao: "A curva C tem disparo instantâneo para correntes entre 5 e 10 vezes a corrente nominal. Para 10 A, o disparo instantâneo começa em 5 × 10 A = 50 A (e vai até 10 × 10 A = 100 A)."
    }
  ]
});
