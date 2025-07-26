import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  state => state.cartItems
);

export const selectCartTotal = createSelector(
  selectCartItems,
  items => items.reduce((sum, item) => sum + item.total, 0)
);

export const selectSearchTerm = createSelector(
  selectCartState,
  state => state.search
);

export const selectQuantityByProductId = (productId: number) =>
  createSelector(
    selectCartState,
    (state: CartState) => state.quantities[productId] ?? 1
   
  );