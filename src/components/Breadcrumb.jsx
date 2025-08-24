import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  // Se itens custom forem passados, usa-os. Caso contrário mantém lógica anterior (não mostrada aqui).
  if (items && Array.isArray(items)) {
    return (
      <nav className="text-[11px] md:text-xs mb-3" aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-[#7a4fcf]">
          {items.map((it, i) => (
            <li key={i} className="flex items-center gap-1">
              {it.to ? (
                <Link to={it.to} className="hover:underline">
                  {it.label}
                </Link>
              ) : (
                <span className="font-medium">{it.label}</span>
              )}
              {i < items.length - 1 && <span className="text-[#7a4fcf]">{">"}</span>}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // fallback antigo
  return null;
}