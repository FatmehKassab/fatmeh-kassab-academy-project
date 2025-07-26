import { Component, effect, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { DrawerService } from '../../services/drawer.service';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import {
  selectCartItems,
  selectCartTotal,
  selectGrandTotal,
  selectProductTotalById,
  selectTotalQuantity
} from '../../store/cart/cart.selectors';
import {
  clearCart,
  deleteProductFromCart
} from '../../store/cart/cart.actions';
import { Observable } from 'rxjs';
import { ICONS } from '../../utils/icons';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [DrawerModule, CommonModule, FormsModule, ProductListComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent implements OnInit {
  visible = false;
  drawerType: 'cart' | 'favorites' = 'cart';
  products: any[] = [];
  productId!: number;
  product: any;
  totalItems: number = 0;
  totalFavorites: number = 0;
  totalQuantity$!: Observable<number>;
  grandTotal$!: Observable<number>;
  ICONS = ICONS;

  constructor(
    private drawerService: DrawerService,
    private favoritesService: FavoritesService,
    private store: Store
  ) {
    this.grandTotal$ = this.store.select(selectGrandTotal);
     effect(() => {
      this.totalFavorites = this.favoritesService.count();
    });
  }

  ngOnInit(): void {
    this.drawerService.drawerVisible$.subscribe(visible => {
      this.visible = visible;
    });

    this.drawerService.drawerType$.subscribe(type => {
      this.drawerType = type;

      if (type === 'cart') {
        this.store.select(selectCartItems).subscribe(items => {
          this.products = [...items];
        });
      } else if (type === 'favorites') {
        this.products = this.favoritesService.favorites();
      }
    });


    this.totalQuantity$ = this.store.select(selectTotalQuantity);
    this.totalQuantity$.subscribe(quantity => {
      this.totalItems = quantity;
    });
  }

  getProductTotal(productId: number): Observable<number> {
    return this.store.select(selectProductTotalById(productId));
  }

  removeItem(item: any) {
    if (this.drawerType === 'cart') {
      this.store.dispatch(deleteProductFromCart({ productId: item.id }));
    } else {
      this.favoritesService.removeFavorite(item);
      this.products = this.favoritesService.favorites();
    }
  }

  empty() {
    if (this.drawerType === 'cart') {
      this.store.dispatch(clearCart());
    } else {
      this.favoritesService.clearFavorites();
      this.products = [];
    }
  }
}
