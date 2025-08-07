import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { showToast } from "../redux/toastSlice";
import { useNavigate } from "react-router-dom";

export default function MinhaContaPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleResendConfirmation = () => {
    // Aqui futuramente chamaremos API para reenviar e-mail
    dispatch(
      showToast({
        message: "E-mail de confirmação reenviado!",
        iconType: "success",
      })
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex mb-4 text-sm mt-5 items-center gap-2 text-[#7a4fcf]">
        <span
          className="cursor-pointer hover:underline underline"
          onClick={() => navigate("/")}
        >
          Início
        </span>{" "}
        &gt; <span className="font-light underline">Minha Conta</span>
      </nav>
      <h1 className="text-2xl font-light mb-6">Minha Conta</h1>

      <section className="mb-8">
        <h2 className="text-xl font-light mb-4">Informações do Usuário</h2>
        <p>
          <strong>Nome:</strong> {user?.nome || "Não informado"}
        </p>
        <p>
          <strong>E-mail:</strong> {user?.email || "Não informado"}
        </p>
        <p>
          <strong>Telefone:</strong> {user?.telefone || "Não informado"}
        </p>
        <p>
          <strong>Status do E-mail:</strong>{" "}
          {user?.isConfirmed ? (
            <span className="text-green-600 font-semibold">Confirmado</span>
          ) : (
            <>
              <span className="text-red-600 font-semibold">Não confirmado</span>{" "}
              <button
                onClick={handleResendConfirmation}
                className="text-purple-700 hover:underline ml-2"
              >
                Reenviar e-mail
              </button>
            </>
          )}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-light mb-4 cursor-pointer">Segurança</h2>
        <button
          onClick={() => setShowEditPassword(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Editar senha
        </button>

        {showEditPassword && (
          <div className="mt-4 p-4 border border-gray-300 rounded">
            {/* Aqui futuramente o formulário para alterar senha */}
            <p>Funcionalidade em desenvolvimento...</p>
            <button
              onClick={() => setShowEditPassword(false)}
              className="mt-2 text-purple-700 hover:underline"
            >
              Cancelar
            </button>
          </div>
        )}
      </section>

      <section>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sair da conta
        </button>
      </section>
    </div>
  );
}