import { Component, Input, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { DrawerService } from '../../services/drawer.service';
import { FavoritesService } from '../../services/favorites.service';
import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from "../counter/counter.component";
import { Store } from '@ngrx/store';
import { selectCartItems, selectCartTotal, selectGrandTotal} from '../../store/cart/cart.selectors';
import { clearCart, deleteProductFromCart, removeCartItem } from '../../store/cart/cart.actions';
import { Observable } from 'rxjs';
import { ICONS } from '../../utils/icons';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, NgIf, CounterComponent, TitleCasePipe,AsyncPipe,DecimalPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  drawerType: 'cart' | 'favorites' = 'cart';
  @Input() products: any[] = [];
  constructor(
    private drawerService: DrawerService,
    private favoritesService: FavoritesService,
    private store: Store
  ) { 
    
  }
  ICONS = ICONS;
 ngOnInit(): void {
  
    
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



}
