import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function CartDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Fechar carrinho"
          />
          {/* Drawer lateral direita */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 right-0 h-full z-60 cart-drawer-custom"
            style={{
              minWidth: 0,
              background: "#f9e7f6",
              boxShadow: "-4px 0 16px 0 rgba(174,149,217,0.18)",
            }}
          >
            <style>
              {`
                .cart-drawer-custom {
                  width: 100vw;
                  max-width: 100vw;
                }
                @media (min-width: 768px) {
                  .cart-drawer-custom {
                    width: 30vw !important;
                    min-width: 320px !important;
                    max-width: 420px !important;
                  }
                }
              `}
            </style>
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-3 md:px-6 py-5 border-b border-[#e5d3e9]">
                <span className="text-lg font-light text-[#616161]">Carrinho de compras</span>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="text-[#616161] text-xl cursor-pointer"
                  style={{ lineHeight: 1, padding: 0, background: "none", border: "none" }}
                >
                  &times;
                </button>
              </div>
              {/* Conteúdo do carrinho virá aqui futuramente */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}