// ================================================================
//  AULA: Fusíveis e disjuntores — Comandos Elétricos
//  Fonte: PPTX "Eletricista Industrial", slides 6 a 27
//  fig(arquivo, legenda) e figs([...]) são fornecidos pela aula.html
//  e buscam as imagens em img/comandos-eletricos/fusiveis-disjuntores/
// ================================================================
registrarAula({
  secoes: [

    // ─────────────────────────────────────────────
    {
      id: "fusiveis",
      titulo: "Fusíveis",
      html: `
        <p>Os fusíveis são dispositivos destinados à <strong>proteção elétrica</strong>. Servem para interromper ou desligar o circuito e proteger a instalação elétrica no caso de <strong>curtos-circuitos</strong> e <strong>sobrecargas de longa duração</strong>.</p>
        <p>Uma vez rompidos (queimados), não é possível restabelecer o funcionamento sem substituí-los, pois os fusíveis não são reaproveitáveis.</p>
        ${fig("fusivel-simbologia.webp", "Simbologia do fusível, conforme a NBR 12523 e a IEC 60617-7", "pequena")}

        <h3>Classificação pela velocidade de atuação</h3>
        <p>Os fusíveis são classificados e especificados de acordo com a velocidade de atuação, podendo ser de ação <strong>retardada</strong>, <strong>rápida</strong> ou <strong>ultrarrápida</strong>.</p>

        <div class="tabela-rolagem">
          <table class="tabela">
            <thead>
              <tr><th>Ação</th><th>Especificação</th><th>Protege contra</th><th>Aplicações</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Retardada</strong></td><td><span class="codigo">aM</span></td>
                <td>Curto-circuito. É inadequado para proteção contra sobrecarga.</td>
                <td>Circuitos sujeitos a picos elevados de corrente: primários de transformadores, eletroímãs e partida de motores assíncronos.</td>
              </tr>
              <tr>
                <td><strong>Rápida</strong></td><td><span class="codigo">gG</span></td>
                <td>Curto-circuito e sobrecarga.</td>
                <td>Circuitos sem picos de corrente consideráveis: circuitos resistivos de fornos elétricos e outros sistemas de aquecimento por resistência.</td>
              </tr>
              <tr>
                <td><strong>Ultrarrápida</strong></td><td><span class="codigo">aR</span></td>
                <td>Circuitos com equipamentos eletrônicos tiristorizados.</td>
                <td>Sistemas de controle de velocidade de motores elétricos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>O fusível de <strong>ação retardada (aM)</strong> tolera os picos de corrente durante a energização ou a partida das cargas sem queimar, porém interrompe o circuito em caso de curto-circuito.</p>
        <p>A especificação antiga do fusível de <strong>ação rápida</strong> era <span class="codigo">gL</span>. Por isso ainda encontramos a indicação <span class="codigo">gL-gG</span> na face desses fusíveis.</p>

        ${figs([
          ["fusivel-am.webp", "Ação retardada (aM)"],
          ["fusivel-gg.webp", "Ação rápida (gG)"],
          ["fusivel-ar.webp", "Ação ultrarrápida (aR)"]
        ])}

        <h3>Forma construtiva</h3>
        <p>Os fusíveis utilizados em painéis de comando, quanto à forma construtiva, são de dois tipos: <strong>D</strong> e <strong>NH</strong>.</p>

        <h4>Fusível D (Diametral ou Diazed)</h4>
        <p>São fusíveis de baixa tensão que abrangem a faixa de corrente nominal de <strong>2 A a 63 A</strong> e possuem capacidade de interromper com segurança (<strong>capacidade de ruptura</strong>) correntes de até <strong>70 kA</strong>, ou seja, 70.000 A.</p>
        ${figs([
          ["fusivel-diazed-1.webp", "Fusível Diazed"],
          ["fusivel-diazed-2.webp", "Fusível Diazed"]
        ])}
        ${fig("diazed-instalacao.webp", "Instalação do fusível Diazed: alimentação da rede (linha) e saída para a carga")}

        <h4>Fusível NH</h4>
        <p>Os fusíveis NH são usados em baixa tensão e possuem elevada capacidade de ruptura, que pode chegar a <strong>120 kA</strong>. São mais robustos, pois abrangem uma faixa maior de corrente: de <strong>4 A a 1000 A</strong>.</p>
        <div class="destaque atencao">
          <strong>Atenção</strong>
          <p>Os fusíveis NH são indicados para circuitos aos quais o usuário comum não tenha acesso, porque contêm partes metálicas expostas energizadas que podem provocar acidentes graves. Por isso, só podem ser manipulados por pessoas qualificadas e dependem de ferramentas adequadas para instalação e manutenção.</p>
        </div>
        ${figs([
          ["fusivel-nh.webp", "Fusível NH"],
          ["nh-instalacao.webp", "Instalação de fusíveis NH em painel"]
        ])}

        <div class="tabela-rolagem">
          <table class="tabela">
            <thead><tr><th></th><th>Fusível D (Diazed)</th><th>Fusível NH</th></tr></thead>
            <tbody>
              <tr><td><strong>Corrente nominal</strong></td><td>2 A a 63 A</td><td>4 A a 1000 A</td></tr>
              <tr><td><strong>Capacidade de ruptura</strong></td><td>até 70 kA</td><td>até 120 kA</td></tr>
              <tr><td><strong>Manuseio</strong></td><td>—</td><td>Somente pessoas qualificadas, com ferramentas adequadas</td></tr>
            </tbody>
          </table>
        </div>
      `
    },

    // ─────────────────────────────────────────────
    {
      id: "disjuntores-tm",
      titulo: "Disjuntores termomagnéticos",
      html: `
        <p>Os disjuntores termomagnéticos são dispositivos eletromecânicos destinados a proteger as instalações elétricas contra <strong>curtos-circuitos</strong> e <strong>sobrecargas de longa duração</strong>.</p>
        ${figs([
          ["disjuntor-simbologia.webp", "Simbologia do disjuntor"],
          ["disjuntor-foto.webp", "Disjuntor termomagnético tripolar"]
        ])}

        <h3>Funções do disjuntor</h3>
        <p>Os disjuntores cumprem três funções básicas:</p>
        <ol>
          <li><strong>Manobra:</strong> abrir e fechar os circuitos.</li>
          <li><strong>Proteção contra sobrecarga:</strong> protege a fiação, ou mesmo os aparelhos, por meio do seu dispositivo <strong>térmico</strong>.</li>
          <li><strong>Proteção contra curto-circuito:</strong> protege os cabos por meio do seu dispositivo <strong>magnético</strong>.</li>
        </ol>
        ${fig("disjuntor-protecoes.webp", "No símbolo do disjuntor aparecem as duas proteções: térmica e magnética")}
        ${fig("disjuntor-polos.webp", "Disjuntores monopolar, bipolar e tripolar")}

        <h3>Como ler a identificação do disjuntor</h3>
        ${fig("disjuntor-identificacao.webp", "Marca do Inmetro (obrigatória para disjuntores de até 63 A), fabricante e modelo, tipo de curva e corrente nominal, e capacidade de interrupção")}

        <h3>Curvas dos disjuntores</h3>
        <p>A curva indica a partir de quantas vezes a corrente nominal o disjuntor dispara instantaneamente, e define para que tipo de carga ele é indicado.</p>
        <div class="tabela-rolagem">
          <table class="tabela">
            <thead><tr><th>Curva</th><th>Disparo instantâneo</th><th>Indicada para</th><th>Exemplos</th></tr></thead>
            <tbody>
              <tr><td><strong>B</strong></td><td>3 a 5 × a corrente nominal</td><td>Cargas resistivas, com pequena corrente de partida</td><td>Aquecedores elétricos, fornos elétricos e lâmpadas incandescentes</td></tr>
              <tr><td><strong>C</strong></td><td>5 a 10 × a corrente nominal</td><td>Cargas de média corrente de partida</td><td>Motores elétricos, lâmpadas fluorescentes e máquinas de lavar roupas</td></tr>
              <tr><td><strong>D</strong></td><td>10 a 20 × a corrente nominal</td><td>Cargas com grande corrente de partida</td><td>Transformadores BT (baixa tensão)</td></tr>
            </tbody>
          </table>
        </div>
        ${figs([
          ["disjuntor-curva-b.webp", "Curva B"],
          ["disjuntor-curva-c.webp", "Curva C"],
          ["disjuntor-curva-d.webp", "Curva D"]
        ])}

        <h3>Por dentro do disjuntor</h3>
        ${fig("disjuntor-interno.webp", "Disjuntor aberto, mostrando os componentes internos")}
        ${fig("disjuntor-vista-interna.webp", "Vista interna de um disjuntor comercial, com a identificação das partes")}
        ${fig("disjuntor-funcionamento.gif", "Animação do mecanismo de disparo do disjuntor")}

        <h3>Disjuntor em caixa moldada (MCCB)</h3>
        <p>O disjuntor em caixa moldada é utilizado para proteger circuitos elétricos de sobrecargas e curtos-circuitos. É ideal para projetos complexos e robustos, como indústrias, prédios grandes, geradores, motores elétricos e quadros de distribuição.</p>
        <p>Aplicações:</p>
        <ul>
          <li>Proteção de circuitos de baixa tensão</li>
          <li>Proteção de motores elétricos</li>
          <li>Proteção de circuitos de geradores</li>
          <li>Proteção de quadros de distribuição de energia</li>
          <li>Disjuntor geral de uma indústria</li>
        </ul>
        ${fig("disjuntor-caixa-moldada.webp", "Disjuntor em caixa moldada", "media")}
      `
    },

    // ─────────────────────────────────────────────
    {
      id: "disjuntores-dr",
      titulo: "Disjuntores DR",
      html: `
        <p>Os disjuntores DDR (diferencial residual) são dispositivos que, além da proteção contra curto-circuito, também possuem proteção contra <strong>choque elétrico</strong> ou proteção dos equipamentos contra <strong>incêndio</strong>.</p>
        ${fig("dr-modelos.webp", "Disjuntores diferenciais residuais")}
        <p>Para proteção dos equipamentos contra incêndio, devido às faíscas provocadas pelas correntes de fuga, ou para proteção contra consumo excessivo de energia elétrica, a corrente diferencial residual do DR pode ser de <strong>100 mA</strong>, <strong>300 mA</strong> ou <strong>500 mA</strong>.</p>
        ${fig("dr-diagrama.webp", "Diagrama do disjuntor DR", "pequena")}
      `
    },

    // ─────────────────────────────────────────────
    {
      id: "revisao",
      titulo: "Para revisar",
      html: `
        <ul class="lista-revisao">
          <li>Fusíveis e disjuntores protegem a instalação contra <strong>curtos-circuitos</strong> e <strong>sobrecargas</strong>. Depois de queimado, o fusível precisa ser substituído.</li>
          <li>Fusível <span class="codigo">aM</span> tolera picos de partida e não protege contra sobrecarga; <span class="codigo">gG</span> protege contra curto e sobrecarga; <span class="codigo">aR</span> protege circuitos com equipamentos eletrônicos tiristorizados.</li>
          <li>Diazed: 2 A a 63 A, até 70 kA. NH: 4 A a 1000 A, até 120 kA, e só pode ser manuseado por pessoas qualificadas.</li>
          <li>No disjuntor termomagnético, a parte <strong>térmica</strong> atua na sobrecarga e a <strong>magnética</strong> no curto-circuito.</li>
          <li>Curva B para cargas resistivas, C para motores e cargas de média partida, D para cargas com grande corrente de partida.</li>
        </ul>
      `
    }
  ]
});
