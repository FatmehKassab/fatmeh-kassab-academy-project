import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CommonModule, NgIf } from '@angular/common';
import { TitleService } from '../../shared/services/title.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports: [NgIf,RatingModule,CommonModule,
    FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private customTitleService: TitleService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
           this.customTitleService.setTitles('Products', product.title);
      });
      
    }
  }
}