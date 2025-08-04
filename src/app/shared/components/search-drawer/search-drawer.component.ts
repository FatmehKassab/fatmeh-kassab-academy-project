import { Component, inject, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { DialogModule } from 'primeng/dialog';
import { SearchInputComponent } from '../inputs/search-input/search-input.component';
import { SearchDrawerService } from '../../services/searchDrawer.service';

import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.model';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-search-drawer',
  standalone: true,
  imports: [DrawerModule, DialogModule, SearchInputComponent, CommonModule, ProductCardComponent],
  templateUrl: './search-drawer.component.html',
  styleUrl: './search-drawer.component.scss',
})
export class SearchDrawerComponent implements OnInit {
  visible = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private searchDrawerService: SearchDrawerService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
  this.searchDrawerService.drawerVisible$.subscribe((visible) => {
    this.visible = visible;
  });

  this.productService.getAllProducts().subscribe((products) => {
    this.products = products;
    this.filteredProducts = [];
  });
}

onSearch(query: string) {
  if (!query.trim()) {
    this.filteredProducts = [];
    return;
  }

  this.filteredProducts = this.products.filter((product) =>
  product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  
  );
}

}
