import { createSlice } from "@reduxjs/toolkit";

/**
 * productsSlice (Redux Toolkit)
 * Holds the full product catalog so Home, ProductDetail and
 * AdminDashboard all read/update the same list.
 */
const initialState = {
  list: [],
  status: "idle", // idle | loading | succeeded
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.list = action.payload;
      state.status = "succeeded";
    },
    setLoading(state) {
      state.status = "loading";
    },
    addProductToList(state, action) {
      state.list = [action.payload, ...state.list];
    },
    updateProductInList(state, action) {
      state.list = state.list.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
    removeProductFromList(state, action) {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setProducts,
  setLoading,
  addProductToList,
  updateProductInList,
  removeProductFromList,
} = productsSlice.actions;

export default productsSlice.reducer;
