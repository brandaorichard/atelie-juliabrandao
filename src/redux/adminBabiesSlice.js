import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBabiesAdmin, createBaby, updateBaby, deleteBaby } from "../services/adminBabyService";
import { showToast } from "./toastSlice";

export const loadBabies = createAsyncThunk("adminBabies/load", async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    return await fetchBabiesAdmin(token);
  } catch (e) {
    dispatch(showToast({ type: "error", message: e.message }));
    return rejectWithValue(e.message);
  }
});

export const addBaby = createAsyncThunk("adminBabies/add", async (payload, { getState, dispatch, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const bebe = await createBaby(token, payload);
    dispatch(showToast({ type: "success", message: "Bebê criado" }));
    return bebe;
  } catch (e) {
    dispatch(showToast({ type: "error", message: e.message }));
    return rejectWithValue(e.message);
  }
});

export const editBaby = createAsyncThunk("adminBabies/edit", async ({ id, data }, { getState, dispatch, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const bebe = await updateBaby(token, id, data);
    dispatch(showToast({ type: "success", message: "Bebê atualizado" }));
    return bebe;
  } catch (e) {
    dispatch(showToast({ type: "error", message: e.message }));
    return rejectWithValue(e.message);
  }
});

export const removeBaby = createAsyncThunk("adminBabies/remove", async (id, { getState, dispatch, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await deleteBaby(token, id);
    dispatch(showToast({ type: "success", message: "Bebê removido" }));
    return id;
  } catch (e) {
    dispatch(showToast({ type: "error", message: e.message }));
    return rejectWithValue(e.message);
  }
});

const adminBabiesSlice = createSlice({
  name: "adminBabies",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    // Corrigir o updateStatus para usar o nome correto das ações
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) {
        item.status = status;
      }
    },
    
    // Corrigir o setItemLoading para usar o nome correto das ações
    setItemLoading: (state, action) => {
      const { id, loading } = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) {
        item.loading = loading;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadBabies.pending, s => { s.loading = true; s.error = null; })
      .addCase(loadBabies.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(loadBabies.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(addBaby.fulfilled, (s, a) => { s.items.push(a.payload); })
      .addCase(editBaby.fulfilled, (s, a) => {
        const idx = s.items.findIndex(b => b._id === a.payload._id);
        if (idx >= 0) s.items[idx] = a.payload;
      })
      .addCase(removeBaby.fulfilled, (s, a) => {
        s.items = s.items.filter(b => b._id !== a.payload);
      });
  }
});

// Importante: exportar as actions dos reducers!
export const { updateStatus, setItemLoading } = adminBabiesSlice.actions;

export default adminBabiesSlice.reducer;