import React from "react";

export default function UserSecurity({
  showPasswordForm,
  setShowPasswordForm,
  handleChangePassword,
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4 mt-15">Segurança</h2>
      {!showPasswordForm && (
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded text-sm mb-4"
          onClick={() => setShowPasswordForm(true)}
        >
          Alterar senha
        </button>
      )}
      {showPasswordForm && (
        <form
          onSubmit={handleChangePassword}
          className="grid gap-2 max-w-xs"
        >
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
              type="submit"
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
        </form>
      )}
    </section>
  );
}