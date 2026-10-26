export function mostrarInventario(progresso) {
  console.log("🎒 INVENTÁRIO");

  if (progresso.inventario.length === 0) {
    console.log("Nenhuma pista encontrada.");
    return [];
  }

  progresso.inventario.forEach((item, index) => {
    console.log(`${index + 1}. ${item.nome}`);
  });

  return progresso.inventario;
}

export function reorganizarPistas(progresso, novaOrdem, salvarProgresso) {
  progresso.inventario = novaOrdem;
  salvarProgresso?.(progresso);
  console.log("🎒 Inventário reorganizado!");
  return progresso.inventario;
}