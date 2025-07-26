import { createAction, props } from '@ngrx/store';

export const getCart = createAction(
  '[Cart] Get Cart',
  props<{ products: any[] }>()
);

export const setCart = createAction(
  '[Cart] Set Cart',
  props<{ products: any[] }>()
);

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: any }>()
);

export const removeCartItem = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const updateSearch = createAction(
  '[Cart] Update Search',
  props<{ searchTerm: string }>()
);
