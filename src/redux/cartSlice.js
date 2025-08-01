import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const idx = state.items.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        state.items[idx].quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const idx = state.items.findIndex(item => item.id === id);
      if (idx !== -1) {
        state.items[idx].quantity = quantity;
      }
    }
  }
});

export const { addToCart, removeFromCart, clearCart, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;