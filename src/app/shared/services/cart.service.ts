import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: any) {
    const existingProduct = this.cartItemList.find((item: any) => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += product.quantity || 1;
      existingProduct.total = existingProduct.price * existingProduct.quantity;
    } else {
      product.quantity = product.quantity || 1;
      product.total = product.price * product.quantity;
      this.cartItemList.push(product);
    }
    
    this.productList.next(this.cartItemList);
  }

  getTotalPrice(): number {
    return this.cartItemList.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter((item: any) => item.id !== product.id);
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}