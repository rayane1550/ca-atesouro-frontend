import { pontos } from "../data/pontos.js";

export function encontrarPonto(id) {
  return pontos.find((ponto) => ponto.id === id);
}

export function desbloquearProximoPonto(progresso, idAtual) {
  const indiceAtual = pontos.findIndex((ponto) => ponto.id === idAtual);
  const proximo = pontos[indiceAtual + 1];

  if (!proximo) {
    return progresso;
  }

  if (!progresso.pontosDesbloqueados.includes(proximo.id)) {
    progresso.pontosDesbloqueados.push(proximo.id);
  }

  const pontoNoProgresso = progresso.pontos.find((item) => item.id === proximo.id);
  if (pontoNoProgresso) {
    pontoNoProgresso.status = "disponivel";
  }

  return progresso;
}

export function abrirPonto(progresso, id, callback) {
  const ponto = encontrarPonto(id);

  if (!ponto) {
    return false;
  }

  if (!progresso.pontosDesbloqueados.includes(id) && id !== 1) {
    console.log("🚫 Este ponto ainda está bloqueado.");
    return false;
  }

  callback?.(ponto);
  return true;
}

export function renderMapa(progressoAtual = { pontos, inventario: [] }) {
  const icones = ["🏖️", "🌲", "🕳️", "⛵", "💰"];
  const iconeStatus = {
    bloqueado: "🔒",
    disponivel: "⚓",
    andamento: "🧭",
    concluido: "✓"
  };

  const pontosHtml = (progressoAtual.pontos ?? []).map((ponto) => {
    const status = ponto.status || "bloqueado";

    return `
      <button
        type="button"
        class="ponto ${status} ponto-${ponto.id}"
        data-ponto="${ponto.id}"
        aria-label="Local ${ponto.nome} - ${status}"
      >
        <span class="icone-local">${icones[ponto.id - 1] || "📍"}</span>
        <h2>${ponto.nome}</h2>
        <span class="icone-status">${iconeStatus[status] || "🔒"}</span>
      </button>
    `;
  }).join("");

  const inventarioHtml = `
    <aside class="inventario">
      <h2>🧰 Inventário</h2>
      <div class="lista-pistas">
        ${(progressoAtual.inventario ?? []).length
          ? (progressoAtual.inventario ?? []).map((item, index) => `
              <div class="pista" draggable="true">
                <span>📜</span>
                <span>${item.nome || item.texto || `Pista ${index + 1}`}</span>
              </div>
            `).join("")
          : `<div class="inventario-vazio">Encontre pistas durante sua aventura!</div>`}
      </div>
    </aside>
  `;

  return `
    <main class="cenario">
      <div class="mapa">
        <div class="decoracao decoracao-mar"></div>

        <div class="bussola">
          <span class="norte">N</span>
          <span class="leste">L</span>
          <span class="sul">S</span>
          <span class="oeste">O</span>
          <span class="estrela-bussola">✦</span>
        </div>

        <h1 class="titulo">
          <span>Caça ao Tesouro</span>
        </h1>

        <div class="ilha ilha-praia">🌴</div>
        <div class="ilha ilha-floresta">🌳🌲🌳</div>
        <div class="ilha ilha-caverna">⛰️</div>
        <div class="ilha ilha-navio">⛵</div>
        <div class="ilha ilha-tesouro">🏝️</div>

        <div class="trilha">
          <span class="trilha-trecho"></span>
        </div>

        <div class="marcador-tesouro">✕</div>

        ${pontosHtml}
      </div>

      ${inventarioHtml}
    </main>
  `;
}

export function atualizarMapa(progressoAtual) {
  const app = document.getElementById("app");
  if (!app) {
    return;
  }

  app.innerHTML = renderMapa(progressoAtual);

  app.querySelectorAll("[data-ponto]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = Number(botao.dataset.ponto);
      abrirPonto(progressoAtual, id, (ponto) => {
        console.log(`📍 Abrindo ${ponto.nome}`);
      });
    });
  });
}