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
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative ml-auto h-full w-full max-w-md bg-white p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{initial ? "Editar Bebê" : "Novo Bebê"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium">Nome</label>
            <input name="nome" value={form.nome} onChange={handleChange} className="w-full border px-2 py-1 rounded text-sm" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium">Slug</label>
              <input name="slug" value={form.slug} onChange={handleChange} className="w-full border px-2 py-1 rounded text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-medium">Categoria</label>
              <input name="category" value={form.category} onChange={handleChange} className="w-full border px-2 py-1 rounded text-sm" required />
            </div>
          </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium">Preço</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border px-2 py-1 rounded text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-medium">Parcelamento</label>
                <input name="installment" value={form.installment} onChange={handleChange} className="w-full border px-2 py-1 rounded text-sm" />
              </div>
            </div>
          <div>
            <label className="block text-xs font-medium">Tipo de Caixa</label>
            <input name="boxType" value={form.boxType} onChange={handleChange} className="w-full border px-2 py-1 rounded text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium">Descrição</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full border px-2 py-1 rounded text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium">Imagens (até 12)</label>
            <input type="file" accept="image/*" multiple onChange={handleFiles} className="text-sm" />
            <div className="flex flex-wrap gap-2 mt-2">
              {preview.map((src, i) => (
                <img key={i} src={src} alt="" className="w-16 h-16 object-cover rounded border" />
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border text-sm">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-purple-600 text-white text-sm">
              {initial ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}