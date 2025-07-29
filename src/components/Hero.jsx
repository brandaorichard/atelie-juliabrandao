import React, { useEffect, useState, useRef } from "react";
import img1 from "../assets/img.png";
import img2 from "../assets/imgbaby.png";
import img3 from "../assets/image.png";
import img4 from "../assets/image2.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { src: img1, alt: "Imagem 1" },
  { src: img2, alt: "Imagem 2" },
  { src: img3, alt: "Imagem 3" },
  { src: img4, alt: "Imagem 4" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 1 para direita, -1 para esquerda
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  // Variants para o efeito de roll
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      position: "absolute",
    }),
  };

  return (
    <div>
      {/* Título acima do carousel */}
      <motion.div
        className="w-full flex flex-col items-center mb-5 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1
          className="
            text-2xl
            md:text-4xl
            font-light
            text-[#616161]
            font-['Lexend']
            text-center
            tracking-[0.02em]
            md:tracking-wide
            flex items-center
            gap-2
          "
        >
          {/* Título acima do carousel <span role="title" aria-label="reborn" className="text-3xl md:text-5xl">Encomende seu bebê reborn personalizado!</span> */}
        </h1>
      </motion.div>

      <motion.section
        className="w-full h-[26vh] md:h-[40vh] bg-no-repeat bg-cover bg-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        {/* Imagem do carousel com efeito roll */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={images[current].alt}
            src={images[current].src}
            alt={images[current].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
            style={{ transition: "opacity 0.5s" }}
          />
        </AnimatePresence>

        {/* Setas */}
        <button
          onClick={() => { setDirection(-1); prev(); }}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white transition z-20"
          aria-label="Anterior"
        >
          <FaChevronLeft size={10} />
        </button>
        <button
          onClick={() => { setDirection(1); next(); }}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white transition z-20"
          aria-label="Próxima"
        >
          <FaChevronRight size={10} />
        </button>

        {/* Bolinhas */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-2 h-2 rounded-full border border-[#ae95d9] transition
                ${current === idx ? "bg-[#ae95d9]" : "bg-white"}
              `}
              aria-label={`Ir para imagem ${idx + 1}`}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
}