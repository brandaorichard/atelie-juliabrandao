import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import toastReducer from "./toastSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    toast: toastReducer,
    auth: authReducer,
  },
});

export default store;