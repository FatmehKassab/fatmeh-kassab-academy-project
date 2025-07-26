import { Component, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { DrawerService } from '../../services/drawer.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from "../counter/counter.component";

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [DrawerModule, CommonModule, FormsModule, CounterComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent implements OnInit {
  visible = false;
  drawerType: 'cart' | 'favorites' = 'cart';
  products: any[] = [];
  grandTotal: number = 0;

  constructor(
    private drawerService: DrawerService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.drawerService.drawerVisible$.subscribe(visible => this.visible = visible);
    this.drawerService.drawerType$.subscribe(type => {
      this.drawerType = type;

      if (type === 'cart') {
        this.cartService.getProducts().subscribe(res => {
          this.products = res;
          this.grandTotal = this.cartService.getTotalPrice();
        });
      } else {
        this.products = this.favoritesService.favorites();
      }
    });
  }

  removeItem(item: any) {
    if (this.drawerType === 'cart') {
      this.cartService.removeCartItem(item);
      this.grandTotal = this.cartService.getTotalPrice();
    } else {
      this.favoritesService.removeFavorite(item);
      this.products = this.favoritesService.favorites();
    }
  }

  empty() {
    if (this.drawerType === 'cart') {
      this.cartService.removeAllCart();
      this.grandTotal = 0;
    } else {
      this.favoritesService.clearFavorites();
      this.products = [];
    }
  }



}
