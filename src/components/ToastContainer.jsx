import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../redux/toastSlice";
import { useEffect } from "react";
import CartToast from "./CartToast";
import { AnimatePresence, motion } from "framer-motion";

export default function ToastContainer({ onViewCart }) {
  const { data, visible } = useSelector(state => state.toast);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 10000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleViewCart = () => {
    if (onViewCart) onViewCart();
    dispatch(hideToast());
  };

  return (
    <AnimatePresence>
      {visible && data && data.product && (
        <motion.div
          key="cart-toast"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.55, type: "spring" }}
          className="fixed top-6 right-6 z-[100] bg-[#f9e7f6] border rounded-lg shadow-lg p-4 min-w-[320px] max-w-[95vw]"
        >
          <CartToast
            product={data.product}
            quantity={data.quantity}
            total={total}
            totalQuantity={totalQuantity}
            onViewCart={handleViewCart}
          />
          <button
            className="absolute top-2 right-2 text-xl text-gray-500"
            onClick={() => dispatch(hideToast())}
            aria-label="Fechar notificação"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}