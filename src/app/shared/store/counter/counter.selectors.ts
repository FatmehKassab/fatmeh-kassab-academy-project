import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectQuantityByProductId = (productId: number) =>
  createSelector(
    selectCounterState,
    (state: CounterState) => state.quantities[productId] ?? 1
   
  );
