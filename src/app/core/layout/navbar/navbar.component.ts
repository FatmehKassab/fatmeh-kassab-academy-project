import { Component, effect, Input } from '@angular/core';
import { SocialsComponent } from "../../../shared/components/socials/socials.component";
import { IMAGES } from '../../../shared/utils/images';
import { ICONS } from '../../../shared/utils/icons';
import { DrawerService } from '../../../shared/services/drawer.service';
import { CartService } from '../../../shared/services/cart.service';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { Product } from '../../../shared/interfaces/product.model';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [SocialsComponent,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 IMAGES = IMAGES;
 ICONS = ICONS;
  @Input() products: Product[] = [];
  @Input() product!: Product;
 constructor(private drawerService: DrawerService,private cartService : CartService, public favoritesService: FavoritesService) {   
   effect(() => {
      console.log(this.favoritesService.count())
      this.totalFavorites = this.favoritesService.count(); 
  })}

  
  openCartDrawer() {
    this.drawerService.openDrawer('cart');
  }

  openFavoritesDrawer() {
    this.drawerService.openDrawer('favorites');
  }
   public totalItem : number = 0;
   public totalFavorites: number = 0;


  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })

}
}
