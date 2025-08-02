import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { IMAGES } from '../../utils/images';
@Component({
  selector: 'app-carousel',
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
IMAGES =IMAGES;
slides = [
    {
      title: 'Style, Tech & Beyond',
      description: 'Own the moment and redefine your style with ModaFusion. New arrivals that slay — shop now!',
      button: 'Start Shopping'
    },
    {
      title: 'Refined Looks for Him',
      description: 'Dress sharp and own every moment — curated style just for you.',
      button: 'Explore Men\'s Collection'
    },
    {
      title: 'Empowered Elegance',
      description: 'Elegance redefined for the modern woman.',
      button: 'Shop Now'
    }
  ];
}
