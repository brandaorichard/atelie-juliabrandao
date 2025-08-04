import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../redux/toastSlice";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function renderIcon(iconType) {
  switch (iconType) {
    case "logout":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#e53935"
          strokeWidth={2}
          style={{ display: "inline", verticalAlign: "middle" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
      );
    case "success":
      return "✅";
    // outros ícones que quiser adicionar
    default:
      return null;
  }
}

export default function ToastContainer({ onViewCart }) {
  const { data, visible } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 3500);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible || !data) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.55, type: "spring" }}
        className="fixed top-6 right-6 z-[100] bg-[#f9e7f6] border border-neutral-400 rounded-lg shadow-lg p-4 min-w-[320px] max-w-[95vw] flex items-center gap-3"
      >
        <span className="text-2xl">{renderIcon(data.iconType)}</span>
        <span className="text-base font-medium text-[#7a4fcf]">{data.message}</span>
        <button
          className="ml-auto text-gray-500 text-2xl"
          onClick={() => dispatch(hideToast())}
          aria-label="Fechar notificação"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}