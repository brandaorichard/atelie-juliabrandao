import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export function FreightSection({
  cepInput,
  onCepChange,
  onCalcular,
  loadingFrete,
  erroFrete,
  opcoesFrete,
  freteSelecionado,
  onSelectFrete,
  endereco,
  showCepInput = true, // <-- novo prop
}) {
  return (
    <div className="px-3 md:px-6 mb-2">
      {showCepInput && (
        <>
          <div className="mb-2 text-sm text-[#616161]">
            <span>Calcule o frete para sua região:</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Digite seu CEP"
              value={cepInput}
              onChange={onCepChange}
              className="border border-[#616161] rounded-3xl px-3 py-2 w-32"
            />
            <button
              onClick={onCalcular}
              disabled={loadingFrete || cepInput.length !== 8}
              className="bg-[#7a4fcf] text-white px-4 py-2 rounded-3xl disabled:opacity-50 cursor-pointer"
            >
              {loadingFrete ? "Calculando..." : "Calcular frete"}
            </button>
          </div>
        </>
      )}
      <div className="flex items-center gap-2 border border-[#e6a04e] rounded px-3 py-2 text-[#e6a04e] text-sm mb-2">
        <FaExclamationTriangle className="mr-1" />
        O prazo da sua entrega deve ser somado com o prazo da confecção do bebê + o envio dos correios.
      </div>
      {erroFrete && <div className="text-red-500 mb-2">{erroFrete}</div>}
      {opcoesFrete.length > 0 && (
        <div className="space-y-2 mb-2">
          {opcoesFrete.map(frete => (
            <label key={frete.name} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="frete"
                checked={freteSelecionado?.name === frete.name}
                onChange={() => onSelectFrete(frete)}
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
      {freteSelecionado && (
        <div className="mb-3 px-3 md:px-4 py-3 rounded bg-[#f3e6f3] border border-[#e5d3e9]">
          {endereco && (
            <div className="text-sm text-[#616161] mb-2">
              <b>Endereço:</b> {endereco}
            </div>
          )}
          <div className="text-sm text-[#616161] mb-1">
            <b>Frete selecionado:</b> {freteSelecionado.name} - {freteSelecionado.deadline} dias úteis -{" "}
            <strong>
              {Number(freteSelecionado.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>
          <div className="text-sm text-[#616161]">
            <b>CEP:</b> {freteSelecionado.cep}
          </div>
        </div>
      )}
    </div>
  );
}