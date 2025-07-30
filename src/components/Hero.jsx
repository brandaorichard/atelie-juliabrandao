import React, { useEffect, useState, useRef } from "react";
import img1 from "../assets/img.png";
import img2 from "../assets/imgbaby.png";
import img3 from "../assets/image.png";
import img4 from "../assets/image2.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const images = [
  { src: img1, alt: "Imagem 1" },
  { src: img2, alt: "Imagem 2" },
  { src: img3, alt: "Imagem 3" },
  { src: img4, alt: "Imagem 4" },
];

function useImagesPerSlide() {
  const [imagesPerSlide, setImagesPerSlide] = useState(window.innerWidth >= 768 ? 2 : 1);

  useEffect(() => {
    const handleResize = () => {
      setImagesPerSlide(window.innerWidth >= 768 ? 2 : 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return imagesPerSlide;
}

export default function Hero() {
  const imagesPerSlide = useImagesPerSlide();
  const totalSlides = Math.ceil(images.length / imagesPerSlide);

  // Monta os slides (cada um com 1 ou 2 imagens)
  const slides = [];
  for (let i = 0; i < images.length; i += imagesPerSlide) {
    slides.push(images.slice(i, i + imagesPerSlide));
  }

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [totalSlides]);

  const goTo = (idx) => {
    setCurrent(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 3000);
  };

  const prev = () => goTo((current - 1 + totalSlides) % totalSlides);
  const next = () => goTo((current + 1) % totalSlides);

  return (
    <div>
      {/* Título acima do carousel */}
      <motion.div
        className="w-full flex flex-col items-center mb-5 -mt-2"
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
          {/* Título acima do carousel */}
        </h1>
      </motion.div>

      <motion.section
        className="w-full h-[26vh] md:h-[40vh] bg-no-repeat bg-cover bg-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        {/* Slides container */}
        <motion.div
          className="flex h-full w-full"
          style={{
            width: `${totalSlides * 100}%`,
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          animate={{ x: `-${current * (100 / totalSlides)}%` }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 60 },
          }}
        >
          {slides.map((slide, slideIdx) => (
            <div
              key={slideIdx}
              className="flex w-full h-full"
              style={{ width: `${100 / totalSlides}%` }}
            >
              {slide.map((img, idx) => (
                <img
                  key={img.alt}
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  style={{ flex: 1 }}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* Setas */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 shadow cursor-pointer transition z-20"
          aria-label="Anterior"
        >
          <FaChevronLeft size={10} className="text-white" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 shadow cursor-pointer transition z-20"
          aria-label="Próxima"
        >
          <FaChevronRight size={10} className="text-white" />
        </button>

        {/* Bolinhas */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-1 h-1 rounded-full border border-[#ae95d9] transition
                ${current === idx ? "bg-[#ae95d9]" : "bg-white"}
              `}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
}