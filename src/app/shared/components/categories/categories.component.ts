import { Component } from '@angular/core';
import { IMAGES } from '../../utils/images';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
IMAGES =IMAGES;
categories = [
    {
      name: "Men’s clothing",
      image: "mantop"
    },
    {
      name: "Women’s clothing",
      image: "womantop"
    },
    {
      name: "Jewelry",
      image: "earrings"
    },
    {
      name: "Electronics",
      image: "tv"
    }]
}
