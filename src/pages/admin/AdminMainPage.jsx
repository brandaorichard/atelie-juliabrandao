import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountBreadcrumb from "../../components/AccountBreadcrumb";
import BabyFormModal from "../../components/admin/BabyFormModal";
import { loadBabies, addBaby, editBaby, removeBaby } from "../../redux/adminBabiesSlice";

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
    <div className="px-4 pb-10">
      <AccountBreadcrumb current="Produtos" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light">Produtos (Bebês)</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm"
        >
          Novo Bebê
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setTab("todos")}
            className={`px-3 py-1 rounded text-sm border ${tab === "todos" ? "bg-purple-600 text-white" : "bg-white"}`}
        >
          Todos
        </button>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setTab(cat)}
            className={`px-3 py-1 rounded text-sm border ${tab === cat ? "bg-purple-600 text-white" : "bg-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-sm text-gray-500">Carregando...</div>
      )}

      {!loading && filtrados.length === 0 && (
        <div className="text-sm text-gray-500">
          Nenhum bebê nesta categoria.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtrados.map(b => (
          <div key={b._id} className="border rounded p-3 bg-white flex flex-col">
            <div className="aspect-square w-full mb-2 overflow-hidden rounded bg-gray-100">
              {b.images?.[0] && (
                <img
                  src={b.images[0]}
                  alt={b.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm line-clamp-2">{b.name}</h3>
              <p className="text-xs text-gray-500">{b.slug}</p>
              <p className="text-sm font-semibold mt-1">
                {Number(b.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </p>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openEdit(b)}
                className="flex-1 text-xs px-2 py-1 border rounded hover:bg-gray-50"
              >
                Editar
              </button>
              <button
                onClick={() => confirmRemove(b)}
                className="flex-1 text-xs px-2 py-1 border rounded text-red-600 hover:bg-red-50"
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
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-white rounded p-6 w-full max-w-sm">
            <h4 className="font-semibold mb-3 text-sm">Confirmar remoção</h4>
            <p className="text-xs mb-4">
              Remover definitivamente o bebê <strong>{confirmDelete.name}</strong>?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3 py-1 text-xs border rounded"
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