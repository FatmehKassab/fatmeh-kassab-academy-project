import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CommonModule, NgIf } from '@angular/common';
import { TitleService } from '../../shared/services/title.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ColorService } from '../../shared/services/color.service';
import { AccordionModule } from 'primeng/accordion';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ICONS } from '../../shared/utils/icons';
import { FavoritesService } from '../../shared/services/favorites.service';
import { SocialsComponent } from '../../shared/components/socials/socials.component';
import { CounterComponent } from '../../shared/components/counter/counter.component';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../shared/store/cart/cart.selectors';
import { ProgressBarModule } from 'primeng/progressbar';
import { ExploreComponent } from '../../shared/components/explore/explore.component';


@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports: [NgIf,RatingModule,CommonModule, FormsModule, AccordionModule, ButtonComponent,SocialsComponent,CounterComponent, ProgressBarModule,
    ExploreComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  colors: any[] = [];
  sizes = ['S', 'M', 'L'];
  selectedSize: string = '';
 ICONS = ICONS;
 @Input() products: any[] = [];
private favoritesService = inject(FavoritesService);
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private customTitleService: TitleService,
    private colorService: ColorService,
    private store: Store
  ) {}



selectSize(size: string) {
  this.selectedSize = size;
}
 addToFavorites(product: any) {
  if (this.favoritesService.isFavorite(product)) {
    this.favoritesService.removeFavorite(product);
  } else {
     this.favoritesService.addToFavorites(product);
  }
}

  isFavorite(product: any): boolean {
  return this.favoritesService.isFavorite(product); 
}
ngOnInit(): void {

  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (id) {
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
        this.customTitleService.setTitles('Products', product.title);

    
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });


  this.colorService.getRandomColors(5).subscribe((res: any) => {
    this.colors = res.colors;
  });

  this.store.select(selectCartItems).subscribe(items => {
    this.products = [...items];
  });
}



  
  
    
}