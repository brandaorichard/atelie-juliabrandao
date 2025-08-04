// components/Toast.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show, message, color = "#7a4fcf", onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-6 left-1/2 z-[9999] -translate-x-1/2"
        >
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-2xl shadow-lg text-white font-medium text-base"
            style={{ background: color, minWidth: 220 }}
          >
            <span className="text-2xl">✅</span>
            <span>{message}</span>
            <button
              className="ml-2 text-white text-lg font-bold"
              onClick={onClose}
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}