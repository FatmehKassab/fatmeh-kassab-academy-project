import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CommonModule, NgIf } from '@angular/common';
import { TitleService } from '../../shared/services/title.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ColorService } from '../../shared/services/color.service';
import { AccordionModule } from 'primeng/accordion';


@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports: [NgIf,RatingModule,CommonModule, FormsModule, AccordionModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  colors: any[] = [];
  sizes = ['S', 'M', 'L'];
  selectedSize: string = '';

  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private customTitleService: TitleService,
    private colorService: ColorService
  ) {}



selectSize(size: string) {
  this.selectedSize = size;
}
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
           this.customTitleService.setTitles('Products', product.title);
      });
      
    }

    this.colorService.getRandomColors(5).subscribe((res: any) => {
      this.colors = res.colors;
    });
  }
}