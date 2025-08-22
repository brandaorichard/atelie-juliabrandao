import { Link } from "react-router-dom";

export default function AdminBreadcrumb({ items }) {
  return (
    <nav className="mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, idx) => (
          <li key={item.label} className="flex items-center">
            {item.to ? (
              <Link
                to={item.to}
                className="text-[#7a4fcf] hover:underline font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#7a4fcf] font-medium -ml-2">{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className="mx-2 text-[#7a4fcf]">{"›"}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}