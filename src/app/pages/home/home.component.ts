import { Component } from '@angular/core';
import { NavbarComponent } from '../../core/layout/navbar/navbar.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { CategoriesComponent } from "../../shared/components/categories/categories.component";
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { FaqComponent } from '../../shared/components/faq/faq.component';
import { ExploreComponent } from '../../shared/components/explore/explore.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, CategoriesComponent,CtaComponent, FaqComponent,ExploreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
