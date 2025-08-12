import React from "react";

export function CartHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between px-3 md:px-6 py-5 border-b border-[#e5d3e9]">
      <span className="text-lg font-light text-[#616161]">Carrinho de compras</span>
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="text-[#616161] text-4xl cursor-pointer"
        style={{ lineHeight: 1, padding: 0, background: "none", border: "none" }}
      >
        &times;
      </button>
    </div>
  );
}