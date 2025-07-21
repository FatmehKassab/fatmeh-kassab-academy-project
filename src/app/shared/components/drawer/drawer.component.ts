import { Component, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { DrawerService } from '../../services/drawer.service';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [DrawerModule, CommonModule, FormsModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent implements OnInit {
  visible: boolean = false;
  public products: any = [];
  public grandTotal: number = 0;

  constructor(
    private drawerService: DrawerService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.drawerService.drawerVisible$.subscribe(visible => {
      this.visible = visible;
    });
    
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.grandTotal = this.cartService.getTotalPrice();
  }

  emptyCart() {
    this.cartService.removeAllCart();
    this.grandTotal = 0;
  }

  updateQuantity(item: any, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      item.quantity = newQuantity;
      item.total = item.price * item.quantity;
      this.cartService.productList.next([...this.cartService.cartItemList]);
      this.grandTotal = this.cartService.getTotalPrice();
    }
  }
}