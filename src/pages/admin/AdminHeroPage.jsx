export default function AdminHeroPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-light tracking-wide">Painel Administrativo</h1>
        <p className="text-sm text-neutral-600 mt-2">
          Bem-vindo. Selecione uma área no menu: produtos, pedidos ou usuários.
        </p>
      </section>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="p-5 rounded-lg bg-white border border-[#e0d6f7]">
          <h2 className="text-sm font-semibold mb-1 text-neutral-900">Produtos</h2>
          <p className="text-xs text-neutral-600 mb-3">Gerencie catálogo (bebês) por categoria.</p>
          <a
            href="/admin/produtos"
            className="inline-block text-xs px-3 py-1 rounded bg-[#7a4fcf] hover:bg-[#ae95d9] text-white"
          >
            Acessar
          </a>
        </div>
        <div className="p-5 rounded-lg bg-white border border-[#e0d6f7]">
          <h2 className="text-sm font-semibold mb-1 text-neutral-900">Pedidos</h2>
          <a
            href="/admin/pedidos"
            className="inline-block text-xs px-3 py-1 rounded bg-[#7a4fcf] hover:bg-[#ae95d9] text-white"
          >
            Acessar
          </a>
        </div>
        <div className="p-5 rounded-lg bg-[#f7f3fa] border border-[#e0d6f7] opacity-60">
          <h2 className="text-sm font-semibold mb-1 text-neutral-900">Usuários</h2>
          <p className="text-xs text-neutral-600 mb-3">(Em breve) Gestão de contas e permissões.</p>
        </div>
      </div>
    </div>
  );
}