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
    <div className="space-y-5">
      <BreadcrumbItensAdmin
        items={[
          { label: "Início", to: "/admin" },
          { label: "Produtos", to: "/admin/produtos" }
        ]}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-light tracking-wide">Produtos</h1>
        <button
          onClick={openCreate}
          className="
            px-3 py-1 text-xs md:text-xs font-medium
            bg-purple-600 hover:bg-purple-500 text-white rounded
            md:px-4 md:py-2
          "
        >
          Novo
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setTab("todos")}
          className={`px-2.5 py-1 rounded text-[11px] border border-neutral-700 ${
            tab === "todos" ? "bg-purple-600 text-white" : "bg-neutral-900 text-neutral-300"
          }`}
        >
          Todos
        </button>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setTab(cat)}
            className={`px-2.5 py-1 rounded text-[11px] border border-neutral-700 ${
              tab === cat ? "bg-purple-600 text-white" : "bg-neutral-900 text-neutral-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <div className="text-[11px] text-neutral-400">Carregando...</div>}
      {!loading && filtrados.length === 0 && (
        <div className="text-[11px] text-neutral-400">Nenhum item.</div>
      )}

      <div
        className="
          grid gap-2
          grid-cols-2
          sm:gap-3
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
        "
      >
        {filtrados.map(b => (
          <div
            key={b._id}
            className="
              border border-neutral-700 bg-neutral-900 rounded-md
              p-1.5 sm:p-2 flex flex-col group
            "
          >
            <div className="aspect-square w-full mb-1.5 sm:mb-2 overflow-hidden rounded bg-neutral-800">
              {b.images?.[0] && (
                <img
                  src={b.images[0]}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              )}
            </div>
            <h3 className="font-medium text-[10px] leading-tight line-clamp-2">{b.name}</h3>
              <p className="text-[10px] text-neutral-500">{b.slug}</p>
            <p className="text-[11px] font-semibold mt-1">
              {Number(b.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            <div className="flex gap-1 mt-1.5">
              <button
                onClick={() => openEdit(b)}
                className="flex-1 text-[10px] px-1.5 py-1 border border-neutral-600 rounded hover:bg-neutral-800"
              >
                Editar
              </button>
              <button
                onClick={() => confirmRemove(b)}
                className="flex-1 text-[10px] px-1.5 py-1 border border-neutral-600 rounded text-red-300 hover:bg-neutral-800"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <BabyFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initial={editing}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-neutral-900 border border-neutral-700 rounded p-6 w-full max-w-sm">
            <h4 className="font-semibold mb-3 text-sm">Confirmar remoção</h4>
            <p className="text-xs mb-4 text-neutral-300">
              Remover definitivamente <strong>{confirmDelete.name}</strong>?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3 py-1 text-xs border border-neutral-700 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={doRemove}
                className="px-3 py-1 text-xs rounded bg-red-600 text-white"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}