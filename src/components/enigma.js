export function verificarEnigma(progresso, resposta, pontos) {
  const todosConcluidos = progresso.pontosConcluidos.length === pontos.length;

  if (!todosConcluidos) {
    console.log("🔒 Você ainda precisa concluir todos os locais!");
    return false;
  }

  const respostaCorreta = "TESOURO";

  if (resposta?.trim().toUpperCase() === respostaCorreta) {
    console.log("🏆 ENIGMA RESOLVIDO!");
    console.log("🎉 Parabéns! Você encontrou o tesouro!");
    return true;
  }

  console.log("❌ Resposta incorreta!");
  return false;
}