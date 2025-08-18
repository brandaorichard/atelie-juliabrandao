export function initializePerfil(user) {
  return {
    nome: user.nome || "",
    email: user.email || "",
    telefone: user.telefone || "",
    cpf: user.cpf || "",
    dataNascimento: "",
    genero: "",
  };
}

export function handleSavePerfil(e, setIsEditingPerfil, dispatch, showToast) {
  e.preventDefault();
  setIsEditingPerfil(false);
  dispatch(showToast({ message: "Perfil salvo (mock).", iconType: "info" }));
}
