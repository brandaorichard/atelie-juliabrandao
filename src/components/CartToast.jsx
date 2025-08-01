import { motion } from "framer-motion";

export default function CartToast({ product, quantity, total, totalQuantity, onViewCart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, type: "spring" }}
      className="bg-[#f9e7f6] rounded-md"
    >
      <div className="flex items-start gap-3">
        <img
          src={product.img}
          alt={product.name}
          className="w-14 h-16 rounded object-cover"
        />
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-gray-600">
            {quantity} x R$
            {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="font-bold text-[#7a4fcf] mt-1">
            Adicionado ao carrinho!
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">
          Total{totalQuantity > 1 ? ` (${totalQuantity} produtos):` : " (1 produto):"}
        </span>
        <span className="font-bold text-lg">
          R${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
      </div>
      <button
        className="w-full bg-[#ae95d9] hover:bg-[#7a4fcf] text-white rounded py-2 font-medium transition cursor-pointer"
        onClick={onViewCart}
      >
        Ver carrinho
      </button>
    </motion.div>
  );
}