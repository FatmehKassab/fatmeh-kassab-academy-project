import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment', props<{ productId: number }>());
export const decrement = createAction('[Counter] Decrement', props<{ productId: number }>());
export const setQuantity = createAction('[Counter] Set Quantity', props<{ productId: number, quantity: number }>());

