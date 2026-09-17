import { createSlice } from "@reduxjs/toolkit";

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem("shoply_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const payload = action.payload;
      const product = payload.product || payload;
      const quantity = payload.quantity || 1;

      const productId = product.id || product.productId;
      const existing = state.items.find((item) => item.productId === productId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items = [
          ...state.items,
          {
            productId,
            title: product.title,
            price: product.price,
            color: product.color,
            imageKeywords: product.imageKeywords,
            category: product.category,
            stock: product.stock,
            imageUrl: product.imageUrl || product.image,
            quantity,
          },
        ];
      }
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.productId !== productId);
      } else {
        state.items = state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

// Aliases for compatibility
export const addItem = addToCart;
export const removeItem = removeFromCart;

export default cartSlice.reducer;
