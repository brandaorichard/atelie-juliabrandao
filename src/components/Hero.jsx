import React, { useEffect, useState, useRef } from "react";
import img1 from "../assets/img.png";
import img2 from "../assets/imgbaby.png";
import img3 from "../assets/image.png";
import img4 from "../assets/image2.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  { src: img1, alt: "Imagem 1" },
  { src: img2, alt: "Imagem 2" },
  { src: img3, alt: "Imagem 3" },
  { src: img4, alt: "Imagem 4" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx) => {
    setCurrent(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  return (
    <div>
      {/* Título acima do carousel */}
      <div className="w-full flex flex-col items-center mb-5 mt-4">
        <h1
          className="
            text-2xl
            md:text-4xl
            font-medium
            text-[#616161]
            font-['Lexend']
            text-center
            tracking-[0.02em]
            md:tracking-wide
            flex items-center
            gap-2
            letter-spacing-2px
          "
        >
          <span role="img" aria-label="coração">💜</span>
          Encomende seu bebê reborn personalizado!
          <span role="img" aria-label="ursinho">🧸</span>
        </h1>
      </div>

      <section className="w-full h-[26vh] md:h-[40vh] bg-no-repeat bg-cover bg-center relative overflow-hidden">
        {/* Imagem do carousel */}
        {images.map((img, idx) => (
          <img
            key={img.alt}
            src={img.src}
            alt={img.alt}
            className={`
              absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500
              ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
            style={{ transition: "opacity 0.5s" }}
          />
        ))}

        {/* Setas */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white transition z-20"
          aria-label="Anterior"
        >
          <FaChevronLeft size={10} />
        </button>
        <button
          onClick={next}
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
      </section>
    </div>
  );
}