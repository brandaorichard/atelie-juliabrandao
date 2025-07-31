import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import React, { useState, useEffect } from "react";

// Função de máscara corrigida
function formatCurrencyInput(value) {
  let v = value.replace(/\D/g, "");
  v = v.slice(0, 6);
  if (!v) return "";
  if (v.length === 1) return `0,0${v}`;
  if (v.length === 2) return `0,${v}`;
  let cents = v.slice(-2);
  let reais = v.slice(0, -2);
  reais = parseInt(reais, 10).toLocaleString("pt-BR");
  return `${reais},${cents}`;
}

// Função para pegar só os números (para enviar ao filtro)
function unformatCurrencyInput(value) {
  return value.replace(/\D/g, "");
}

export default function FilterDrawer({ open, onClose, onApply, minValue, maxValue }) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    setMin(formatCurrencyInput(unformatCurrencyInput(minValue || "")));
    setMax(formatCurrencyInput(unformatCurrencyInput(maxValue || "")));
  }, [minValue, maxValue, open]);

  const handleMinChange = (e) => {
    setMin(formatCurrencyInput(e.target.value));
  };

  const handleMaxChange = (e) => {
    setMax(formatCurrencyInput(e.target.value));
  };

  const handleApply = () => {
    onApply(min, max);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Fechar filtro"
          />
          {/* Drawer lateral esquerda */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 left-0 h-full z-60"
            style={{
              width: "90vw",
              maxWidth: 350,
              minWidth: 0,
              background: "#f9e7f6",
              boxShadow: "4px 0 16px 0 rgba(174,149,217,0.18)",
            }}
          >
            <style>
              {`
                @media (min-width: 768px) {
                  .filter-drawer-custom {
                    width: 25vw !important;
                    min-width: 260px !important;
                    max-width: none !important;
                  }
                }
              `}
            </style>
            <div className="filter-drawer-custom h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5d3e9]">
                <span className="text-lg font-light text-[#616161]">Filtrar</span>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="text-[#616161] text-xl cursor-pointer"
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col gap-4 px-6 py-6">
                <label className="text-[#616161] text-sm font-medium mb-1">Valor</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="0,00"
                    value={min}
                    maxLength={10}
                    onChange={handleMinChange}
                    className="w-24 px-2 py-1 rounded border border-[#ae95d9] bg-white text-[#616161] text-sm focus:outline-none"
                  />
                  <span className="text-[#ae95d9] font-bold">até</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="0,00"
                    value={max}
                    maxLength={10}
                    onChange={handleMaxChange}
                    className="w-24 px-2 py-1 rounded border border-[#ae95d9] bg-white text-[#616161] text-sm focus:outline-none"
                  />
                  <button
                    onClick={handleApply}
                    className="ml-2 p-2 rounded bg-[#ae95d9] hover:bg-[#7a4fcf] text-white flex items-center justify-center cursor-pointer"
                    aria-label="Aplicar filtro"
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}