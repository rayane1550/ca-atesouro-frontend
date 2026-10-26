import { pontos } from "../data/pontos.js";
import { carregarProgresso, salvarProgresso, apagarProgresso } from "../services/storage.js";
import { abrirPonto, atualizarMapa, desbloquearProximoPonto, encontrarPonto } from "../components/mapa.js";
import { mostrarQuiz, responderQuiz } from "../components/quiz.js";
import { mostrarInventario, reorganizarPistas } from "../components/inventario.js";
import { verificarEnigma } from "../components/enigma.js";

export function criarEstadoPadrao() {
  return {
    pontos: pontos.map((ponto) => ({
      ...ponto,
      status: ponto.status
    })),
    pontosConcluidos: [],
    pontosDesbloqueados: [1],
    tesouros: [],
    pistas: [],
    quizzes: {},
    inventario: []
  };
}

let progresso = criarEstadoPadrao();

export function obterProgresso() {
  return progresso;
}

function iniciarEstado() {
  const salvo = carregarProgresso();

  if (salvo) {
    progresso = salvo;
    console.log("Progresso carregado!");
  } else {
    salvarProgresso(progresso);
    console.log("Novo jogo iniciado!");
  }

  atualizarMapa(progresso);
  mostrarInventario(progresso);
}

export function concluirPonto(ponto) {
  const id = ponto.id;

  if (progresso.pontosConcluidos.includes(id)) {
    return;
  }

  progresso.pontosConcluidos.push(id);

  const pontoStatus = progresso.pontos.find((item) => item.id === id);
  if (pontoStatus) {
    pontoStatus.status = "concluido";
  }

  progresso.tesouros.push({
    id,
    nome: ponto.tesouro
  });

  progresso.pistas.push({
    id,
    texto: ponto.pista,
    status: "completa"
  });

  progresso.inventario.push({
    id,
    nome: ponto.pista
  });

  desbloquearProximoPonto(progresso, id);
  salvarProgresso(progresso);
  atualizarMapa(progresso);

  console.log(`🎉 ${ponto.nome} concluído!`);
  console.log(`💎 Tesouro encontrado: ${ponto.tesouro}`);
  console.log(`🧩 Pista recebida: ${ponto.pista}`);
}

export function abrirPontoDoMapa(id) {
  abrirPonto(progresso, id, (ponto) => mostrarQuiz(ponto));
}

export function responderPonto(id, resposta) {
  const ponto = encontrarPonto(id);

  if (!ponto) {
    return false;
  }

  const resultado = responderQuiz(progresso, id, resposta, (pontoConcluido) => concluirPonto(pontoConcluido), salvarProgresso);
  return resultado;
}

export function reiniciarAventura() {
  apagarProgresso();
  window.location.reload();
}

export function renderMapa(progressoAtual = progresso) {
  const icones = ["🏖️", "🌲", "🕳️", "🛶", "💰"];

  const pontosHtml = progressoAtual.pontos
    .map((ponto) => {
      const status = ponto.status || "bloqueado";
      return `
        <button
          type="button"
          class="ponto ${status} ponto-${ponto.id}"
          data-ponto="${ponto.id}"
          aria-label="Local ${ponto.nome} - ${status}"
        >
          <h2>${ponto.nome}</h2>
          <span class="icone">${icones[ponto.id - 1] || "📍"}</span>
        </button>
      `;
    })
    .join("");

  const inventarioHtml = progressoAtual.inventario.length
    ? `
      <aside class="inventario">
        <h2>Inventário</h2>
        ${progressoAtual.inventario
          .map((item) => `<div class="pista">${item.nome || item.texto || "Pista"}</div>`)
          .join("")}
      </aside>
    `
    : "";

  return `
    <div class="mapa">
      <h1 class="titulo">Caça ao Tesouro</h1>
      <div class="trilha"></div>
      ${pontosHtml}
    </div>
    ${inventarioHtml}
  `;
}

export function iniciarJogo() {
  iniciarEstado();

  const app = document.getElementById("app");
  if (!app) {
    return progresso;
  }

  app.innerHTML = renderMapa(progresso);

  const botoes = document.querySelectorAll("[data-ponto]");
  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      abrirPontoDoMapa(Number(botao.dataset.ponto));
    });
  });

  return progresso;
}

window.cacaAoTesouro = {
  iniciarJogo,
  responderPonto,
  reiniciarAventura,
  verificarEnigma: (resposta) => verificarEnigma(progresso, resposta, pontos),
  mostrarInventario: () => mostrarInventario(progresso),
  reorganizarPistas: (novaOrdem) => reorganizarPistas(progresso, novaOrdem, salvarProgresso)
};