import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BreadcrumbItens from "../components/BreadcrumbItens";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://atelie-juliabrandao-backend-production.up.railway.app/api/auth/login",
        { email, senha },
        {
          headers: { "Content-Type": "application/json" },
          // Se usar cookies/sessão, descomente a linha abaixo:
          // withCredentials: true,
        }
      );

      // Se chegou aqui, login foi OK
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ nome: data.nome, email: data.email, _id: data._id })
      );
      navigate("/");

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErro(err.response.data.message);
      } else {
        setErro("Erro de conexão com o servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[55vh] flex flex-col bg-[#f9e7f6]">
      <div className="w-full max-w-2xl mx-auto pt-5 px-4">
        <BreadcrumbItens
          items={[
            { label: "Início", to: "/" },
            { label: "Minha Conta" },
            { label: "Login" }
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-8 tracking-wide">
          Iniciar sessão
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto bg-[#f9e7f6] px-4"
        autoComplete="off"
      >
        {erro && (
          <div className="mb-4 text-red-600 text-sm text-center">{erro}</div>
        )}
        <div className="mb-4">
          <label className="block mb-2 text-base text-gray-800">E-mail</label>
          <input
            type="email"
            className="w-full p-3 border border-[#e5d3e9] rounded-2xl focus:outline-none focus:border-[#ae95d9] transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-2 relative">
          <label className="block mb-2 text-base text-gray-800">Senha</label>
          <input
            type={showSenha ? "text" : "password"}
            className="w-full p-3 border border-[#e5d3e9] rounded-2xl focus:outline-none focus:border-[#ae95d9] transition pr-10"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-[#ae95d9] hover:text-[#7a4fcf] transition"
            onClick={() => setShowSenha(s => !s)}
            tabIndex={-1}
            aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {showSenha ? (
              // Olho cortado
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            ) : (
              // Olho aberto
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.17 2.318M15.54 15.54A5.978 5.978 0 0112 17c-1.657 0-3.156-.672-4.24-1.76" />
              </svg>
            )}
          </button>
          <div className="flex justify-end mt-2">
            <Link to="/esqueci-senha" className="text-xs text-[#7a4fcf] hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-3 py-3 rounded-full bg-[#ae95d9] text-white text-lg font-base hover:bg-[#7a4fcf] transition"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Iniciar sessão"}
        </button>
        <div className="text-center mt-6 text-gray-800">
          Não possui uma conta ainda?{" "}
          <Link to="/register" className="text-[#7a4fcf] hover:underline font-medium">
            Criar uma conta
          </Link>
        </div>
      </form>
    </div>
  );
}