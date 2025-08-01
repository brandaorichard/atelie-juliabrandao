import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../redux/toastSlice";
import { useEffect } from "react";
import CartToast from "./CartToast";

export default function ToastContainer({ onViewCart }) {
  const { data, visible } = useSelector(state => state.toast);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 10000); // 10 segundos
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible || !data || !data.product) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Função para abrir o carrinho e fechar o toast imediatamente
  const handleViewCart = () => {
    if (onViewCart) onViewCart();
    dispatch(hideToast());
  };

  return (
    <div className="fixed top-6 right-6 z-[100] bg-[#f9e7f6] border rounded-lg shadow-lg p-4 min-w-[320px] max-w-[95vw]">
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
    </div>
  );
}