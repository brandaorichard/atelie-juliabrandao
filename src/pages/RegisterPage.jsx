import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbItens from "../components/BreadcrumbItens";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://atelie-juliabrandao-backend-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          senha,
          telefone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "Erro ao criar conta");
        setLoading(false);
        return;
      }

      // Não salvar token e dados do usuário ainda, pois precisa confirmar email
      // Redireciona para a página de confirmação de email
      navigate("/confirm-email");
    } catch (err) {
      setErro("Erro de conexão com o servidor");
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
            { label: "Cadastre-se" }
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-2 tracking-wide">
          Criar uma conta
        </h1>
        <p className="text-base text-gray-700 mb-8">
          Compre mais rápido e acompanhe seus pedidos em um só lugar!
        </p>
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
          <label className="block mb-2 text-base text-gray-800">Nome completo</label>
          <input
            type="text"
            className="w-full p-3 border border-[#e5d3e9] rounded-2xl focus:outline-none focus:border-[#ae95d9] transition placeholder:text-gray-400"
            placeholder="ex.: Maria Perez"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-base text-gray-800">E-mail</label>
          <input
            type="email"
            className="w-full p-3 border border-[#e5d3e9] rounded-2xl focus:outline-none focus:border-[#ae95d9] transition placeholder:text-gray-400"
            placeholder="ex.: seunome@email.com.br"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-base text-gray-800">Telefone (opcional)</label>
          <input
            type="tel"
            className="w-full p-3 border border-[#e5d3e9] rounded-2xl focus:outline-none focus:border-[#ae95d9] transition placeholder:text-gray-400"
            placeholder="ex.: 11971923030"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.17 2.318M15.54 15.54A5.978 5.978 0 0112 17c-1.657 0-3.156-.672-4.24-1.76" />
              </svg>
            )}
          </button>
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2 text-base text-gray-800">Confirmar senha</label>
          <input
            type={showConfirmarSenha ? "text" : "password"}
            className="w-full p-3 border border-[#e5d3e9] rounded-2xl focus:outline-none focus:border-[#ae95d9] transition pr-10"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-[#ae95d9] hover:text-[#7a4fcf] transition"
            onClick={() => setShowConfirmarSenha(s => !s)}
            tabIndex={-1}
            aria-label={showConfirmarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {showConfirmarSenha ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.17 2.318M15.54 15.54A5.978 5.978 0 0112 17c-1.657 0-3.156-.672-4.24-1.76" />
              </svg>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full mt-5 py-3 rounded-full bg-[#ae95d9] text-white text-lg font-base hover:bg-[#7a4fcf] transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Criar uma conta"}
        </button>
        <div className="text-center mt-6 text-gray-800">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-[#7a4fcf] hover:underline font-medium">
            Iniciar sessão
          </Link>
        </div>
      </form>
    </div>
  );
}