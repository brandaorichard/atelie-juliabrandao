import React, { useState, useMemo } from "react";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";
import FilterDrawer from "./FilterDrawer";
import SortDrawer from "./SortDrawer";
import RebornCard from "./RebornCard";
import Breadcrumb from "./Breadcrumb";

function parseBRL(str) {
  if (!str) return null;
  return parseFloat(String(str).replace(/\./g, "").replace(",", "."));
}

const sortOptions = [
  { label: "Preço: Menor ao Maior", value: "price-asc" },
  { label: "Preço: Maior ao Menor", value: "price-desc" },
  { label: "A - Z", value: "az" },
  { label: "Z - A", value: "za" },
];

function sortBabies(babies, sort) {
  const arr = [...babies];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "az":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "za":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return arr;
  }
}

function filterBabies(babies, minValue, maxValue) {
  return babies.filter((baby) => {
    const price = parseBRL(baby.price);
    if (minValue && price < parseBRL(minValue)) return false;
    if (maxValue && price > parseBRL(maxValue)) return false;
    return true;
  });
}

export default function CategoryCardsSection({
  title,
  babies,
  onCardClick,
  showFilter = true,
  showSort = true,
}) {
  const [selectedSort, setSelectedSort] = useState("price-asc");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredBabies = useMemo(() => {
    let filtered = filterBabies(babies, minValue, maxValue);
    if ((minValue || maxValue) && filtered.length === 0) setShowWarning(true);
    else setShowWarning(false);
    return sortBabies(filtered, selectedSort);
  }, [babies, minValue, maxValue, selectedSort]);

  function resetFilter() {
    setMinValue("");
    setMaxValue("");
    setShowWarning(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-4">
      <Breadcrumb />
      <h1 className="text-2xl font-light text-black mb-6 mt-6">{title}</h1>
      {/* Filtro e Ordenar */}
      {(showFilter || showSort) && (
        <div className="flex items-center gap-2 mb-4">
          {showFilter && (
            <button
              className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none cursor-pointer"
              onClick={() => setFilterOpen(true)}
            >
              <FaFilter className="text-base" />
              Filtrar
            </button>
          )}
          {showSort && (
            <button
              className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none cursor-pointer"
              onClick={() => setSortOpen(true)}
            >
              <FaSortAmountDown className="text-base" />
              Ordenar
            </button>
          )}
        </div>
      )}
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
      {showWarning && (
        <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded flex items-center justify-between">
          <span>
            Nenhum bebê encontrado para o valor informado. Tente outros valores ou remova o filtro.
          </span>
          <button
            className="ml-4 px-3 py-1 bg-yellow-300 text-yellow-900 rounded hover:bg-yellow-400"
            onClick={resetFilter}
          >
            Fechar
          </button>
        </div>
      )}
      {/* Grid de cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
  {filteredBabies.map((baby) => (
    <RebornCard
      key={baby.id}
      baby={baby}
      onClick={() => onCardClick(baby)}
      mini
    />
  ))}
</div>
    </div>
  );
}