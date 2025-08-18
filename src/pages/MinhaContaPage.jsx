import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../redux/toastSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import FormAddress from "../components/FormAddress";
import UserData from "../components/UserData";
import UserSecurity from "../components/UserSecurity";
import UserEmail from "../components/UserEmail";
import { initializePerfil, handleSavePerfil } from "../utils/userProfileUtils";
import { initializeEndereco, handleSaveEndereco, handleCepChange } from "../utils/addressUtils";

export default function MinhaContaPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.token);
  const user = useSelector((s) => s.auth.user) || {};

  const [isEditingPerfil, setIsEditingPerfil] = useState(false);
  const [isEditingEndereco, setIsEditingEndereco] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [perfil, setPerfil] = useState(initializePerfil(user));
  const [endereco, setEndereco] = useState(initializeEndereco(user.endereco));

  useEffect(() => {
    async function fetchUser() {
      if (!token) return;
      try {
        const res = await fetch(
          "https://atelie-juliabrandao-backend-production.up.railway.app/api/auth/user/me",
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          dispatch(login({ user: data, token }));
          setPerfil(initializePerfil(data)); // <-- perfil.email será atualizado aqui
          if (data.endereco) {
            setEndereco(initializeEndereco(data.endereco));
          }
        }
      } catch (err) {
        dispatch(showToast({ message: "Erro ao carregar dados do usuário", iconType: "error" }));
      }
    }
    fetchUser();
  }, [token, dispatch]);

  const show = (val, placeholder = "-") => (val ? val : placeholder);

  return (
    <div className="p-6 max-w-2xl mx-auto mt-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm items-center gap-2 text-[#7a4fcf] font-normal">
        <span className="cursor-pointer underline" onClick={() => navigate("/")}>
          Início
        </span>
        <span>&gt;</span>
        <span className="underline">Minha Conta</span>
      </nav>

      {/* Dados do usuário */}
      <UserData
        perfil={perfil}
        isEditingPerfil={isEditingPerfil}
        setIsEditingPerfil={setIsEditingPerfil}
        handleSavePerfil={(e) => handleSavePerfil(e, setIsEditingPerfil, dispatch, showToast)}
        setPerfil={setPerfil}
        show={show}
      />

      {/* Alteração de Email */}
      {/* <UserEmail user={user} token={token} dispatch={dispatch} showToast={showToast} /> */}

      {/* Endereço */}
      <section>
        <div className="flex items-center justify-between mb-4 mt-15">
          <h2 className="text-lg font-semibold">Endereço para entrega</h2>
          {!isEditingEndereco && (
            <button
              onClick={() => setIsEditingEndereco(true)}
              className="text-sm text-[#7a4fcf] underline"
            >
              {endereco.cep ? "Editar endereço" : "Adicionar endereço"}
            </button>
          )}
        </div>
        {!isEditingEndereco ? (
          endereco.cep ? (
            <ul className="text-sm space-y-1 mb-2">
              <li><b>CEP:</b> {show(endereco.cep)}</li>
              <li><b>Logradouro:</b> {show(endereco.logradouro)}</li>
              <li><b>Número:</b> {show(endereco.numero)}</li>
              <li><b>Complemento:</b> {show(endereco.complemento)}</li>
              <li><b>Bairro:</b> {show(endereco.bairro)}</li>
              <li><b>Cidade:</b> {show(endereco.cidade)}</li>
              <li><b>UF:</b> {show(endereco.uf)}</li>
              <li><b>Referência:</b> {show(endereco.referencia)}</li>
            </ul>
          ) : (
            <div className="text-sm text-gray-500 mb-2">Nenhum endereço cadastrado.</div>
          )
        ) : (
          <FormAddress
            endereco={endereco}
            setEndereco={setEndereco}
            onSubmit={(e) =>
              handleSaveEndereco(e, endereco, token, dispatch, user, setEndereco, setIsEditingEndereco, showToast, login)
            }
            onCancel={() => setIsEditingEndereco(false)}
            handleCepChange={(e) => handleCepChange(e, endereco, setEndereco)}
          />
        )}
      </section>

      {/* Segurança */}
      <UserSecurity
        showPasswordForm={showPasswordForm}
        setShowPasswordForm={setShowPasswordForm}
        handleChangePassword={(e) => {
          e.preventDefault();
          setShowPasswordForm(false);
          dispatch(showToast({ message: "Senha alterada (mock).", iconType: "info" }));
        }}
        currentEmail={user.email}
        pendingEmail={user.pendingEmail}
        onRequestEmailChange={(newEmail) => {
          // Aqui você pode implementar a lógica de alteração de email, ex: chamada para o backend
          dispatch(showToast({ message: `Solicitação para alterar email para ${newEmail}`, iconType: "info" }));
        }}
        loadingEmailChange={false}
      />
    </div>
  );
}