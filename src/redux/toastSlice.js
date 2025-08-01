import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: { content: null, visible: false },
  reducers: {
    showToast(state, action) {
      state.content = action.payload;
      state.visible = true;
    },
    hideToast(state) {
      state.visible = false;
      state.content = null;
    }
  }
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;