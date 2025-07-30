export default function Breadcrumb() {
  return (
    <nav className="mb-4 text-sm">
      <ol className="flex items-center gap-2 text-[#7a4fcf]">
        <li>
          <a href="/" className="underline hover:text-[#ae95d9]">Início</a>
        </li>
        <span className="text-[#ae95d9]">{" > "}</span>
        <li>
          <a href="#" className="underline hover:text-[#ae95d9]">Bebês Reborn Por Encomenda</a>
        </li>
      </ol>
    </nav>
  );
}