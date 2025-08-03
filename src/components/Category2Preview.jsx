import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

export default function Category2Preview() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-black">A pronta entrega</h2>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/categoria2")}
          className="flex items-center gap-1 text-[#7a4fcf] text-sm md:text-base font-medium cursor-pointer underline hover:text-[#ae95d9] transition-colors focus:outline-none"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          Ver mais <IoIosArrowForward className="" size={16} />
        </motion.button>
      </div>
      {/* Aviso centralizado */}
      <div className="flex items-center justify-center min-h-[120px]">
        <span className="text-lg text-[#7a4fcf] font-medium text-center">
          No momento, todos os bebês a pronta entrega estão esgotados.
        </span>
      </div>
    </div>
  );
}