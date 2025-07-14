import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../core/layout/navbar/navbar.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { BooleanInputComponent } from "../../shared/components/inputs/boolean-input/boolean-input.component";
import { Product, ProductService } from '../../shared/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone:true,
  imports: [NavbarComponent, ProductCardComponent, CommonModule, BooleanInputComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
products: Product[] = [];
filteredProducts: Product[] = [];
categories: string[] = [];
selectedCategories = new Set<string>();

constructor(private productService: ProductService) {}

ngOnInit(): void {
  this.productService.getAllProducts().subscribe(data => {
    this.products = data;
    this.filteredProducts = data;
  });

  this.productService.getAllCategories().subscribe(data => {
    this.categories = data;
  });
}

toggleCategory(event: Event, category: string): void {
  const input = event.target as HTMLInputElement;

  if (input.checked) {
    this.selectedCategories.add(category);
  } else {
    this.selectedCategories.delete(category);
  }

  this.applyFilter();
}

applyFilter(): void {
  if (this.selectedCategories.size === 0) {
    this.filteredProducts = this.products;
  } else {
    this.filteredProducts = this.products.filter(p =>
      this.selectedCategories.has(p.category)
    );
  }
}

onCategoryChange(checked: boolean, category: string): void {
  if (checked) {
    this.selectedCategories.add(category);
  } else {
    this.selectedCategories.delete(category);
  }

  this.applyFilter();
}


}