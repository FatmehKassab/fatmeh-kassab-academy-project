import { Component, OnInit } from '@angular/core';
import { IMAGES } from '../../utils/images';
import { NgFor, TitleCasePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  imports: [NgFor, TitleCasePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
IMAGES =IMAGES;
categories: string[] = [];

images = [
  this.IMAGES.tv,
  this.IMAGES.earrings,
  this.IMAGES.mantop,
  this.IMAGES.womantop,
  
]
constructor(private productService: ProductService) {}

  ngOnInit(): void {

 this.productService.getAllCategories().subscribe(data => {
  console.log(">>>>>>>>",data)
      this.categories = data;
    });
  }
}
