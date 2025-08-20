import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  isLoggedIn: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user; // { nome, email, role, ... }
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateUser(state, action) {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;