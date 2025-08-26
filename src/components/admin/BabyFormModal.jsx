import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";

function formatCurrencyInput(value) {
  // Remove tudo que não é número
  let cleaned = value.replace(/\D/g, "");
  // Remove zeros à esquerda
  cleaned = cleaned.replace(/^0+/, "");
  // Se vazio, retorna vazio
  if (!cleaned) return "";
  // Limita a 8 dígitos (até 999.999,99)
  cleaned = cleaned.slice(0, 8);
  // Adiciona zeros à esquerda para garantir pelo menos 3 dígitos
  cleaned = cleaned.padStart(3, "0");
  // Insere vírgula antes dos dois últimos dígitos
  let intPart = cleaned.slice(0, -2);
  let decimalPart = cleaned.slice(-2);
  // Adiciona pontos a cada 3 dígitos do inteiro
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${intPart},${decimalPart}`;
}

export default function BabyFormModal({ open, onClose, onSubmit, initial }) {
  const token = useSelector(s => s.auth.token);
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
  const [removing, setRemoving] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]); // NOVO

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
      setDeletedImages([]); // Limpa ao abrir novo modal
    } else {
      setForm(f => ({ ...f, images: [] }));
      setPreview([]);
      setDeletedImages([]);
    }
  }, [initial]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "price") {
      setForm(f => ({ ...f, price: formatCurrencyInput(value) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files);
    setForm(f => ({ ...f, images: [...f.images, ...files] }));
    setPreview(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  }

  async function handleRemoveImage(url) {
    if (!initial?._id) return;
    setRemoving(url);
    try {
      await axios.put(
        `https://atelie-juliabrandao-backend-production.up.railway.app/api/admin/bebes/${initial._id}/remove-image`,
        { url },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      setDeletedImages(prev => [...prev, url]); // Marca como deletada
    } catch (err) {
      alert("Erro ao remover imagem.");
    } finally {
      setRemoving(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
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
    // Remove imagens deletadas do preview antes de enviar
    setPreview(prev => prev.filter(img => !deletedImages.includes(img)));
    onSubmit(form);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        className="relative ml-auto h-full w-full max-w-md bg-white text-neutral-900 p-6 overflow-y-auto border-l border-[#e0d6f7]"
      >
        <h2 className="text-lg font-medium mb-4">{initial ? "Editar Bebê" : "Novo Bebê"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium">Nome</label>
            <input
              name="nome"
              placeholder="Bebê Reborn Kit Exemplo"
              value={form.nome}
              onChange={handleChange}
              className="w-full border border-[#e0d6f7] bg-[#f7f3fa] px-2 py-1 rounded text-sm text-neutral-900"
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
                className="w-full border border-[#e0d6f7] bg-[#f7f3fa] px-2 py-1 rounded text-sm text-neutral-900"
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
                className="w-full border border-[#e0d6f7] bg-[#f7f3fa] px-2 py-1 rounded text-sm text-neutral-900"
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
                type="text"
                inputMode="numeric"
                pattern="[0-9.,]*"
                placeholder="ex: 9.999,99"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-[#e0d6f7] bg-[#f7f3fa] px-2 py-1 rounded text-sm text-neutral-900"
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
                className="w-full border border-[#e0d6f7] bg-[#f7f3fa] px-2 py-1 rounded text-sm text-neutral-900"
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
                className="w-full border border-[#e0d6f7] bg-[#f7f3fa] px-2 py-1 rounded text-sm text-neutral-900"
              >
                <option value="">Selecione...</option>
                <option value="pequena">Pequena</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium">Descrição</label>
            <textarea
              name="description"
              placeholder="Detalhes adicionais..."
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-[#e0d6f7] bg-[#f7f3fa] px-2 py-1 rounded text-sm text-neutral-900"
            />
          </div>
          <div>
            <label className="text-xs font-medium flex items-center gap-2">
              Imagens (até 12)
              <span className="inline-block">
                <svg width="24" height="24" fill="none" stroke="#7a4fcf" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 16v-8M8 12l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="#7a4fcf" strokeWidth="2"/>
                </svg>
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="text-sm"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Imagens já existentes */}
              {initial?.images?.map((src, i) => (
                <div key={src} className="relative group">
                  <img
                    src={src}
                    alt=""
                    className={`w-16 h-16 object-cover rounded border border-[#e0d6f7] transition-all duration-300
                      ${deletedImages.includes(src) ? "opacity-40 grayscale" : ""}
                    `}
                  />
                  {!deletedImages.includes(src) && (
                    <button
                      type="button"
                      disabled={removing === src}
                      onClick={() => handleRemoveImage(src)}
                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1 border border-[#e0d6f7] opacity-80 hover:opacity-100 transition-opacity"
                      title="Remover imagem"
                    >
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M6 7h12M9 7v10m6-10v10M4 7h16l-1.5 12.5A2 2 0 0 1 16.5 21h-9a2 2 0 0 1-2-1.5L4 7z"
                          stroke="#e53e3e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                  {deletedImages.includes(src) && (
                    <span className="absolute top-1 right-1 bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-[10px] font-semibold opacity-80">
                      Removida
                    </span>
                  )}
                </div>
              ))}
              {/* Novas imagens (pré-visualização) */}
              {preview
                .filter(src => !initial?.images?.includes(src))
                .map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-16 h-16 object-cover rounded border border-[#e0d6f7]"
                  />
                ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-[#e0d6f7] text-sm text-neutral-900 bg-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#7a4fcf] hover:bg-[#ae95d9] text-white text-sm"
            >
              {initial ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}