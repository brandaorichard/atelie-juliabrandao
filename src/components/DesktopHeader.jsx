import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedLogo from "./AnimatedLogo";
import CartButton from "./CartButton";
import CategoriesMenu from "./CategoriesMenu";
import CartDrawer from "./CartDrawer";
import { useSelector } from "react-redux";
import UserButton from "./UserButton";

export default function DesktopHeader({
  scrolled,
  logoVariant,
  transition,
  headerHeight,
  categories,
}) {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cartCount = useSelector(
    (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleLogoClick = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  // Empilha ícones em coluna entre 768px e 930px
  const stackIcons = windowWidth < 930 && windowWidth >= 768;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f9e7f6] hidden md:block">
      {!scrolled && (
        <div className="h-[30px] bg-[#ae95d9] w-full transition-all duration-300 flex items-center justify-center">
          <span className="text-black text-[12px] font-light tracking-wide select-none">
            ✈️ ENVIAMOS PARA TODO O BRASIL E EXTERIOR! ✈️
          </span>
        </div>
      )}
      <div className="w-full border-b border-[#e5d3e9] shadow-[0_2px_8px_0_rgba(174,149,217,0.08)] bg-[#f9e7f6]">
        <div
          className="flex items-center justify-between max-w-[1246px] mx-auto px-[35px] transition-all duration-300"
          style={{ height: headerHeight }}
        >
          {/* Logo à esquerda */}
          <div className="flex-1 flex justify-start">
            <div
              onClick={handleLogoClick}
              className="w-[220px] h-auto cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label="Ir para a página inicial"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleLogoClick();
              }}
            >
              <AnimatedLogo
                variants={logoVariant}
                animate={scrolled ? "scrolled" : "initial"}
                transition={transition}
                className="w-[220px] h-auto"
              />
            </div>
          </div>

          {/* Categorias centralizadas */}
          <nav className="flex-1 flex justify-center gap-8 text-large">
            <CategoriesMenu
              categories={categories}
              onCategoryClick={(idx) => {
                if (idx === 0) navigate("/categoria1");
                if (idx === 1) navigate("/categoria2");
                if (idx === 2) navigate("/categoria3");
              }}
            />
          </nav>

          {/* Ícones à direita */}
          <div
            className={`flex-1 flex justify-end items-center pr-6 ${
              stackIcons ? "flex-col gap-2" : "flex-row gap-4"
            }`}
          >
            <UserButton />
            <CartButton
              size={28}
              className="text-gray-700 cursor-pointer"
              onClick={() => setCartOpen(true)}
              badge={cartCount}
            />
          </div>
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}