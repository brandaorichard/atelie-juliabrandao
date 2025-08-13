import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cep: "",
  fretes: [],
  freteSelecionado: null,
  enderecoCep: null,
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
    setFretes(state, action) {
      state.fretes = action.payload;
    },
    clearFrete(state) {
      state.cep = "";
      state.freteSelecionado = null;
      state.fretes = [];
      state.enderecoCep = null;
    },
    setFreteData(state, action) {
      state.cep = action.payload.cep;
      state.fretes = action.payload.fretes;
      state.enderecoCep = action.payload.enderecoCep;
    },
  },
});

export const { setCep, setFreteSelecionado, setFretes, clearFrete, setFreteData } = freteSlice.actions;
export default freteSlice.reducer;