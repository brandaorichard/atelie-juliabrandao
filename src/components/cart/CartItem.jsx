import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, setQuantity } from "../../redux/cartSlice";

export function CartItem({ item, img }) {
  const dispatch = useDispatch();

  function handleDec() {
    if (item.quantity > 1) {
      dispatch(setQuantity({ uniqueKey: item.uniqueKey, quantity: item.quantity - 1 }));
    }
  }

  function handleInc() {
    dispatch(setQuantity({ uniqueKey: item.uniqueKey, quantity: item.quantity + 1 }));
  }

  function handleRemove() {
    dispatch(removeFromCart(item.uniqueKey));
  }

  return (
    <div className="flex items-center gap-3 border border-neutral-300 rounded-lg p-3 bg-[#f9e7f6] w-full">
      <img
        src={img || "/placeholder.jpg"}
        alt={item.name}
        className="w-20 h-22 rounded object-cover border border-neutral-300"
      />
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-600">
          R$
          {item.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDec}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f3e6f3] text-[#616161] text-lg font-bold opacity-60 cursor-pointer"
            aria-label="Diminuir"
            disabled={item.quantity === 1}
          >
            –
          </button>
          <span className="mx-2 w-4 text-center">
            {item.quantity}
          </span>
          <button
            onClick={handleInc}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f3e6f3] text-[#616161] text-lg font-bold opacity-60 cursor-pointer"
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
        <button
          onClick={handleRemove}
          className="text-xs text-[#7a4fcf] underline mt-2 cursor-pointer"
        >
          Remover
        </button>
      </div>
    </div>
  );
}