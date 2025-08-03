import React, { useState } from "react";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import FilterDrawer from "../components/FilterDrawer";
import SortDrawer from "../components/SortDrawer";

const sortOptions = [
  { label: "Preço: Menor ao Maior", value: "price-asc" },
  { label: "Preço: Maior ao Menor", value: "price-desc" },
  { label: "A - Z", value: "az" },
  { label: "Z - A", value: "za" },
];

export default function Category2Page() {
  const [selectedSort, setSelectedSort] = useState("price-asc");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-light text-[#616161] mb-6 mt-6">A pronta entrega</h1>
      {/* Filtro e Ordenar */}
      <div className="flex items-center gap-2 mb-4">
        <button
          className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none cursor-pointer"
          onClick={() => setFilterOpen(true)}
        >
          <FaFilter className="text-base" />
          Filtrar
        </button>
        <button
          className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none cursor-pointer"
          onClick={() => setSortOpen(true)}
        >
          <FaSortAmountDown className="text-base" />
          Ordenar
        </button>
      </div>
      {/* Drawers */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(min, max) => {
          setMinValue(min);
          setMaxValue(max);
        }}
        minValue={minValue}
        maxValue={maxValue}
      />
      <SortDrawer
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        options={sortOptions}
        selected={selectedSort}
        onSelect={setSelectedSort}
      />
      {/* Mensagem centralizada */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 min-h-[300px]">
        <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 flex items-center justify-center">
          <span className="text-lg text-[#7a4fcf] font-medium text-center">
            No momento, todos os bebês a pronta entrega estão esgotados.
          </span>
        </div>
      </div>
    </div>
  );
}