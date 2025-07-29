import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { FaTimes } from "react-icons/fa";
import { PiListLight } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoVariant = {
    initial: { scale: 1 },
    scrolled: { scale: 0.7 },
  };
  const transition = { type: "spring", stiffness: 300, damping: 30 };
  const headerHeight = scrolled ? 144 : 160;

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f9e7f6] md:hidden">
        <div className="max-w-[1246px] px-[20px] mx-auto flex items-center justify-between h-20 relative">
          {/* Botão hamburger - mobile */}
          <div className="flex flex-1">
            {!menuOpen && (
              <button
                className="mr-2"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menu"
              >
                <PiListLight size={24} />
              </button>
            )}
          </div>

          {/* Logo centralizada - animada */}
          <div className="flex-1 flex justify-center">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-[150px] h-auto"
              variants={logoVariant}
              animate={scrolled ? "scrolled" : "initial"}
              transition={transition}
              style={{ minWidth: 80, minHeight: 40 }}
            />
          </div>

          {/* Espaço reservado para alinhamento */}
          <div className="flex-1" />
        </div>

        {/* Dropdown ocupando 100% da tela */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-[#f9e7f6] flex flex-col"
            >
              {/* Top bar com X e borda superior */}
              <div
                className="flex items-center border-t"
                style={{ borderColor: "#616161", height: 56 }}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="p-4"
                >
                  <FaTimes className="text-[#616161] text-xl" />
                </button>
                <div className="flex-1" />
              </div>

              {/* Categorias animando da esquerda para direita */}
              <div className="flex flex-col items-start gap-8 px-8 mt-8">
                {["Por Encomenda", "Pronta Entrega", "Por Semelhança"].map(
                  (cat, i) => (
                    <motion.span
                      key={cat}
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -40, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 * i }}
                      className="text-[#616161] text-lg font-light cursor-pointer"
                    >
                      {cat}
                    </motion.span>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DESKTOP HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f9e7f6] hidden md:block">
        {/* Faixa roxa só no desktop, dentro do header */}
        <div className="h-[27px] bg-[#ae95d9] w-full" />
        <div
          className="max-w-[1246px] px-[35px] mx-auto flex items-center justify-between transition-all duration-300"
          style={{ height: headerHeight }}
        >
          {/* Logo à esquerda - animada */}
          <div className="flex-1 flex justify-start">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-[220px] h-auto"
              variants={logoVariant}
              animate={scrolled ? "scrolled" : "initial"}
              transition={transition}
            />
          </div>

          {/* Categorias centralizadas (não retraem) */}
          <nav className="flex-1 flex justify-center gap-8 text-large">
            <span
              className="text-gray-800 font-light cursor-pointer whitespace-nowrap"
              style={{ textShadow: "0 1px 2px #ae95d9, 0 0 1px #ae95d9" }}
            >
              👶🏻 Por Encomenda
            </span>
            <span
              className="text-gray-800 font-light cursor-pointer whitespace-nowrap"
              style={{ textShadow: "0 1px 2px #ae95d9, 0 0 1px #ae95d9" }}
            >
              👶🏻 Pronta Entrega
            </span>
            <span
              className="text-gray-800 font-light cursor-pointer whitespace-nowrap"
              style={{ textShadow: "0 1px 2px #ae95d9, 0 0 1px #ae95d9" }}
            >
              👶🏻 Por Semelhança
            </span>
          </nav>

          {/* Espaço reservado para alinhamento */}
          <div className="flex-1" />
        </div>
      </header>

      {/* Espaço para não sobrepor o conteúdo */}
      <div className="pt-20 md:pt-[171px]" />
    </>
  );
}
