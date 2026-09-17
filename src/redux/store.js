import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

// Keep the cart saved in localStorage so it survives a page refresh.
// store.subscribe runs every time ANY action changes the state.
store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem("shoply_cart", JSON.stringify(cart.items));
});
