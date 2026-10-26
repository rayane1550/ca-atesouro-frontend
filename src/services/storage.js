export function salvarProgresso(progresso) {
  if (typeof localStorage === "undefined") {
    return progresso;
  }

  localStorage.setItem("cacaAoTesouro", JSON.stringify(progresso));
  return progresso;
}

export function carregarProgresso() {
  if (typeof localStorage === "undefined") {
    return null;
  }

  const progressoSalvo = localStorage.getItem("cacaAoTesouro");
  return progressoSalvo ? JSON.parse(progressoSalvo) : null;
}

export function apagarProgresso() {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("cacaAoTesouro");
  }
}
