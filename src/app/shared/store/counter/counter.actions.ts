import { createAction, props } from '@ngrx/store';



export const incrementQuantity = createAction(
  '[Counter] Incremwnt Quantity',
  props<{ quantity: number }>()
);

