import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import babies from "../mocks/babiesMock";
import SortDrawer from "./SortDrawer";
import FilterDrawer from "./FilterDrawer";
import RebornSection from "./RebornSection";
import RebornCardList from "./RebornCardList";
import useFilteredBabies from "../hooks/useFilteredBabies";
import slugify from "../utils/slugify";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";

const categories = [
  { name: "Por Encomenda", filter: b => b.type === "encomenda" || !b.type },
  { name: "Pronta Entrega", filter: b => b.type === "pronta" },
  { name: "Por Semelhança", filter: b => b.type === "semelhanca" },
];

function parseBRL(str) {
  if (!str) return null;
  return parseFloat(str.replace(/\./g, "").replace(",", "."));
}

const sortOptions = [
  { label: "Preço: Menor ao Maior", value: "price-asc" },
  { label: "Preço: Maior ao Menor", value: "price-desc" },
  { label: "A - Z", value: "az" },
  { label: "Z - A", value: "za" },
];

export default function RebornCardsSection() {
  const navigate = useNavigate();
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("price-asc");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  // Filtro e ordenação só para "Por Encomenda"
  const filteredBabies = useFilteredBabies(
    babies.filter(categories[0].filter),
    selectedSort,
    minValue,
    maxValue,
    parseBRL
  );

  React.useEffect(() => {
    if ((minValue || maxValue) && filteredBabies.length === 0) {
      setShowWarning(true);
    }
  }, [filteredBabies.length, minValue, maxValue]);

  function resetFilter() {
    setMinValue("");
    setMaxValue("");
    setShowWarning(false);
  }

  return (
    <main>
      {/* Por Encomenda */}
      <RebornSection
        id={`categoria-${slugify(categories[0].name)}`}
        title="Bebês Reborn por Encomenda"
        actions={
          <div className="flex items-center justify-between mb-4 px-1 text-left mt-7">
            <button
              className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none cursor-pointer"
              onClick={() => setFilterOpen(true)}
            >
              <FaFilter className="text-base" />
              Filtrar
            </button>
            <button
              className="flex items-center gap-1 text-[#7a4fcf] text-sm font-medium hover:underline focus:outline-none cursor-pointer mr-0 md:mr-13"
              onClick={() => setSortOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <FaSortAmountDown className="text-base" />
              Ordenar
            </button>
          </div>
        }
      >
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
        <RebornCardList
          babies={showWarning ? babies.filter(categories[0].filter) : filteredBabies}
          onCardClick={baby => navigate(`/produto/${baby.id}`)}
        />
        <SortDrawer
          open={sortOpen}
          onClose={() => setSortOpen(false)}
          options={sortOptions}
          selected={selectedSort}
          onSelect={setSelectedSort}
        />
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
      </RebornSection>

      {/* Pronta Entrega */}
      <RebornSection
        id={`categoria-${slugify(categories[1].name)}`}
        title={categories[1].name}
      >
        <p>Em breve produtos disponíveis para pronta entrega!</p>
      </RebornSection>

      {/* Por Semelhança */}
      <RebornSection
        id={`categoria-${slugify(categories[2].name)}`}
        title={categories[2].name}
      >
        <p>Em breve você poderá encomendar bebês por semelhança!</p>
      </RebornSection>
    </main>
  );
}