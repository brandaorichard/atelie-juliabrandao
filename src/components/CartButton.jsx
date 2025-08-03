import { CgShoppingCart } from "react-icons/cg";

export default function CartButton({ size = 24, className = "", onClick, badge }) {
  return (
    <button aria-label="Carrinho" onClick={onClick} type="button" className="relative">
      <CgShoppingCart size={size} className={className} />
      <span
        className={`
          absolute -top-1 -right-1
          flex items-center justify-center
          rounded-full
          bg-[#7a4fcf]
          text-white
          text-[10px]
          font-bold
          min-w-[16px] h-[16px]
          px-[4px]
          transition
          select-none
        `}
        style={{
          pointerEvents: "none",
          boxSizing: "border-box",
        }}
      >
        {badge}
      </span>
    </button>
  );
}