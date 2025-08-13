import React, { useState } from "react";
import EnderecoModal from "./EnderecoModal";

export default function EnderecoSection({
  endereco,
  setEndereco,
  isEditingEndereco,
  setIsEditingEndereco,
  handleSaveEndereco,
}) {
  return (
    <section className="bg-[#f9e7f6] border rounded-sm shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Endereço para entrega</h2>
        {!isEditingEndereco && (
          <button
            onClick={() => setIsEditingEndereco(true)}
            className="text-sm text-[#7a4fcf] underline"
          >
            Editar endereço
          </button>
        )}
      </div>
      <form onSubmit={handleSaveEndereco} className="grid gap-4 sm:grid-cols-2 text-sm">
        <div>
          <label className="block mb-1">CEP *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={endereco.cep}
            onChange={(e) =>
              setEndereco({ ...endereco, cep: e.target.value })
            }
            maxLength={9}
            disabled={!isEditingEndereco}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1">Logradouro *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={endereco.logradouro}
            onChange={(e) =>
              setEndereco({ ...endereco, logradouro: e.target.value })
            }
            disabled={!isEditingEndereco}
          />
        </div>
        <div>
          <label className="block mb-1">Número *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={endereco.numero}
            onChange={(e) =>
              setEndereco({ ...endereco, numero: e.target.value })
            }
            disabled={!isEditingEndereco}
          />
        </div>
        <div>
          <label className="block mb-1">Complemento</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={endereco.complemento}
            onChange={(e) =>
              setEndereco({ ...endereco, complemento: e.target.value })
            }
            disabled={!isEditingEndereco}
          />
        </div>
        <div>
          <label className="block mb-1">Bairro *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={endereco.bairro}
            onChange={(e) =>
              setEndereco({ ...endereco, bairro: e.target.value })
            }
            disabled={!isEditingEndereco}
          />
        </div>
        <div>
          <label className="block mb-1">Cidade *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={endereco.cidade}
            onChange={(e) =>
              setEndereco({ ...endereco, cidade: e.target.value })
            }
            disabled={!isEditingEndereco}
          />
        </div>
        <div>
          <label className="block mb-1">UF *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={endereco.uf}
            onChange={(e) =>
              setEndereco({
                ...endereco,
                uf: e.target.value.toUpperCase().slice(0, 2),
              })
            }
            maxLength={2}
            disabled={!isEditingEndereco}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1">Referência</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={endereco.referencia}
            onChange={(e) =>
              setEndereco({ ...endereco, referencia: e.target.value })
            }
            disabled={!isEditingEndereco}
          />
        </div>
        {isEditingEndereco && (
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded text-sm">
              Salvar endereço
            </button>
            <button
              type="button"
              onClick={() => setIsEditingEndereco(false)}
              className="text-sm underline text-gray-600"
            >
              Cancelar
            </button>
          </div>
        )}
      </form>
    </section>
  );
}