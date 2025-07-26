import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export interface CounterState {
  quantities: { [productId: number]: number };
}

export const initialState: CounterState = {
  quantities: {},
};

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (state, { productId }) => {
    const current = state.quantities[productId] ?? 1; 
    return {
      ...state,
      quantities: {
        ...state.quantities,
        [productId]: current < 10 ? current + 1 : current,
      }
    };
  }),
  on(CounterActions.decrement, (state, { productId }) => {
    const current = state.quantities[productId] ?? 1; 
    return {
      ...state,
      quantities: {
        ...state.quantities,
        [productId]: current > 1 ? current - 1 : 1, 
      }
    };
  }),
  on(CounterActions.setQuantity, (state, { productId, quantity }) => ({
    ...state,
    quantities: {
      ...state.quantities,
      [productId]: quantity >= 1 && quantity <= 10 ? quantity : 1, 
    }
  }))
);