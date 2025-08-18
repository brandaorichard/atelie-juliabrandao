export async function buscarEnderecoPorCep(cep) {
  const cleanCep = cep.replace(/\D/g, "");
  if (cleanCep.length !== 8) return null;
  const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  const data = await res.json();
  if (data.erro) return null;
  return {
    logradouro: data.logradouro || "",
    bairro: data.bairro || "",
    cidade: data.localidade || "",
    uf: data.uf || "",
  };
}