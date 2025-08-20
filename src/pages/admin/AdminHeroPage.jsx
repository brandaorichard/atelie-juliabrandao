export default function AdminHeroPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-light tracking-wide">Painel Administrativo</h1>
        <p className="text-sm text-neutral-400 mt-2">
          Bem-vindo. Selecione uma área no menu: produtos, pedidos ou usuários.
        </p>
      </section>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="p-5 rounded-lg bg-neutral-900 border border-neutral-700">
          <h2 className="text-sm font-semibold mb-1">Produtos</h2>
          <p className="text-xs text-neutral-400 mb-3">Gerencie catálogo (bebês) por categoria.</p>
          <a
            href="/admin/produtos"
            className="inline-block text-xs px-3 py-1 rounded bg-purple-600 hover:bg-purple-500"
          >
            Acessar
          </a>
        </div>
        <div className="p-5 rounded-lg bg-neutral-900 border border-neutral-700 opacity-60">
          <h2 className="text-sm font-semibold mb-1">Pedidos</h2>
          <p className="text-xs text-neutral-400 mb-3">(Em breve) Acompanhe e atualize status.</p>
        </div>
        <div className="p-5 rounded-lg bg-neutral-900 border border-neutral-700 opacity-60">
          <h2 className="text-sm font-semibold mb-1">Usuários</h2>
          <p className="text-xs text-neutral-400 mb-3">(Em breve) Gestão de contas e permissões.</p>
        </div>
      </div>
    </div>
  );
}