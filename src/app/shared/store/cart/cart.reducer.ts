import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  cartItems: any[];
  search: string;
}

const initialState: CartState = {
  cartItems: [],
  search: ''
};

export const cartReducer = createReducer(
  initialState,

    on(CartActions.getCart, (state, { products }) => ({
    ...state,
    cartItems: [...products]
  })),
  on(CartActions.setCart, (state, { products }) => ({
    ...state,
    cartItems: [...products]
  })),

  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.cartItems.find(p => p.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = state.cartItems.map(p =>
        p.id === product.id
          ? {
              ...p,
              quantity: p.quantity + (product.quantity || 1),
              total: (p.quantity + (product.quantity || 1)) * p.price
            }
          : p
      );
    } else {
      updatedCart = [
        ...state.cartItems,
        {
          ...product,
          quantity: product.quantity || 1,
          total: (product.quantity || 1) * product.price
        }
      ];
    }

    return { ...state, cartItems: updatedCart };
  }),

  on(CartActions.removeCartItem, (state, { productId }) => ({
    ...state,
    cartItems: state.cartItems.filter(item => item.id !== productId)
  })),

  on(CartActions.clearCart, state => ({
    ...state,
    cartItems: []
  })),

  on(CartActions.updateSearch, (state, { searchTerm }) => ({
    ...state,
    search: searchTerm
  }))
);
