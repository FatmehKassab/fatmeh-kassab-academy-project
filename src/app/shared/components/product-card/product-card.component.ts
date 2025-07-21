import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { SocialsComponent } from "../socials/socials.component";
import { ICONS } from '../../utils/icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',

 standalone: true,
  imports: [CommonModule, SocialsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() products: Product[] = [];
    @Input() product!: Product;

 ICONS = ICONS;

 constructor(private cartService: CartService) {}

  addToCart(item: any){
    this.cartService.addtoCart(item);
  }}
