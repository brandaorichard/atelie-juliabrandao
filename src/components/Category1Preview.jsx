import { useNavigate } from "react-router-dom";
import babies from "../mocks/babiesMock";
import RebornCard from "../components/RebornCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Category1Preview() {
  const navigate = useNavigate();
  const previewBabies = babies.slice(0, 8); // pelo menos 6 cards para o mobile
  const [mobileIndex, setMobileIndex] = useState(0);

  // Detecta mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setMobileIndex(
        (prev) => (prev + 1 < previewBabies.length - 1 ? prev + 1 : 0) // volta ao início
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, previewBabies.length]);

  // Animação Framer Motion para mobile
  const handleMobileClick = () => {
    if (isMobile) {
      document
        .getElementById("ver-mais-link")
        .animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(0.95)" },
            { transform: "scale(1)" },
          ],
          { duration: 200 }
        );
      setTimeout(() => navigate("/categoria1"), 200);
    } else {
      navigate("/categoria1");
    }
  };

  // Navegação mobile
  const handlePrev = () => {
    setMobileIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setMobileIndex((prev) => Math.min(prev + 1, previewBabies.length - 2));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-black">Por Encomenda</h2>
        <motion.button
          id="ver-mais-link"
          whileTap={isMobile ? { scale: 0.95 } : {}}
          onClick={handleMobileClick}
          className="flex items-center gap-1 text-[#7a4fcf] text-sm md:text-base font-medium cursor-pointer underline hover:text-[#ae95d9] transition-colors focus:outline-none"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          Ver mais <FaArrowRight className="ml-1" />
        </motion.button>
      </div>

      {/* MOBILE: Carousel fake */}
      <div className="block md:hidden relative">
        <div className="flex items-center justify-between">
          {/* Seta esquerda */}
          <button
            onClick={handlePrev}
            disabled={mobileIndex === 0}
            className="p-2 rounded-full !bg-transparent text-[#7a4fcf] shadow-none"
            style={{ zIndex: 10, background: "transparent" }}
          >
            <IoIosArrowBack size={26} />
          </button>
          <div
            className="flex-1 flex justify-center overflow-hidden gap-4"
            style={{ minHeight: 380, maxWidth: 380 }}
          >
            {Array.from({ length: 2 }).map((_, i) => {
              const baby = previewBabies[mobileIndex + i];
              if (!baby) return null;
              return (
                <AnimatePresence key={baby.id} mode="wait">
                  <motion.div
                    key={baby.id}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -80, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 40,
                      duration: 0.5,
                    }}
                    className="w-[160px]"
                  >
                    <RebornCard
                      baby={baby}
                      onClick={() => navigate(`/produto/${baby.id}`)}
                      mini
                    />
                  </motion.div>
                </AnimatePresence>
              );
            })}
          </div>
          {/* Seta direita */}
          <button
            onClick={handlePrev}
            disabled={mobileIndex === 0}
            className="p-2 rounded-full !bg-transparent text-[#7a4fcf] shadow-none"
            style={{ zIndex: 10, background: "transparent" }}
          >
            <IoIosArrowForward size={26} />
          </button>
        </div>
      </div>

      {/* DESKTOP: Grid */}
      <div className="hidden md:grid grid-cols-2 gap-4 md:gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {previewBabies.slice(0, 5).map((baby) => (
          <div key={baby.id} className="w-[220px]">
            <RebornCard
              baby={baby}
              onClick={() => navigate(`/produto/${baby.id}`)}
              mini
            />
          </div>
        ))}
      </div>
    </div>
  );
}
