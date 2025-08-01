import { CgShoppingCart } from "react-icons/cg";

export default function CartButton({ size = 24, className = "", onClick }) {
  return (
    <button aria-label="Carrinho" onClick={onClick} type="button">
      <CgShoppingCart size={size} className={className} />
    </button>
  );
}