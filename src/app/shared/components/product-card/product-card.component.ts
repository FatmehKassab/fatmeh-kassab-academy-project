import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { SocialsComponent } from "../socials/socials.component";
import { ICONS } from '../../utils/icons';

@Component({
  selector: 'app-product-card',

 standalone: true,
  imports: [CommonModule, SocialsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() products: Product[] = [];

 ICONS = ICONS;
}
