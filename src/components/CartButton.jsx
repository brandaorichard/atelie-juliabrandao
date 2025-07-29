// components/CartButton.jsx
import { CgShoppingCart } from "react-icons/cg";

export default function CartButton({ size = 24, className = "" }) {
  return (
    <button aria-label="Carrinho">
      <CgShoppingCart size={size} className={className} />
    </button>
  );
}