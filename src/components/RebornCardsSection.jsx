import React, { useState, useMemo } from "react";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import babies from "../mocks/babiesMock";
import { useNavigate } from "react-router-dom";
import SortDrawer from "./SortDrawer";

const sortOptions = [
  { label: "Preço: Menor ao Maior", value: "price-asc" },
  { label: "Preço: Maior ao Menor", value: "price-desc" },
  { label: "A - Z", value: "az" },
  { label: "Z - A", value: "za" },
];

export default function RebornCardsSection() {
  const navigate = useNavigate();
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("price-asc");

  // Ordenação memoizada para performance
  const sortedBabies = useMemo(() => {
    let arr = [...babies];
    switch (selectedSort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "az":
        arr.sort((a, b) =>
          a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
        );
        break;
      case "za":
        arr.sort((a, b) =>
          b.name.localeCompare(a.name, "pt-BR", { sensitivity: "base" })
        );
        break;
      default:
        break;
    }
    return arr;
  }, [selectedSort]);

  return (
    <section className="w-full bg-[#f9e7f6] py-6 px-2 mt-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-extralight text-[#616161] mb-2 text-left">
          Bebês Reborn por Encomenda
        </h2>
        {/* Linha de ações: Filtrar à esquerda, Ordenar à direita */}
        <div className="flex items-center justify-between mb-4 px-1 text-left mt-7">
          <div>
            <button className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none cursor-pointer">
              <FaFilter className="text-base" />
              Filtrar
            </button>
          </div>
          <div>
            <button
              className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none cursor-pointer mr-0 md:mr-13"
              onClick={() => setSortOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <FaSortAmountDown className="text-base" />
              Ordenar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:flex-wrap gap-x-4 gap-y-0 md:flex md:gap-6">
          {sortedBabies.map((baby) => (
            <div
              key={baby.id}
              onClick={() => navigate(`/produto/${baby.id}`)}
              className="
                bg-[#f3e3fa] rounded-md shadow-md overflow-hidden flex flex-col border-[1px] border-gray-400
                mb-4
                w-full
                md:w-[200px]
                h-[400px] md:h-[440px]
                cursor-pointer
                transition-transform
                hover:scale-[1.03]
              "
              tabIndex={0}
              role="button"
              aria-label={`Ver detalhes de ${baby.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  navigate(`/produto/${baby.id}`);
              }}
            >
              <div className="relative">
                <img
                  src={baby.img}
                  alt={baby.name}
                  className="w-full object-cover h-[275px] md:h-[320px]"
                />
                {baby.id === 1 && baby.discount && (
                  <span className="absolute top-2 left-2 bg-[#ae95d9] text-white text-xs font-bold px-2 py-1 rounded">
                    {baby.discount}
                  </span>
                )}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <span className="text-xs md:text-sm font-light text-black mb-1">
                  {baby.name}
                </span>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-base md:text-lg font-bold text-[#7a4fcf]">
                    R$
                    {baby.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  {baby.oldPrice && (
                    <span className="text-xs text-[#616161] line-through">
                      R$
                      {baby.oldPrice.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#ae95d9]">
                  {baby.installment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SortDrawer
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        options={sortOptions}
        selected={selectedSort}
        onSelect={setSelectedSort}
      />
    </section>
  );
}
