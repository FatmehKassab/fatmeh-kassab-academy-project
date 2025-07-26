import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartState } from './cart.reducer';
import { selectCartItems } from './cart.selectors';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store<CartState>);

  loadCart$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap(() =>
        this.http.get<any[]>('https://fakestoreapi.com/carts/user/1').pipe(
          map((response) => {
            if (response && response.length > 0) {
              // Get the most recent cart
              const latestCart = response.reduce((prev, current) => 
                (new Date(prev.date) > new Date(current.date) ? prev : current
              ))
              return CartActions.loadCartSuccess({ items: latestCart.products });
            }
            return CartActions.loadCartSuccess({ items: [] });
          }),
          catchError(error => of(CartActions.loadCartFailure({ error: error.message })))
        )
      )
    )
  );

  saveCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.saveCart),
      withLatestFrom(this.store.select(selectCartItems)),
      mergeMap(([_, items]) => {
        const userId = 1;
        const date = new Date().toISOString();
        const products = items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }));
  
        return this.http.post('https://fakestoreapi.com/carts', {
            
          userId,
          date,
          products
        }).pipe(
          map(() => CartActions.saveCartSuccess()),
          catchError(error => of(CartActions.saveCartFailure({ error: error.message })))
        );
      })
    )
  );
  
}
