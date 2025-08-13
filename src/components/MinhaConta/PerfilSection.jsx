import React from "react";

export default function PerfilSection({
  perfil,
  setPerfil,
  isEditingPerfil,
  setIsEditingPerfil,
  showPasswordForm,
  setShowPasswordForm,
  handleSavePerfil,
  handleChangePassword,
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
      <form onSubmit={handleSavePerfil} className="grid gap-4 sm:grid-cols-2 text-sm">
        <div className="sm:col-span-2">
          <label className="block mb-1 font-medium">Nome completo *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={perfil.nome}
            onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
            disabled={!isEditingPerfil}
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
            onChange={(e) =>
              setPerfil({ ...perfil, telefone: e.target.value })
            }
            disabled={!isEditingPerfil}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">CPF *</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={perfil.cpf}
            onChange={(e) => setPerfil({ ...perfil, cpf: e.target.value })}
            disabled={!isEditingPerfil}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Data de nascimento</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={perfil.dataNascimento}
            onChange={(e) =>
              setPerfil({ ...perfil, dataNascimento: e.target.value })
            }
            disabled={!isEditingPerfil}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Gênero</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={perfil.genero}
            onChange={(e) => setPerfil({ ...perfil, genero: e.target.value })}
            disabled={!isEditingPerfil}
          >
            <option value="">Selecionar</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="nao_informar">Prefiro não informar</option>
          </select>
        </div>
        <div className="sm:col-span-2 flex items-center gap-2 pt-2">
          <label className="block mb-1 font-medium">Senha</label>
          <button
            type="button"
            className="text-xs text-[#7a4fcf] underline"
            onClick={() => setShowPasswordForm((v) => !v)}
          >
            Alterar senha
          </button>
        </div>
        {showPasswordForm && (
          <div className="sm:col-span-2 grid gap-2">
            <input
              type="password"
              placeholder="Senha atual"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="password"
              placeholder="Nova senha"
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="password"
              placeholder="Confirmar nova senha"
              className="border rounded px-3 py-2"
              required
            />
            <div className="flex gap-3">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                onClick={handleChangePassword}
              >
                Salvar senha
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="text-purple-700 hover:underline"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        {isEditingPerfil && (
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
        )}
      </form>
    </section>
  );
}