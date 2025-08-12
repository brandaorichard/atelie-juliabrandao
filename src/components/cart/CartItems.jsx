import React from "react";
import { CartItem } from "./CartItem";

export function CartItems({ items, images, onDec, onInc, onRemove }) {
  if (!items.length) {
    return <div className="text-center text-[#616161] mt-10">Seu carrinho está vazio.</div>;
  }
  return items.map(item => (
    <CartItem
      key={item.id}
      item={item}
      img={images[item.slug]}
      onDec={() => onDec(item)}
      onInc={() => onInc(item)}
      onRemove={() => onRemove(item)}
    />
  ));
}