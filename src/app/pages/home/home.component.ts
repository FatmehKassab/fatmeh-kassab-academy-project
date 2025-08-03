import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/layout/navbar/navbar.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { CategoriesComponent } from "../../shared/components/categories/categories.component";
import { CtaComponent } from '../../shared/components/cta/cta.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, CategoriesComponent,CtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
