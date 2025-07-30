import { useNavigate, useLocation } from "react-router-dom";
import { PiListLight } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import CartButton from "./CartButton";
import CategoriesMenu from "./CategoriesMenu";

export default function MobileHeader({
  menuOpen,
  setMenuOpen,
  scrolled,
  logoVariant,
  transition,
  categories
}) {
  const navigate = useNavigate();
  const location = useLocation();

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
      <div
        className="
          max-w-[1246px] px-[20px] mx-auto flex items-center justify-between h-20 relative
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
            onKeyDown={e => {
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
          <CartButton size={24} className="text-gray-500" />
        </div>
      </div>
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
            <CategoriesMenu categories={categories} animated />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}