import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaWhatsapp, FaInstagram, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Faixa colorida acima do header */}
      <div className="h-[27px] bg-[#ae95d9]" />

      {/* MOBILE HEADER */}
      <header className="w-full bg-[#f9e7f6] relative md:hidden">
        <div className="max-w-[1246px] px-[20px] mx-auto flex items-center justify-between h-20 relative">
          {/* Botão hamburger - mobile */}
          <div className="flex flex-1">
            <button
              className="mr-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Logo centralizada */}
          <div className="flex-1 flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-[120px] h-auto"
            />
          </div>

          {/* Ícones sociais */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <a href="https://wa.me/5567996101874" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="text-green-500 text-xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://instagram.com/seuusuario" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-pink-600 text-xl hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Menu mobile dropdown alinhado à esquerda */}
          {menuOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-[#f9e7f6] border border-[#ae95d9] rounded shadow-md flex flex-col z-50">
              <span className="px-6 py-3 text-[#616161] font-medium cursor-pointer hover:bg-[#f3d9f9] transition-colors">À Pronta Entrega</span>
              <span className="px-6 py-3 text-[#616161] font-medium cursor-pointer hover:bg-[#f3d9f9] transition-colors">Por Encomenda</span>
              <span className="px-6 py-3 text-[#616161] font-medium cursor-pointer hover:bg-[#f3d9f9] transition-colors">Por Semelhança</span>
            </div>
          )}
        </div>
      </header>

      {/* DESKTOP HEADER */}
      <header className="w-full bg-[#f9e7f6] hidden md:block">
        <div className="max-w-[1246px] px-[35px] mx-auto flex items-center justify-between h-40">
          {/* Logo à esquerda */}
          <div className="flex-1 flex justify-start">
            <img
              src={logo}
              alt="Logo"
              className="w-[120px] md:w-[220px] h-auto"
            />
          </div>

          {/* Categorias centralizadas */}
          <nav className="flex-1 flex justify-center gap-8">
            <span className="text-[#616161] font-medium cursor-pointer whitespace-nowrap">À Pronta Entrega</span>
            <span className="text-[#616161] font-medium cursor-pointer whitespace-nowrap">Por Encomenda</span>
            <span className="text-[#616161] font-medium cursor-pointer whitespace-nowrap">Por Semelhança</span>
          </nav>

          {/* Ícones sociais à direita */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <a href="https://wa.me/5567996101874" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="text-green-500 text-xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://instagram.com/seuusuario" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-pink-600 text-xl hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}