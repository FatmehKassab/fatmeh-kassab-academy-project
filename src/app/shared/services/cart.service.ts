// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Add product to cart
  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    
    this.cartSubject.next([...this.cartItems]);
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartSubject.next([...this.cartItems]);
  }

  // Update product quantity
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  // Get total items in cart
  getItemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get total price
  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  // Save cart to API (using FakeStoreAPI)
  saveCartToApi(): void {
    const userId = 1; // Mock user ID
    const date = new Date().toISOString();
    const products = this.cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    this.http.post('https://fakestoreapi.com/carts', {
      userId,
      date,
      products
    }).subscribe({
      next: () => console.log('Cart saved successfully'),
      error: (err) => console.error('Error saving cart:', err)
    });
  }

  // Load cart from API
  loadCartFromApi(): void {
    this.http.get<any[]>('https://fakestoreapi.com/carts/user/1').subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const latestCart = response.reduce((prev, current) => 
            (new Date(prev.date) > new Date(current.date) ? prev : current)
          );
          
          // You would need to fetch product details here
          console.log('Loaded cart:', latestCart);
        }
      },
      error: (err) => console.error('Error loading cart:', err)
    });
  }
}