import { Component, OnInit, OnDestroy, inject, NgZone } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { IMAGES } from '../../utils/images';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);
  private intervalId: any;

  IMAGES = IMAGES;
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

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.pollForUpdates();
      }, 500);
    });
  }


  pollForUpdates(): void {
    console.log('Polling for updates...');
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
