import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { showToast } from "../redux/toastSlice";

export default function QuantityBuy({ product }) {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();
  
  // Verifica se é um produto de pronta entrega indisponível
  const isProntaEntrega = product.category === "pronta_entrega";
  const isIndisponivel = product.status === "indisponivel";

  const handleBuy = () => {
    // Não faz nada se o produto estiver indisponível
    if (isIndisponivel) return;
    
    dispatch(addToCart({ product, quantity }));

    dispatch(showToast({
      product: {
        name: product.name,
        img: product.img,
        price: product.price,
      },
      quantity,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 mb-2">
        <div className={`flex items-center border border-[#616161] rounded-full px-3 py-1 ${isIndisponivel ? 'opacity-50' : ''}`}>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f3e6f3] text-[#616161] text-lg font-bold opacity-60"
            aria-label="Diminuir"
            disabled={quantity === 1 || isIndisponivel}
          >
            –
          </button>
          <span className="mx-3 w-4 text-center text-[#616161] font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f3e6f3] text-[#616161] text-lg font-bold opacity-60"
            aria-label="Aumentar"
            disabled={isIndisponivel}
          >
            +
          </button>
        </div>
        <button
          className={`
            text-white text-lg font-medium rounded-full px-10 py-2 transition
            ${isIndisponivel 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#7a4fcf] hover:bg-[#ae95d9] cursor-pointer'}
          `}
          onClick={handleBuy}
          disabled={isIndisponivel}
        >
          {isIndisponivel ? "Indisponível" : "Comprar"}
        </button>
      </div>
      
      {isProntaEntrega && isIndisponivel && (
        <div className="text-sm text-red-600 font-medium mb-4">
          Este bebê não está mais disponível para compra.
        </div>
      )}
    </div>
  );
}