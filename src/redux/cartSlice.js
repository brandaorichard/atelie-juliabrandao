import { createSlice } from "@reduxjs/toolkit";

function getUniqueKey(product) {
  // Use os campos que tornam o item único no carrinho
  return [
    product.slug,
    product.name,
    product.boxType,
    product.category,
    product.isConfirmed ? "confirmed" : "notconfirmed"
  ].join("_");
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const uniqueKey = getUniqueKey(product);

      const idx = state.items.findIndex(item => item.uniqueKey === uniqueKey);
      if (idx !== -1) {
        state.items[idx].quantity += quantity;
      } else {
        state.items.push({ ...product, quantity, uniqueKey });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.uniqueKey !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    setQuantity(state, action) {
      const { uniqueKey, quantity } = action.payload;
      const idx = state.items.findIndex(item => item.uniqueKey === uniqueKey);
      if (idx !== -1) {
        state.items[idx].quantity = quantity;
      }
    }
  }
});

export const { addToCart, removeFromCart, clearCart, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;