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
 cartItems$!: Observable<any[]>;
  constructor(
    private drawerService: DrawerService,
    private cartService: CartService
  ) {}


ngOnInit(): void {
  this.cartItems$ = this.cartService.cartItems$;

  this.drawerService.drawerVisible$.subscribe(visible => {
    this.visible = visible;
  });
}



  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotalItems(): number {
    return this.cartService.getItemCount();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}