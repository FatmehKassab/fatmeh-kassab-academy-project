import { Component } from '@angular/core';
import { NavbarComponent } from "../../core/layout/navbar/navbar.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-products',
  imports: [NavbarComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
