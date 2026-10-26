



export function mostrarQuiz(ponto) {
  console.log("================================");
  console.log(`📍 LOCAL: ${ponto.nome}`);
  console.log(`💎 TESOURO: ${ponto.tesouro}`);
  console.log("================================");
  console.log(`❓ ${ponto.pergunta}`);

  ponto.alternativas.forEach((alternativa, index) => {
    console.log(`${index + 1} - ${alternativa}`);
  });
}

export function responderQuiz(progresso, id, resposta, onConcluir, salvarProgresso) {
  const ponto = encontrarPonto(id);

  if (!ponto) {
    return false;
  }

  if (!progresso.pontosDesbloqueados.includes(id)) {
    console.log("Local bloqueado!");
    return false;
  }

  progresso.quizzes[id] = {
    resposta,
    correta: resposta === ponto.resposta
  };

  if (resposta === ponto.resposta) {
    console.log("✅ Resposta correta!");
    onConcluir?.(ponto);
    return true;
  }

  console.log("❌ Resposta incorreta!");
  console.log("Tente novamente.");
  salvarProgresso?.(progresso);
  return false;
}
