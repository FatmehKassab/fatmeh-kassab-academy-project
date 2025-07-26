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

  export const selectTotalQuantity = createSelector(
  selectCartState,
  state => Object.values(state.quantities).reduce((acc, qty) => acc + qty, 0)
);

export const selectQuantities = createSelector(
  selectCartState,
  (state: CartState) => state.quantities
);
export const selectGrandTotal = createSelector(
  selectCartItems,
  selectQuantities,
  (items, quantities) =>
    items.reduce((total, item) => {
      const qty = quantities[item.id] || 0;
      return total + item.price * qty;
    }, 0)
);