import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../redux/toastSlice";
import { login } from "../redux/authSlice"; // Importa a action de login

export default function UserSecurity({
  showPasswordForm,
  setShowPasswordForm,
  handleChangePassword,
  currentEmail,
  pendingEmail,
}) {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.auth.token);
  const user = useSelector((s) => s.auth.user) || {};

  const [newEmail, setNewEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  async function handleRequestEmailChange(e) {
    e.preventDefault();
    setIsRequesting(true);
    try {
      const res = await fetch(
        "https://atelie-juliabrandao-backend-production.up.railway.app/api/auth/user/email-change",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ newEmail }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao solicitar alteração de email");
      dispatch(showToast({ message: "Email de confirmação enviado!", iconType: "success" }));
      // Atualiza pendingEmail no Redux
      dispatch(login({ user: { ...user, pendingEmail: newEmail }, token }));
      setNewEmail("");
      setShowEmailForm(false);
    } catch (err) {
      dispatch(showToast({ message: err.message, iconType: "error" }));
    } finally {
      setIsRequesting(false);
    }
  }

  // Renderiza aviso do novo email pendente, se existir e for diferente do atual
  const showPendingEmail =
    pendingEmail && pendingEmail !== currentEmail;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-6 mt-15">Segurança</h2>
      <div className="mb-10">
        {showPendingEmail && (
          <div className="mb-3">
            <span className="text-yellow-600 italic">
              {pendingEmail} <span className="text-xs">(aguardando confirmação)</span>
            </span>
          </div>
        )}
        {!showEmailForm && (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded text-sm mb-4"
            onClick={() => setShowEmailForm(true)}
          >
            Alterar email
          </button>
        )}
        {showEmailForm && (
          <form onSubmit={handleRequestEmailChange} className="max-w-sm">
            <label className="block text-sm font-medium mb-1">
              Novo email *
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="flex-1 border rounded px-3 py-2 text-sm"
                placeholder="seu-novo-email@exemplo.com"
              />
              <button
                type="submit"
                disabled={
                  isRequesting ||
                  !newEmail ||
                  newEmail === currentEmail
                }
                className={`bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-2 rounded text-sm whitespace-nowrap`}
              >
                {isRequesting ? "Enviando..." : "Solicitar"}
              </button>
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="text-purple-700 hover:underline"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Alteração de Senha */}
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