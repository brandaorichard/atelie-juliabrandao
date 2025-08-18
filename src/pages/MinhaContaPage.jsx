import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../redux/toastSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import EnderecoForm from "../components/EnderecoForm";
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

      {/* Meus dados */}
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
                onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
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
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">CPF *</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={perfil.cpf}
                onChange={(e) => setPerfil({ ...perfil, cpf: e.target.value })}
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
          <EnderecoForm
            endereco={endereco}
            setEndereco={setEndereco}
            onSubmit={handleSaveEndereco}
            onCancel={() => setIsEditingEndereco(false)}
            handleCepChange={handleCepChange}
          />
        )}
      </section>

      {/* Segurança */}
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
    </div>
  );
}