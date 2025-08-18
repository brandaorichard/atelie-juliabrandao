import React from "react";

export default function UserData({
  perfil,
  isEditingPerfil,
  setIsEditingPerfil,
  handleSavePerfil,
  setPerfil,
  show,
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Meus dados</h2>
        {!isEditingPerfil && (
          <button
            onClick={() => setIsEditingPerfil(true)}
            className="text-sm text-[#7a4fcf] underline"
          >
            Editar informações
          </button>
        )}
      </div>
      {!isEditingPerfil ? (
        <ul className="text-sm space-y-1 mb-2">
          <li><b>Nome:</b> {show(perfil.nome)}</li>
          <li><b>E-mail:</b> {show(perfil.email)}</li>
          <li><b>Telefone:</b> {show(perfil.telefone)}</li>
          <li><b>CPF:</b> {show(perfil.cpf)}</li>
          <li><b>Data de nascimento:</b> {show(perfil.dataNascimento)}</li>
        </ul>
      ) : (
        <form onSubmit={handleSavePerfil} className="grid gap-4 sm:grid-cols-2 text-sm">
          <div className="sm:col-span-2">
            <label className="block mb-1 font-medium">Nome completo *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={perfil.nome}
              onChange={e => setPerfil({ ...perfil, nome: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">E-mail *</label>
            <input
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={perfil.email}
              disabled
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Telefone *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={perfil.telefone}
              onChange={e => setPerfil({ ...perfil, telefone: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">CPF *</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={perfil.cpf}
              onChange={e => setPerfil({ ...perfil, cpf: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Data de nascimento</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={perfil.dataNascimento}
              onChange={e => setPerfil({ ...perfil, dataNascimento: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded text-sm">
              Salvar alterações
            </button>
            <button
              type="button"
              onClick={() => setIsEditingPerfil(false)}
              className="text-sm underline text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}