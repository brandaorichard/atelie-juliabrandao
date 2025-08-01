// redux/toastSlice.js
import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: { data: null, visible: false },
  reducers: {
    showToast(state, action) {
      state.data = action.payload; // só dados, não JSX!
      state.visible = true;
    },
    hideToast(state) {
      state.visible = false;
      state.data = null;
    }
  }
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;