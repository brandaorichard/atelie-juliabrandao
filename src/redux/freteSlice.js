import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cep: "",
  freteSelecionado: null,
  fretes: [], // <-- Adicione esta linha
};

const freteSlice = createSlice({
  name: "frete",
  initialState,
  reducers: {
    setCep(state, action) {
      state.cep = action.payload;
    },
    setFreteSelecionado(state, action) {
      state.freteSelecionado = action.payload;
    },
    setFretes(state, action) { // <-- Novo reducer
      state.fretes = action.payload;
    },
    clearFrete(state) {
      state.cep = "";
      state.freteSelecionado = null;
      state.fretes = []; // <-- Limpa as opções também
    },
  },
});

export const { setCep, setFreteSelecionado, setFretes, clearFrete } = freteSlice.actions;
export default freteSlice.reducer;