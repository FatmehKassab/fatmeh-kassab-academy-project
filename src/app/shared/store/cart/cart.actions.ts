import { createAction, props } from '@ngrx/store';
import { CartItem, Product } from '../../interfaces/product.model';

// Local actions
export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

// API actions
export const loadCart = createAction('[Cart] Load Cart');
export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
);
export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);

export const saveCart = createAction('[Cart] Save Cart');
export const saveCartSuccess = createAction('[Cart] Save Cart Success');
export const saveCartFailure = createAction(
  '[Cart] Save Cart Failure',
  props<{ error: string }>()
);