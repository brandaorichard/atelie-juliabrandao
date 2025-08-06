import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BreadcrumbItens from "../components/BreadcrumbItens";

export default function ConfirmEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function confirmEmail() {
      try {
        const response = await fetch(`https://atelie-juliabrandao-backend-production.up.railway.app/api/auth/confirm/${token}`, {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Email confirmado com sucesso!");
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setStatus("error");
          setMessage(data.message || "Erro ao confirmar email.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Erro de conexão com o servidor.");
      }
    }

    confirmEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-[55vh] flex flex-col bg-[#f9e7f6]">
      <div className="w-full max-w-2xl mx-auto pt-5 px-4">
        <BreadcrumbItens
          items={[
            { label: "Início", to: "/" },
            { label: "Confirmação de Email" }
          ]}
        />
        {status === "loading" && <p className="text-center text-gray-700">Confirmando seu email, por favor aguarde...</p>}
        {status === "success" && (
          <div className="text-center px-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Confirmação realizada!</h1>
            <p className="text-gray-700">{message}</p>
            <p className="mt-4 text-gray-700">Você será redirecionado para a página de login em instantes.</p>
            <Link to="/login" className="mt-6 inline-block text-purple-600 hover:underline font-medium">
              Ir para Login agora
            </Link>
          </div>
        )}
        {status === "error" && (
          <div className="text-center px-4">
            <h1 className="text-2xl font-semibold mb-4 text-red-600">Erro na confirmação</h1>
            <p className="text-red-600">{message}</p>
            <Link to="/register" className="mt-6 inline-block text-purple-600 hover:underline font-medium">
              Voltar para cadastro
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}