import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { apiSlice } from "./apiSlice";
import userSlice from "./userSlice";

import categoriesSlice from "./categoriesSlice";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";

const storedCartData = JSON.parse(sessionStorage.getItem("products") || '[]');

export const createStore = () => {
  return configureStore({
    reducer: {
      categories: categoriesSlice,
      products: productsSlice,
      user: userSlice,
      cart: cartSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState: {
      cart: storedCartData, 
    },
    middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
};
const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export default store;
