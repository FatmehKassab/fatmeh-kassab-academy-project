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
    const current = state.quantities[productId] || 0;
    return {
      ...state,
      quantities: {
        ...state.quantities,
        [productId]: current < 10 ? current + 1 : current,
      }
    };
  }),
  on(CounterActions.decrement, (state, { productId }) => {
    const current = state.quantities[productId] || 0;
    return {
      ...state,
      quantities: {
        ...state.quantities,
        [productId]: current > 0 ? current - 1 : current,
      }
    };
  }),
  on(CounterActions.setQuantity, (state, { productId, quantity }) => ({
    ...state,
    quantities: {
      ...state.quantities,
      [productId]: quantity >= 0 && quantity <= 10 ? quantity : (state.quantities[productId] || 0),
    }
  }))
);
