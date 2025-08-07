// ConfirmEmailInstructionPage.jsx
import { Link } from "react-router-dom";

export default function ConfirmEmailInstructionPage() {
  return (
    <main className="min-h-[55vh] flex flex-col bg-[#f9e7f6] items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">Confirme seu email</h1>
      <p className="mb-4">
        Enviamos um email para você com um link de confirmação. Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
      </p>
      <p>
        Se não recebeu o email, verifique sua caixa de spam ou <Link to="/register" className="text-purple-600 underline">cadastre-se novamente</Link>.
      </p>
    </main>
  );
}