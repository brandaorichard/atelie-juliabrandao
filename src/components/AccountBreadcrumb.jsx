import { useSelector } from "react-redux";
import BreadcrumbItens from "./BreadcrumbItens";

export default function AccountBreadcrumb({ current }) {
  const user = useSelector(s => s.auth.user);
  const isAdmin = user?.role === "admin";

  if (isAdmin) {
    // Admin: sempre base "Produtos"
    const items = [{ label: "Produtos", to: "/admin/produtos" }];
    if (current === "Pedidos") {
      items.push({ label: "Pedidos" });
    }
    return <BreadcrumbItens items={items} />;
  }

  // Usuário comum
  const items = [
    { label: "Início", to: "/" },
    { label: "Minha Conta", to: "/minha-conta" },
  ];
  if (current) items.push({ label: current });
  return <BreadcrumbItens items={items} />;
}