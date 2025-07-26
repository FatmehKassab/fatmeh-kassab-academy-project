import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Product } from '../../interfaces/product.model';


export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      const updatedItems = state.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    } else {
      const newItems = [...state.items, { product, quantity: 1 }];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter(item => item.product.id !== productId);
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
    };
  }),
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    const updatedItems = state.items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ).filter(item => item.quantity > 0);
    
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
    };
  }),
  on(CartActions.clearCart, () => initialState),
  on(CartActions.loadCartSuccess, (state, { items }) => {
    const cartItems = items.map(item => ({
      product: {} as Product, // You'll need to fetch the full product details here
      quantity: item.quantity
    }));
    
    return {
      ...state,
      items: cartItems,
      total: calculateTotal(cartItems),
    };
  }),
  on(CartActions.saveCartSuccess, state => state),
  on(CartActions.loadCartFailure, CartActions.saveCartFailure, (state, { error }) => {
    console.error('Cart API error:', error);
    return state;
  })
);