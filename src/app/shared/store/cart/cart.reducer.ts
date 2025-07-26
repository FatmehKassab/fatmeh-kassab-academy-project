import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  cartItems: any[];
  search: string;
  quantities: { [productId: number]: number };
}

const initialState: CartState = {
  cartItems: [],
  search: '',
  quantities:{}
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
  const currentQty = state.quantities[product.id] || 0;

  const isNewItem = !existingItem;
  const quantityToAdd = isNewItem ? (product.quantity || 1) : 1;

  const newQty = currentQty + quantityToAdd;

  const updatedCart = isNewItem
    ? [
        ...state.cartItems,
        {
          ...product,
          quantity: newQty,
          total: newQty * product.price
        }
      ]
    : state.cartItems.map(p =>
        p.id === product.id
          ? {
              ...p,
              quantity: newQty,
              total: newQty * p.price
            }
          : p
      );

  return {
    ...state,
    cartItems: updatedCart,
    quantities: {
      ...state.quantities,
      [product.id]: newQty
    }
  };
}),



on(CartActions.removeCartItem, (state, { productId }) => {
  const existingItem = state.cartItems.find(item => item.id === productId);

  if (!existingItem) return state;

  const newQuantity = (state.quantities[productId] || existingItem.quantity) - 1;

  const updatedCart = newQuantity > 0
    ? state.cartItems.map(item =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
              total: newQuantity * item.price
            }
          : item
      )
    : state.cartItems.filter(item => item.id !== productId);

  const updatedQuantities = { ...state.quantities };
  if (newQuantity > 0) {
    updatedQuantities[productId] = newQuantity;
  } else {
    delete updatedQuantities[productId];
  }

  return {
    ...state,
    cartItems: updatedCart,
    quantities: updatedQuantities
  };
}),


  on(CartActions.clearCart, state => ({
    ...state,
    cartItems: []
  })),

  on(CartActions.updateSearch, (state, { searchTerm }) => ({
    ...state,
    search: searchTerm
  })),

  on(CartActions.setQuantity, (state, { productId, quantity }) => ({
      ...state,
      quantities: {
        ...state.quantities,
        [productId]: quantity >= 1 && quantity <= 10 ? quantity : 1, 
      }
    }))
);
