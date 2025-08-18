import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../redux/toastSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import FormAddress from "../components/FormAddress";
import UserData from "../components/UserData";
import UserSecurity from "../components/UserSecurity";
import { buscarEnderecoPorCep } from "../utils/cepUtils";

export default function MinhaContaPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.token);
  const user = useSelector((s) => s.auth.user) || {};

  const [isEditingPerfil, setIsEditingPerfil] = useState(false);
  const [isEditingEndereco, setIsEditingEndereco] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [perfil, setPerfil] = useState({
    nome: user.nome || "",
    email: user.email || "",
    telefone: user.telefone || "",
    cpf: user.cpf || "",
    dataNascimento: "",
    genero: "",
  });

  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    referencia: "",
  });

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
          setPerfil({
            nome: data.nome || "",
            email: data.email || "",
            telefone: data.telefone || "",
            cpf: data.cpf || "",
            dataNascimento: "",
            genero: "",
          });
          if (data.endereco) {
            setEndereco({
              cep: data.endereco.cep || "",
              logradouro: data.endereco.logradouro || "",
              numero: data.endereco.numero || "",
              complemento: data.endereco.complemento || "",
              bairro: data.endereco.bairro || "",
              cidade: data.endereco.cidade || "",
              uf: data.endereco.uf || "",
              referencia: data.endereco.referencia || "",
            });
          }
        }
      } catch (err) {
        dispatch(showToast({ message: "Erro ao carregar dados do usuário", iconType: "error" }));
      }
    }
    fetchUser();
  }, [token, dispatch]);

  function handleSavePerfil(e) {
    e.preventDefault();
    setIsEditingPerfil(false);
    dispatch(showToast({ message: "Perfil salvo (mock).", iconType: "info" }));
  }

  function handleChangePassword(e) {
    e.preventDefault();
    setShowPasswordForm(false);
    dispatch(showToast({ message: "Senha alterada (mock).", iconType: "info" }));
  }

  async function handleSaveEndereco(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://atelie-juliabrandao-backend-production.up.railway.app/api/auth/user/endereco",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(endereco),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Erro ao salvar endereço");
      setEndereco(data.endereco);
      setIsEditingEndereco(false);
      dispatch(showToast({ message: "Endereço salvo com sucesso!", iconType: "success" }));
      dispatch(login({ user: { ...user, endereco: data.endereco }, token }));
    } catch (err) {
      dispatch(showToast({ message: err.message, iconType: "error" }));
    }
  }

  async function handleCepChange(e) {
    const cep = e.target.value;
    setEndereco({ ...endereco, cep });
    const dados = await buscarEnderecoPorCep(cep);
    if (dados) {
      setEndereco(end => ({
        ...end,
        ...dados,
      }));
    }
  }

  const show = (val, placeholder = "-") => val ? val : placeholder;

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
        handleSavePerfil={handleSavePerfil}
        setPerfil={setPerfil}
        show={show}
      />

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
            onSubmit={handleSaveEndereco}
            onCancel={() => setIsEditingEndereco(false)}
            handleCepChange={handleCepChange}
          />
        )}
      </section>

      {/* Segurança */}
      <UserSecurity
        showPasswordForm={showPasswordForm}
        setShowPasswordForm={setShowPasswordForm}
        handleChangePassword={handleChangePassword}
      />
    </div>
  );
}