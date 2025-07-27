import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { SocialsComponent } from "../socials/socials.component";
import { ICONS } from '../../utils/icons';
import { FavoritesService } from '../../services/favorites.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',

 standalone: true,
  imports: [CommonModule, SocialsComponent,RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() products: Product[] = [];
  @Input() product!: Product;

 ICONS = ICONS;
private favoritesService = inject(FavoritesService);
 constructor(private store: Store) {}

 addToCart(product: any) {
  this.store.dispatch(addToCart({ product }));
}

  addToFavorites(product: any) {
  if (this.favoritesService.isFavorite(product)) {
    this.favoritesService.removeFavorite(product);
  } else {
     this.favoritesService.addToFavorites(product);
  }
}

  isFavorite(product: any): boolean {
  return this.favoritesService.isFavorite(product); 
}

}
