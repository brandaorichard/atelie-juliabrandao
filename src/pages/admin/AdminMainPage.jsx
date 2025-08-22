import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountBreadcrumb from "../../components/AccountBreadcrumb";
import BabyFormModal from "../../components/admin/BabyFormModal";
import { loadBabies, addBaby, editBaby, removeBaby } from "../../redux/adminBabiesSlice";
import BreadcrumbItensAdmin from "../../components/BreadcrumbItensAdmin";

export default function AdminMainPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(s => s.adminBabies);
  const token = useSelector(s => s.auth.token);
  const [tab, setTab] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (token) dispatch(loadBabies());
  }, [token, dispatch]);

  const categorias = useMemo(() => {
    const set = new Set(items.map(b => b.category).filter(Boolean));
    return Array.from(set);
  }, [items]);

  const filtrados = useMemo(() => {
    if (tab === "todos") return items;
    return items.filter(b => b.category === tab);
  }, [items, tab]);

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(bebe) {
    setEditing(bebe);
    setModalOpen(true);
  }
  function handleSubmit(form) {
    const payload = {
      nome: form.nome,
      slug: form.slug,
      category: form.category,
      price: form.price,
      installment: form.installment,
      description: form.description,
      boxType: form.boxType,
      images: form.images
    };
    if (editing) {
      dispatch(editBaby({ id: editing._id, data: payload }));
    } else {
      dispatch(addBaby(payload));
    }
    setModalOpen(false);
  }
  function confirmRemove(bebe) {
    setConfirmDelete(bebe);
  }
  function doRemove() {
    if (confirmDelete) dispatch(removeBaby(confirmDelete._id));
    setConfirmDelete(null);
  }

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
          <Link
            to="/admin/produtos"
            className="inline-block text-xs px-3 py-1 rounded bg-[#7a4fcf] hover:bg-[#ae95d9] text-white"
          >
            Acessar
          </Link>
        </div>
        <div className="p-5 rounded-lg bg-white border border-[#e0d6f7]">
          <h2 className="text-sm font-semibold mb-1 text-neutral-900">Pedidos</h2>
          <Link
            to="/admin/pedidos"
            className="inline-block text-xs px-3 py-1 rounded bg-[#7a4fcf] hover:bg-[#ae95d9] text-white"
          >
            Acessar
          </Link>
        </div>
        <div className="p-5 rounded-lg bg-[#f7f3fa] border border-[#e0d6f7] opacity-60">
          <h2 className="text-sm font-semibold mb-1 text-neutral-900">Usuários</h2>
          <p className="text-xs text-neutral-600 mb-3">(Em breve) Gestão de contas e permissões.</p>
        </div>
      </div>
    </div>
  );
}