import { Link } from "react-router-dom";

export default function BreadcrumbItens({ items }) {
  return (
    <nav className="text-sm py-4 px-2" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-[#7a4fcf] font-light">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.to ? (
              <Link
                to={item.to}
                className="hover:underline font-medium underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#7a4fcf] font-medium underline">
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && (
              <span className="mx-1 text-[#ae95d9]">{'>'}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}