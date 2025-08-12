import { useEffect, useState } from "react";

export function useEnderecoCep(cep) {
  const [enderecos, setEnderecos] = useState({});
  useEffect(() => {
    async function fetchEndereco() {
      if (cep && !enderecos[cep]) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          if (res.ok) {
            const data = await res.json();
            if (!data.erro) {
              setEnderecos(prev => ({
                ...prev,
                [cep]: `${data.logradouro ? data.logradouro + ", " : ""}${data.bairro ? data.bairro + ", " : ""}${data.localidade ? data.localidade + " - " : ""}${data.uf || ""}`
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
  return { enderecoAtual: enderecos[cep], enderecos, setEnderecos };
}