import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store/store';

const selectCart = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart
);
export const selectTotalPrice = createSelector(
  [selectCart],
  (cart) =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)
);
