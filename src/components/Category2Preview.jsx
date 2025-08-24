import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import RebornCard from "../components/RebornCard";
import { useBabies } from "../hooks/useBabies";

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    function handleResize() { setWidth(window.innerWidth); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export default function Category2Preview() {
  const navigate = useNavigate();
  const { babies, loading, error } = useBabies({ type: "pronta_entrega" });
  const previewBabies = babies.slice(0, 8);
  const [mobileIndex, setMobileIndex] = useState(0);

  const width = useWindowWidth();
  const isBetween768And1100 = width >= 768 && width <= 1100;
  const isMobile = width < 768;

  useEffect(() => {
    setMobileIndex(0);
  }, [previewBabies.length]);

  useEffect(() => {
    if (!isMobile || previewBabies.length <= 2) return;
    const interval = setInterval(() => {
      setMobileIndex(prev =>
        prev + 1 < Math.max(previewBabies.length - 1, 1) ? prev + 1 : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, previewBabies.length]);

  const handleMobileClick = () => {
    if (isMobile) {
      const el = document.getElementById("ver-mais-link-pronta");
      if (el) {
        el.animate(
          [{ transform: "scale(1)" }, { transform: "scale(0.95)" }, { transform: "scale(1)" }],
          { duration: 200 }
        );
        setTimeout(() => navigate("/categoria2"), 200);
      } else {
        navigate("/categoria2");
      }
    } else {
      navigate("/categoria2");
    }
  };

  const handlePrev = () => setMobileIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () =>
    setMobileIndex(prev =>
      Math.min(prev + 1, Math.max(previewBabies.length - 2, 0))
    );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: false,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-black">A pronta entrega</h2>
        <motion.button
          id="ver-mais-link-pronta"
          whileTap={isMobile ? { scale: 0.95 } : {}}
          onClick={handleMobileClick}
          className="flex items-center gap-1 text-[#7a4fcf] text-sm md:text-base font-medium cursor-pointer underline hover:text-[#ae95d9] transition-colors focus:outline-none"
        >
          Ver mais <IoIosArrowForward />
        </motion.button>
      </div>

      {loading && (
        <div className="py-6 text-sm text-[#7a4fcf]">Carregando bebês...</div>
      )}
      {error && !loading && (
        <div className="py-6 text-sm text-red-600">Erro: {error}</div>
      )}
      {!loading && !error && previewBabies.length === 0 && (
        <div className="py-6 text-sm text-[#616161]">
          No momento, todos os bebês a pronta entrega estão esgotados.
        </div>
      )}

      {/* MOBILE */}
      {!loading && !error && previewBabies.length > 0 && (
        <div className="block md:hidden relative" {...swipeHandlers}>
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={mobileIndex === 0}
              className="p-2 rounded-full text-[#7a4fcf] disabled:opacity-30"
            >
              <IoIosArrowBack size={26} />
            </button>

            <div
              className="flex-1 flex justify-center overflow-hidden gap-4"
              style={{ minHeight: 380, maxWidth: 380 }}
            >
              {Array.from({ length: Math.min(2, previewBabies.length) }).map((_, i) => {
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
                        onClick={() => navigate(`/produto/${baby.slug}`)}
                        mini
                      />
                    </motion.div>
                  </AnimatePresence>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={mobileIndex >= Math.max(previewBabies.length - 2, 0)}
              className="p-2 rounded-full text-[#7a4fcf] disabled:opacity-30"
            >
              <IoIosArrowForward size={26} />
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP */}
      {!loading && !error && previewBabies.length > 0 && (
        <div
          className="hidden md:grid gap-6"
          style={{
            gridTemplateColumns: isBetween768And1100
              ? "repeat(auto-fit, minmax(220px, 1fr))"
              : "repeat(5, minmax(0, 1fr))",
          }}
        >
          {previewBabies.slice(0, 5).map(baby => (
            <div key={baby.id} className="w-full">
              <RebornCard
                baby={baby}
                onClick={() => navigate(`/produto/${baby.slug}`)}
                mini
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}