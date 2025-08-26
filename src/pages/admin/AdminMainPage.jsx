import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminMainPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <section>
        <h1 className="text-3xl font-light tracking-wide">Painel Administrativo</h1>
        <p className="text-sm text-neutral-600 mt-2">
          Bem-vindo. Selecione uma área no menu: produtos, pedidos ou usuários.
        </p>
      </section>
      <div className="grid gap-6 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-lg bg-white border border-[#e0d6f7]"
        >
          <h2 className="text-sm font-semibold mb-1 text-neutral-900">Produtos</h2>
          <p className="text-xs text-neutral-600 mb-3">Gerencie catálogo (bebês) por categoria.</p>
          <Link
            to="/admin/produtos"
            className="inline-block text-xs px-3 py-1 rounded bg-[#7a4fcf] hover:bg-[#ae95d9] text-white"
          >
            Acessar
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-lg bg-white border border-[#e0d6f7]"
        >
          <h2 className="text-sm font-semibold mb-1 text-neutral-900">Pedidos</h2>
          <Link
            to="/admin/pedidos"
            className="inline-block text-xs px-3 py-1 rounded bg-[#7a4fcf] hover:bg-[#ae95d9] text-white"
          >
            Acessar
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-lg bg-[#f7f3fa] border border-[#e0d6f7] opacity-60"
        >
          <h2 className="text-sm font-semibold mb-1 text-neutral-900">Usuários</h2>
          <p className="text-xs text-neutral-600 mb-3">(Em breve) Gestão de contas e permissões.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}