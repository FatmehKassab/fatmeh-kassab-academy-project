import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../core/layout/navbar/navbar.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { BooleanInputComponent } from "../../shared/components/inputs/boolean-input/boolean-input.component";
import { Product, ProductService } from '../../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../core/layout/footer/footer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone:true,
  imports: [NavbarComponent, ProductCardComponent, CommonModule, BooleanInputComponent, FooterComponent,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategories = new Set<string>();
  sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];
  selectedSortOption = 'price-asc';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...data];
      this.sortProducts();
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
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p =>
        this.selectedCategories.has(p.category)
      );
    }
    this.sortProducts();
  }

  onCategoryChange(checked: boolean, category: string): void {
    if (checked) {
      this.selectedCategories.add(category);
    } else {
      this.selectedCategories.delete(category);
    }

    this.applyFilter();
  }

  onSortChange(): void {
    this.sortProducts();
  }

  sortProducts(): void {
    if (!this.filteredProducts) return;

    switch (this.selectedSortOption) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
  }
}