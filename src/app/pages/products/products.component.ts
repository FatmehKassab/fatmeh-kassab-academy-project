import { Component } from '@angular/core';
import { NavbarComponent } from "../../core/layout/navbar/navbar.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [NavbarComponent, ProductCardComponent, PageTitleComponent,CommonModule],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
