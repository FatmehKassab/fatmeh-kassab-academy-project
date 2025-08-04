import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Product } from '../../interfaces/product.model';
import { ProductService } from '../../services/product.service';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [ProductCardComponent, ButtonComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {
  @Input() category: string = ''; 
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.category) {
      this.productService.getProductsByCategory(this.category).subscribe(data => {
        this.products = data.slice(0, 4); 
      });
    } else {
      this.productService.getAllProducts().subscribe(data => {
        this.products = data.slice(0, 4); 
      });
    }
  }
}
