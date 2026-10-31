// ================================================================
//  CATÁLOGO DO SITE — matérias (e, depois, as aulas de cada uma)
//  Para adicionar uma matéria, copie um bloco { ... } e ajuste.
//  cor: icone-azul | icone-verde | icone-laranja | icone-roxo | icone-vermelho | icone-ciano
// ================================================================
const MATERIAS = [
  {
    id: "comandos-eletricos",
    nome: "Comandos Elétricos",
    desc: "Contatores, relés, botoeiras e partidas de motores",
    icone: "🎛️",
    cor: "icone-azul",
    // Aulas na ordem dos slides do PPTX "Eletricista Industrial" (slides 4 a 71)
    // aula / exercicios: true quando a página estiver publicada; simulador: caminho do arquivo ou ""
    aulas: [
      { id: "introducao", titulo: "Introdução aos comandos elétricos",
        resumo: "Finalidade dos comandos elétricos, circuito de força e circuito de comando",
        aula: false, exercicios: false, simulador: "" },          // slides 4–5
      { id: "fusiveis-disjuntores", titulo: "Fusíveis e disjuntores",
        resumo: "Fusíveis aM, gG e aR, tipos D e NH; disjuntores termomagnéticos, curvas B, C e D, caixa moldada e DR",
        aula: true,  exercicios: false, simulador: "" },          // slides 6–27
      { id: "chaves-botoes-sinalizadores", titulo: "Chaves, botões e sinalizadores",
        resumo: "Chave seccionadora e comutadora, botão de emergência, botoeiras NA e NF, fim de curso e sinalizadores",
        aula: false, exercicios: false, simulador: "" },          // slides 28–38
      { id: "reles-contatores", titulo: "Relés, temporizadores e contatores",
        resumo: "Relé térmico, temporizador, relé estrela-triângulo e falta de fase, contatores, bloco auxiliar e disjuntor-motor",
        aula: false, exercicios: false, simulador: "" },          // slides 39–59
      { id: "acessorios-montagem", titulo: "Acessórios de montagem",
        resumo: "Bornes, anilhas de identificação e terminais elétricos",
        aula: false, exercicios: false, simulador: "" },          // slides 60–64
      { id: "diagramas-pratica", titulo: "Diagramas elétricos e prática de montagem",
        resumo: "Partida direta: diagrama de comando e de força, montagem em bancada e no simulador",
        aula: false, exercicios: false, simulador: "" }           // slides 65–71
    ],
    // Simuladores da matéria: { titulo, desc, arquivo: "simuladores/nome.html" }
    simuladores: []
  },
  {
    id: "eletricidade",
    nome: "Eletricidade",
    desc: "Grandezas elétricas, Lei de Ohm, potência e energia",
    icone: "⚡",
    cor: "icone-verde",
    aulas: [],
    simuladores: []
  },
  {
    id: "circuitos-eletricos",
    nome: "Circuitos Elétricos",
    desc: "Circuitos série, paralelo e misto, Leis de Kirchhoff",
    icone: "🔌",
    cor: "icone-laranja",
    aulas: [],
    simuladores: []
  },
  {
    id: "desenho-tecnico",
    nome: "Desenho Técnico",
    desc: "Normas, projeções ortogonais, cotagem e perspectivas",
    icone: "📐",
    cor: "icone-roxo",
    aulas: [],
    simuladores: []
  }
];
