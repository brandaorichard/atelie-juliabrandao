import React, { useState } from "react";
import axios from "axios";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setCep, setFreteSelecionado } from "../redux/freteSlice";

export default function FreteCalculator({ items }) {
  const dispatch = useDispatch();
  const cep = useSelector(state => state.frete.cep);
  const freteSelecionado = useSelector(state => state.frete.freteSelecionado);

  const [fretes, setFretes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function calcularFrete() {
    setLoading(true);
    setErro("");
    setFretes([]);
    try {
      const res = await axios.post("https://atelie-juliabrandao-backend-production.up.railway.app/api/frete/calcular", {
        cepDestino: cep,
        items,
      });
      const services = (Array.isArray(res.data) ? res.data : res.data.services || [])
        .filter(s => !s.has_error && s.price)
        .map(s => ({
          name: s.name,
          price: s.price,
          deadline: s.delivery_time || (s.delivery_range && s.delivery_range.max) || null,
          company: s.company?.name,
          logo: s.company?.picture,
        }));
      setFretes(services);
    } catch (err) {
      console.log(err);
      setErro("Não foi possível calcular o frete. Verifique o CEP.");
    } finally {
      setLoading(false);
    }
  }

  function handleCepChange(e) {
    dispatch(setCep(e.target.value.replace(/\D/g, "").slice(0, 8)));
  }

  function handleFreteChange(frete) {
    dispatch(setFreteSelecionado(frete));
  }

  return (
    <div className="my-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={handleCepChange}
          className="border border-[#616161] rounded-3xl px-3 py-2 w-40 h-9"
        />
        <button
          onClick={calcularFrete}
          disabled={loading || cep.length !== 8}
          className="bg-[#7a4fcf] text-white px-4 py-2 rounded-3xl disabled:opacity-50 cursor-pointer"
        >
          Calcular frete
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2  border border-[#e6a04e] rounded px-3 py-2 text-[#e6a04e] text-sm">
        <FaExclamationTriangle className="mr-1" />
        O prazo da sua entrega deve ser somado com o prazo da confecção do bebê + o envio dos correios.
      </div>
      {erro && <div className="text-red-500 mt-2">{erro}</div>}
      {fretes.length > 0 && (
        <div className="mt-2 space-y-2">
          {fretes.map(frete => (
            <label key={frete.name} className="flex items-center gap-2">
              <input
                type="radio"
                name="frete"
                checked={freteSelecionado?.name === frete.name}
                onChange={() => handleFreteChange(frete)}
              />
              <span>
                {frete.name} - {frete.deadline} dias úteis -{" "}
                <strong>
                  {Number(frete.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}