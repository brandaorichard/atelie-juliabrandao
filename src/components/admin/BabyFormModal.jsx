import { useState, useEffect } from "react";

export default function BabyFormModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState({
    nome: "",
    slug: "",
    category: "",
    price: "",
    installment: "",
    boxType: "",
    description: "",
    images: []
  });
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    if (initial) {
      setForm({
        nome: initial.name || "",
        slug: initial.slug || "",
        category: initial.category || "",
        price: initial.price || "",
        installment: initial.installment || "",
        boxType: initial.boxType || "",
        description: initial.description || "",
        images: []
      });
      setPreview(initial.images || []);
    } else {
      setForm(f => ({ ...f, images: [] }));
      setPreview([]);
    }
  }, [initial]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files);
    setForm(f => ({ ...f, images: files }));
    setPreview(files.map(f => URL.createObjectURL(f)));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // validações básicas enum
    const allowedCat = ["encomenda", "pronta_entrega", "semelhanca"];
    const allowedBox = ["pequena", "grande"];
    if (!allowedCat.includes(form.category)) {
      alert("Selecione uma categoria válida.");
      return;
    }
    if (!allowedBox.includes(form.boxType)) {
      alert("Selecione um tipo de caixa válido.");
      return;
    }
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative ml-auto h-full w-full max-w-md bg-neutral-900 text-neutral-100 p-6 overflow-y-auto border-l border-neutral-800">
        <h2 className="text-lg font-medium mb-4">{initial ? "Editar Bebê" : "Novo Bebê"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium">Nome</label>
            <input
              name="nome"
              placeholder="Bebê Reborn Kit Exemplo"
              value={form.nome}
              onChange={handleChange}
              className="w-full border border-neutral-700 bg-neutral-800 px-2 py-1 rounded text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium">Slug</label>
              <input
                name="slug"
                placeholder="kit-exemplo"
                value={form.slug}
                onChange={handleChange}
                className="w-full border border-neutral-700 bg-neutral-800 px-2 py-1 rounded text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium">Categoria</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border border-neutral-700 bg-neutral-800 px-2 py-1 rounded text-sm"
              >
                <option value="">Selecione...</option>
                <option value="encomenda">Encomenda</option>
                <option value="pronta_entrega">Pronta Entrega</option>
                <option value="semelhanca">Semelhança</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium">Preço</label>
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="ex: 9999.99"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-neutral-700 bg-neutral-800 px-2 py-1 rounded text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium">Parcelamento</label>
              <input
                name="installment"
                placeholder="ex: 9x de R$999.00"
                value={form.installment}
                onChange={handleChange}
                className="w-full border border-neutral-700 bg-neutral-800 px-2 py-1 rounded text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium">Tipo de Caixa</label>
              <select
                name="boxType"
                value={form.boxType}
                onChange={handleChange}
                required
                className="w-full border border-neutral-700 bg-neutral-800 px-2 py-1 rounded text-sm"
              >
                <option value="">Selecione...</option>
                <option value="pequena">Pequena</option>
                <option value="grande">Grande</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium">Descrição</label>
              <textarea
                name="description"
                placeholder="Detalhes adicionais..."
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-neutral-700 bg-neutral-800 px-2 py-1 rounded text-sm h-[86px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium">Imagens (até 12)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="text-sm"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {preview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-16 h-16 object-cover rounded border border-neutral-700"
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-neutral-600 text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white text-sm"
            >
              {initial ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}