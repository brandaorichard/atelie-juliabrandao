import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PiListLight } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import CartButton from "./CartButton";
import CategoriesMenu from "./CategoriesMenu";
import CartDrawer from "./CartDrawer";
import { useSelector } from "react-redux";

export default function MobileHeader({
  menuOpen,
  setMenuOpen,
  scrolled,
  logoVariant,
  transition,
  categories,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useSelector(
  state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f9e7f6] md:hidden">
      {/* Faixa roxa só aparece se não estiver scrolled */}
      {!scrolled && (
        <div className="h-[25px] bg-[#c5adee] w-full transition-all duration-300 flex items-center justify-center">
          <span className="text-black text-[10px] font-extralight tracking-wide select-none">
            ✈️ ENVIAMOS PARA TODO O BRASIL E EXTERIOR! ✈️
          </span>
        </div>
      )}
      <div
        className="
          max-w-[1246px] px-[20px] mx-auto flex items-center justify-between h-28 relative
          border-b border-[#e5d3e9] shadow-[0_2px_8px_0_rgba(174,149,217,0.08)] bg-[#f9e7f6]
        "
      >
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
        <div className="flex-1 flex justify-center">
          <div
            onClick={handleLogoClick}
            className="w-[150px] h-auto cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label="Ir para a página inicial"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleLogoClick();
            }}
            style={{ minWidth: 80, minHeight: 40 }}
          >
            <AnimatedLogo
              variants={logoVariant}
              animate={scrolled ? "scrolled" : "initial"}
              transition={transition}
              className="w-[150px] h-auto"
            />
          </div>
        </div>
        <div className="flex-1" />
        <div className="absolute right-0 top-0 h-full flex items-center pr-6">
          <CartButton
            size={24}
            className="text-gray-500"
            onClick={() => setCartOpen(true)}
            badge={cartCount}
          />
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="
              absolute left-1 top-[40px] z-50
              bg-[#f9e7f6]
              rounded-sm
              shadow-xl
              pb-10
              border border-[#f9e7f6]/80
              flex flex-col items-start
              min-w-[150px]
              max-w-[60vw]
            "
          >
            <div className="flex items-center w-full mb-2">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="p-2"
              >
                <FaTimes className="text-[#616161] text-xl" />
              </button>
              <div className="flex-1" />
            </div>
            <CategoriesMenu
              categories={categories}
              animated
              onCategoryClick={idx => {
                if (idx === 0) navigate("/categoria1");
                if (idx === 1) navigate("/categoria2");
                if (idx === 2) navigate("/categoria3");
                setMenuOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}