import { Component, effect, Inject, Input } from '@angular/core';
import { SocialsComponent } from "../../../shared/components/socials/socials.component";
import { IMAGES } from '../../../shared/utils/images';
import { ICONS } from '../../../shared/utils/icons';
import { DrawerService } from '../../../shared/services/drawer.service';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { Product } from '../../../shared/interfaces/product.model';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { SearchDrawerService } from '../../../shared/services/searchDrawer.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SocialsComponent, RouterModule,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  IMAGES = IMAGES;
  ICONS = ICONS;
  
  @Input() products: Product[] = [];
  @Input() product!: Product;


  constructor(
    private drawerService: DrawerService,private router: Router, private authService: AuthService,  private searchDrawerService: SearchDrawerService
 
  ) {
this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/sign-in', '/sign-up'];
        this.showNavbar = !hiddenRoutes.includes(event.url);
      });

   this.admin = this.authService.isAdmin(); 
  console.log("hhhh",this.admin)
  }

  showNavbar = true;
  
  
  admin: boolean = false;


  openCartDrawer() {
    this.drawerService.openDrawer('cart');
  }

  openFavoritesDrawer() {
    this.drawerService.openDrawer('favorites');
  }

  openSearchDrawer() {
        console.log("drawerrrr111")
  this.searchDrawerService.openSearchDrawer();
}


}