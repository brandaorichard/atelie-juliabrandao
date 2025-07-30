import { AnimatePresence, motion } from "framer-motion";
import SortOptionButton from "./SortOptionButton";

export default function SortDrawer({ open, onClose, options, selected, onSelect }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay cobrindo tudo, inclusive header */}
          <motion.div
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Fechar ordenação"
          />
          {/* Drawer lateral acima do overlay */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 right-0 h-full z-60"
            style={{
              width: "25vw",
              minWidth: 260,
              background: "#f9e7f6",
              boxShadow: "-4px 0 16px 0 rgba(174,149,217,0.18)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5d3e9]">
              <span className="text-lg font-light text-[#616161]">Ordenar</span>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="text-[#616161] text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6 py-4">
              {options.map((opt, idx) => (
                <SortOptionButton
                  key={opt.value}
                  label={opt.label}
                  selected={selected === opt.value}
                  onClick={() => { onSelect(opt.value); onClose(); }}
                  isLast={idx === options.length - 1}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}