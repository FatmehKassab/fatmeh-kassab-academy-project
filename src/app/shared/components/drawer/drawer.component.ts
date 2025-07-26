import { Component, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { DrawerService } from '../../services/drawer.service';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from "../counter/counter.component";
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal, selectGrandTotal, selectProductTotalById} from '../../store/cart/cart.selectors';
import { clearCart, deleteProductFromCart, removeCartItem } from '../../store/cart/cart.actions';
import { Observable } from 'rxjs';


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
  grandTotal$!: Observable<number>;
 productId!: number;
 product: any;
  constructor(
    private drawerService: DrawerService,
    private favoritesService: FavoritesService,
    private store: Store
  ) {  this.grandTotal$ = this.store.select(selectGrandTotal);
    
  }

 ngOnInit(): void {
  
    this.drawerService.drawerVisible$.subscribe(visible => this.visible = visible);
    
    this.drawerService.drawerType$.subscribe(type => {
      this.drawerType = type;

      if (type === 'cart') {
        
        this.store.select(selectCartItems).subscribe(items => {
  this.products = [...items];
 console.log( ">>>>",selectCartItems)
 
  


});


      
      } else if (type === 'favorites') {
        this.products = this.favoritesService.favorites();
      }
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
      // this.grandTotal = 0;
    } else {
      this.favoritesService.clearFavorites();
      this.products = [];
    }
  }


  // updateQuantity(item: any, change: number) {
  //   if (this.drawerType !== 'cart') return;

  //   const newQuantity = item.quantity + change;
  //   if (newQuantity > 0 && newQuantity <= 10) {
  //     item.quantity = newQuantity;
  //     item.total = item.price * item.quantity;
  //     this.cartService.productList.next([...this.cartService.cartItemList]);
  //     this.grandTotal = this.cartService.getTotalPrice();
  //   }
  // }
}
