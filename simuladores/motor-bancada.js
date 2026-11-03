// ================================================================
//  MOTOR DA BANCADA VIRTUAL — calcula o circuito montado
//  Trabalha com a lógica do circuito: cada borne pertence a um "nó";
//  fios e contatos fechados unem nós; a rede injeta as fases L1, L2, L3.
// ================================================================

// Contatos internos de cada dispositivo: [borne A, borne B, quando fecha]
// "quando fecha" recebe o estado e devolve true/false
const CONTATOS = [
  // Q1 — disjuntor tripolar (força)
  ['Q1.1', 'Q1.2', e => e.Q1], ['Q1.3', 'Q1.4', e => e.Q1], ['Q1.5', 'Q1.6', e => e.Q1],
  // Q2 — disjuntor bipolar (comando)
  ['Q2.1', 'Q2.2', e => e.Q2], ['Q2.3', 'Q2.4', e => e.Q2],
  // K1 — contator: contatos principais, auxiliar NA 13-14 e NF 21-22
  ['K1.1', 'K1.2', e => e.K1], ['K1.3', 'K1.4', e => e.K1], ['K1.5', 'K1.6', e => e.K1],
  ['K1.13', 'K1.14', e => e.K1], ['K1.21', 'K1.22', e => !e.K1],
  // Bloco auxiliar do K1: NA 53-54 e NF 61-62
  ['K1.53', 'K1.54', e => e.K1], ['K1.61', 'K1.62', e => !e.K1],
  // FT1 — relé térmico: elementos térmicos sempre conduzem; 95-96 NF e 97-98 NA
  ['FT1.1', 'FT1.2', () => true, 'termico'], ['FT1.3', 'FT1.4', () => true, 'termico'], ['FT1.5', 'FT1.6', () => true, 'termico'],
  ['FT1.95', 'FT1.96', e => !e.FT1], ['FT1.97', 'FT1.98', e => e.FT1],
  // Botões: S0 NF (11-12), S1 NA (13-14)
  ['S0.11', 'S0.12', e => !e.S0], ['S1.13', 'S1.14', e => e.S1]
];

const FONTES = { 'REDE.L1': 'L1', 'REDE.L2': 'L2', 'REDE.L3': 'L3' };
const DISJUNTORES = { Q1: ['Q1.2', 'Q1.4', 'Q1.6'], Q2: ['Q2.2', 'Q2.4'] };   // lado da carga

function criarUniao() {
  const pai = {};
  const achar = x => { if (pai[x] === undefined) pai[x] = x; while (pai[x] !== x) { pai[x] = pai[pai[x]]; x = pai[x]; } return x; };
  return { achar, unir: (a, b) => { pai[achar(a)] = achar(b); } };
}

// Monta os nós para um estado. semTermico: ignora os elementos do FT1 (para saber se ele está no caminho)
function montarNos(fios, est, semTermico) {
  const u = criarUniao();
  fios.forEach(f => u.unir(f.a, f.b));
  CONTATOS.forEach(([a, b, fecha, tipo]) => {
    if (semTermico && tipo === 'termico') return;
    if (fecha(est)) u.unir(a, b);
  });
  const fasesDoNo = {};
  Object.entries(FONTES).forEach(([borne, fase]) => {
    const n = u.achar(borne);
    (fasesDoNo[n] = fasesDoNo[n] || new Set()).add(fase);
  });
  const fasesEm = borne => fasesDoNo[u.achar(borne)] || new Set();
  return { u, fasesDoNo, fasesEm };
}

// Tensão entre dois bornes: há uma fase de cada lado, e são fases diferentes
function temTensao(nos, a, b) {
  const fa = nos.fasesEm(a), fb = nos.fasesEm(b);
  if (fa.size !== 1 || fb.size !== 1) return false;
  return [...fa][0] !== [...fb][0];
}

function avaliarMotor(nos) {
  const f = ['M1.U1', 'M1.V1', 'M1.W1'].map(b => { const s = nos.fasesEm(b); return s.size === 1 ? [...s][0] : null; });
  const distintas = new Set(f.filter(Boolean));
  if (distintas.size === 3) {
    const ordem = f.map(x => Number(x[1]));          // ex.: [1,2,3]
    const horario = [[1,2,3],[2,3,1],[3,1,2]].some(s => s.every((v, i) => v === ordem[i]));
    return { girando: true, sentido: horario ? 'horario' : 'antihorario', fases: f };
  }
  return { girando: false, faltaFase: distintas.size > 0, fases: f };
}

// ── Resolve o circuito: aplica disparos por curto e encontra o estado estável do K1 ──
function resolver(fios, entrada) {
  const est = { ...entrada };
  const disparos = [];
  const vistos = [];
  let curto = null, instavel = false, nos;

  for (let i = 0; i < 30; i++) {
    nos = montarNos(fios, est);
    // Curto-circuito: um nó com duas fases ou mais
    const noCurto = Object.entries(nos.fasesDoNo).find(([, s]) => s.size > 1);
    if (noCurto) {
      curto = [...noCurto[1]].sort();
      // Desarma o disjuntor que de fato interrompe o curto (testa abrir cada um)
      const ligados = Object.keys(DISJUNTORES).filter(q => est[q]);
      const semCurto = e => !Object.values(montarNos(fios, e).fasesDoNo).some(s => s.size > 1);
      let atingidos = ligados.filter(q => semCurto({ ...est, [q]: false }));
      if (!atingidos.length && ligados.length) {
        const todosAbertos = { ...est }; ligados.forEach(q => todosAbertos[q] = false);
        if (semCurto(todosAbertos)) atingidos = ligados;
      }
      if (atingidos.length) {
        atingidos.forEach(q => { est[q] = false; disparos.push({ disjuntor: q, fases: curto }); });
        continue;                                   // recalcula com o disjuntor desarmado
      }
      // curto antes de qualquer disjuntor: não há proteção
      return { est, disparos, curto, semProtecao: true, nos: null, motor: { girando: false }, H1: false };
    }
    curto = null;
    const k1 = temTensao(nos, 'K1.A1', 'K1.A2');
    if (k1 === est.K1) break;
    const assinatura = JSON.stringify([est.K1, k1]);
    if (vistos.includes(assinatura) && i > 4) { instavel = true; est.K1 = false; nos = montarNos(fios, est); break; }
    vistos.push(assinatura);
    est.K1 = k1;
  }

  return {
    est, disparos, curto: disparos.length ? disparos[disparos.length - 1].fases : null,
    semProtecao: false, instavel, nos,
    motor: avaliarMotor(nos),
    H1: temTensao(nos, 'H1.X1', 'H1.X2'),
    aterrado: nos.u.achar('M1.PE') === nos.u.achar('REDE.PE')
  };
}

// O relé térmico está no caminho da corrente do motor?
function termicoNoCaminho(fios, est) {
  const sem = montarNos(fios, est, true);
  return !avaliarMotor(sem).girando;
}

// ── Verificação automática da montagem ──
// Executa a sequência de operação e devolve a lista de itens com ok/erro e explicação
function verificarMontagem(fios, desafio) {
  const itens = [];
  const add = (ok, titulo, explicacao) => itens.push({ ok, titulo, explicacao: ok ? '' : explicacao });
  let est = { Q1: true, Q2: true, S0: false, S1: false, FT1: false, K1: false };
  const passo = mud => { est = { ...est, ...mud }; const r = resolver(fios, est); est = r.est; return r; };
  const INSTAVEL = 'A bobina do K1 liga e desliga sem parar: ela está sendo alimentada por um contato NF do próprio K1 (21-22 ou 61-62). Use o NA 13-14 para o selo.';

  // 1. Energizar
  let r = passo({});
  if (r.semProtecao) {
    add(false, 'Sem curto-circuito', `Há um curto-circuito entre ${r.curto.join(' e ')} antes dos disjuntores. Confira os fios ligados direto nos bornes da rede.`);
    return itens;
  }
  if (r.disparos.length) {
    const d = r.disparos[0];
    add(false, 'Sem curto-circuito', `Ao energizar, ${d.disjuntor} desarmou por curto-circuito entre ${d.fases.join(' e ')}. Procure um fio que une duas fases diferentes.`);
    return itens;
  }
  add(true, 'Sem curto-circuito');
  if (r.instavel) { add(false, 'Ao energizar, o motor fica parado', INSTAVEL); return itens; }
  add(!r.motor.girando && !r.est.K1, 'Ao energizar, o motor fica parado',
    r.est.K1 ? 'Com os disjuntores ligados e nenhum botão pressionado, o K1 já energizou. A bobina não pode receber tensão sem passar pelo S1 (NA).'
             : 'O motor recebeu as três fases sem o K1 ligar: há um caminho de força que não passa pelos contatos principais do K1.');
  if (r.motor.girando || r.est.K1) return itens;

  // 2. Pulsar S1
  r = passo({ S1: true });
  if (r.disparos.length) {
    const d = r.disparos[0];
    add(false, 'Ao pulsar S1, o motor liga', `Ao pulsar S1, ${d.disjuntor} desarmou por curto-circuito entre ${d.fases.join(' e ')}.`);
    return itens;
  }
  if (r.instavel) { add(false, 'Ao pulsar S1, o motor liga', INSTAVEL); return itens; }
  if (!r.est.K1) {
    add(false, 'Ao pulsar S1, o motor liga', 'Ao pulsar S1, a bobina do K1 não energizou. A bobina (A1-A2) precisa receber duas fases diferentes do Q2, passando por FT1 95-96, S0 e S1.');
    return itens;
  }
  if (!r.motor.girando) {
    add(false, 'Ao pulsar S1, o motor liga', r.motor.faltaFase
      ? 'O K1 energizou, mas o motor não recebeu as três fases (falta de fase). Confira o caminho de cada fase: Q1 → K1 → FT1 → motor.'
      : 'O K1 energizou, mas o motor não recebeu tensão. Confira o circuito de força: Q1 → K1 (1-2, 3-4, 5-6) → FT1 → U1, V1, W1.');
    return itens;
  }
  add(true, 'Ao pulsar S1, o motor liga');

  // 3. Soltar S1 (selo)
  r = passo({ S1: false });
  add(r.motor.girando, 'Ao soltar S1, o motor continua ligado (selo)',
    'Ao soltar S1, o motor parou. Falta o contato de selo: K1 13-14 em paralelo com S1.');
  if (!r.motor.girando) return itens;

  // 4. Pulsar S0
  r = passo({ S0: true });
  const parouComS0 = !r.motor.girando;
  passo({ S0: false });
  r = resolver(fios, est);
  add(parouComS0 && !r.motor.girando, 'Ao pulsar S0, o motor desliga',
    parouComS0 ? 'O motor desligou com S0, mas voltou a ligar ao soltar o botão. Confira a ligação do selo.'
               : 'S0 não desligou o motor. O S0 (NF) precisa ficar em série com a bobina, antes do S1 e do contato de selo.');
  if (!parouComS0 || r.motor.girando) return itens;

  // 5. Sobrecarga
  passo({ S1: true }); r = passo({ S1: false });
  if (r.motor.girando) {
    if (!termicoNoCaminho(fios, est)) {
      add(false, 'Na sobrecarga, o relé térmico desliga o motor', 'A corrente do motor não passa pelo FT1 (1-2, 3-4, 5-6). Assim o relé térmico não percebe a sobrecarga.');
    } else {
      r = passo({ FT1: true });
      add(!r.motor.girando, 'Na sobrecarga, o relé térmico desliga o motor',
        'O FT1 disparou, mas o motor continuou ligado. O contato FT1 95-96 (NF) precisa ficar em série com a bobina do K1.');
      passo({ FT1: false });
    }
  }

  // 6. Sinalização (desafio 2)
  if (desafio === 'sinalizacao') {
    est = { Q1: true, Q2: true, S0: false, S1: false, FT1: false, K1: false };
    let r0 = resolver(fios, est); est = r0.est;
    const apagadaParado = !r0.H1;
    passo({ S1: true }); r = passo({ S1: false });
    const acesaLigado = r.motor.girando && r.H1;
    add(apagadaParado && acesaLigado, 'H1 acende com o motor ligado e apaga com ele desligado',
      !apagadaParado ? 'H1 está acesa com o motor parado. Ela deve ser comandada por um contato NA do K1 (por exemplo, o 53-54 do bloco auxiliar).'
                     : 'H1 não acendeu com o motor ligado. Ligue H1 (X1-X2) entre as duas fases do comando, passando por um contato NA do K1, como o 53-54.');
  }

  // 7. Aterramento
  const rf = resolver(fios, { Q1: false, Q2: false, S0: false, S1: false, FT1: false, K1: false });
  add(rf.aterrado, 'Motor aterrado (PE)', 'O motor não está aterrado. Ligue o PE da rede ao borne PE do motor.');
  return itens;
}

if (typeof module !== 'undefined') module.exports = { resolver, verificarMontagem, termicoNoCaminho };
