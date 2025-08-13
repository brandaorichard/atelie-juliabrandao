import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, setQuantity } from "../../redux/cartSlice";
import { CartItem } from "./CartItem";

export function CartItems({ items, images }) {
  const dispatch = useDispatch();

  function handleRemove(item) {
    dispatch(removeFromCart(item.uniqueKey));
  }

  function handleQuantityChange(item, newQuantity) {
    dispatch(setQuantity({ uniqueKey: item.uniqueKey, quantity: newQuantity }));
  }

  if (!items.length) {
    return (
      <div className="text-xs text-gray-500">
        Seu carrinho está vazio.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id || item.slug}
          className="flex gap-3 items-start rounded p-3 bg-[#f9e7f6]"
        >
          <CartItem
            item={item}
            img={images[item.slug]}
            onDec={(newQuantity) => handleQuantityChange(item, newQuantity - 1)}
            onInc={(newQuantity) => handleQuantityChange(item, newQuantity + 1)}
            onRemove={() => handleRemove(item)}
          />
        </div>
      ))}
    </div>
  );
}