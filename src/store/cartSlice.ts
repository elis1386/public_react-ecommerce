import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "../types/CartItem";

const initialState: CartItem[] = [];
const updateSessionStorage = (items: CartItem[]) => {
  sessionStorage.setItem("products", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const payload = action.payload;
      if (payload) { // Check if payload is not undefined
        const existingProductIndex = state.findIndex((item) => item.id === payload.id);
        if (existingProductIndex !== -1) {
          state[existingProductIndex].quantity += payload.quantity || 1;
        } else {
          state.push({ ...payload, quantity: payload.quantity || 1 });
        }
        updateSessionStorage(state);
      }
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      const foundIndex = state.findIndex((item) => item.id === itemIdToRemove);
      if (foundIndex >= 0) {
        state.splice(foundIndex, 1);

        if (state.length === 0) {
          state.length = 0;
        }

        updateSessionStorage(state);
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const foundIndex = state.findIndex((item) => item.id === action.payload);
      if (foundIndex > -1) {
        state[foundIndex].quantity++;
      }
      updateSessionStorage(state);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const foundIndex = state.findIndex((item) => item.id === action.payload);
      if (foundIndex > -1) {
        if (state[foundIndex].quantity === 1) {
          state.splice(foundIndex, 1); // Remove the item if quantity is 1
        } else {
          state[foundIndex].quantity--;
        }
      }
      updateSessionStorage(state);
    },
  },
});

const cartReducer = cartSlice.reducer

export const {
  addItemToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartReducer;
