import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import toastReducer from "./toastSlice";
import authReducer from "./authSlice";
import freteReducer from "./freteSlice"; // Import the freteSlice

const store = configureStore({
  reducer: {
    cart: cartReducer,
    toast: toastReducer,
    auth: authReducer,
    frete: freteReducer, // Add the freteSlice reducer
  },
});

export default store;