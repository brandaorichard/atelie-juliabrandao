import { useEffect, useState } from "react";

export function useEnderecoCep(cep) {
  const [enderecos, setEnderecos] = useState({});
  useEffect(() => {
    async function fetchEndereco() {
      const cleanCep = cep && cep.replace(/\D/g, "");
      if (cleanCep && cleanCep.length === 8 && !enderecos[cleanCep]) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
          if (res.ok) {
            const data = await res.json();
            if (!data.erro) {
              setEnderecos(prev => ({
                ...prev,
                [cleanCep]: `${data.logradouro ? data.logradouro + ", " : ""}${data.bairro ? data.bairro + ", " : ""}${data.localidade ? data.localidade + " - " : ""}${data.uf || ""}`
              }));
            }
          }
        } catch {
          /* ignore */
        }
      }
    }
    fetchEndereco();
  }, [cep, enderecos]);
  const cleanCep = cep && cep.replace(/\D/g, "");
  return { enderecoAtual: enderecos[cleanCep], enderecos, setEnderecos };
}