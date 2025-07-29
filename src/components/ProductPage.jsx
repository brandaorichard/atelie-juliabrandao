import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import babies from "../mocks/babiesMock"; // Importa o mock unificado

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Busca o bebê pelo id (lembrando que useParams retorna string)
  const baby = babies.find(b => String(b.id) === String(id));

  // Se não encontrar, pode mostrar uma mensagem ou redirecionar
  if (!baby) {
    return (
      <section className="w-full bg-[#f9e7f6] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#ae95d9] mb-4">Bebê não encontrado 😢</h2>
          <button
            onClick={() => navigate("/")}
            className="text-[#7a4fcf] underline"
          >
            Voltar para a página inicial
          </button>
        </div>
      </section>
    );
  }

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? baby.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === baby.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-[#f9e7f6] min-h-screen py-8 px-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Carousel de imagens */}
        <div className="w-full md:w-[420px] flex flex-col items-center">
          <div className="relative w-full h-[340px] md:h-[420px] flex items-center justify-center">
            {/* Seta esquerda */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow hover:bg-white transition"
              onClick={handlePrev}
              aria-label="Imagem anterior"
            >
              <FaChevronLeft size={15} className="text-white" />
            </button>
            {/* Imagem principal animada */}
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={baby.images[current]}
                alt={baby.name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="object-cover w-full h-full rounded-lg shadow-lg bg-white"
              />
            </AnimatePresence>
            {/* Seta direita */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow hover:bg-white transition"
              onClick={handleNext}
              aria-label="Próxima imagem"
            >
              <FaChevronRight size={15} className="text-white" />
            </button>
          </div>
          {/* Miniaturas */}
          <div className="flex gap-2 mt-4">
            {baby.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`object-cover border-2 rounded-md p-1 transition-all ${
                  idx === current
                    ? "border-[#ae95d9]"
                    : "border-transparent opacity-70"
                }`}
                aria-label={`Selecionar imagem ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-14 h-14 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Lado direito: infos do produto */}
        <div className="flex-1 flex flex-col justify-start mt-6 md:mt-0">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm">
            <ol className="flex items-center gap-2 text-[#7a4fcf]">
              <li>
                <a href="/" className="underline hover:text-[#ae95d9]">Home</a>
              </li>
              <span className="text-[#ae95d9]">{" > "}</span>
              <li>
                <a href="#" className="underline hover:text-[#ae95d9]">Bebês Reborn Por Encomenda</a>
              </li>
            </ol>
          </nav>
          {/* Título e preço */}
          <h1 className="text-2xl md:text-3xl font-light text-[#616161] mb-2">{baby.name}</h1>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-2xl md:text-3xl font-bold text-[#7a4fcf]">
              R${baby.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            {baby.oldPrice && (
              <span className="text-base md:text-lg text-[#616161] line-through">
                R${baby.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            )}
            {baby.discount && (
              <span className="bg-[#ae95d9] text-white text-xs font-bold px-2 py-1 rounded">
                {baby.discount}
              </span>
            )}
          </div>
          <span className="text-sm text-[#ae95d9] mb-4">{baby.installment}</span>

          {/* Descrição curta */}
          <p className="text-base text-[#616161] mb-4">{baby.description}</p>

          {/* Características */}
          {baby.features && (
            <>
              <h2 className="text-lg font-semibold text-[#7a4fcf] mt-6 mb-2">Características:</h2>
              <ul className="list-disc pl-5 text-[#616161] mb-4">
                {baby.features.map((item, idx) => (
                  <li key={idx} className="mb-1">{item}</li>
                ))}
              </ul>
            </>
          )}

          {/* Itens do enxoval */}
          {baby.enxoval && (
            <>
              <h2 className="text-lg font-semibold text-[#7a4fcf] mt-6 mb-2">Itens do enxoval:</h2>
              <ul className="list-disc pl-5 text-[#616161]">
                {baby.enxoval.map((item, idx) => (
                  <li key={idx} className="mb-1">{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}