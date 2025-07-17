import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { SocialsComponent } from "../socials/socials.component";

@Component({
  selector: 'app-product-card',

 standalone: true,
  imports: [CommonModule, SocialsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() products: Product[] = [];

  get ICONS(): any {
    return {
      search: 'icons/search.svg', 
      cart: 'icons/cart.svg',
      user_white: 'icons/user_white.svg',
    };}
}
