import { Component, effect, Inject, Input } from '@angular/core';
import { SocialsComponent } from "../../../shared/components/socials/socials.component";
import { IMAGES } from '../../../shared/utils/images';
import { ICONS } from '../../../shared/utils/icons';
import { DrawerService } from '../../../shared/services/drawer.service';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { Product } from '../../../shared/interfaces/product.model';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { SearchDrawerService } from '../../../shared/services/searchDrawer.service';
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SocialsComponent, RouterModule, NgIf, NgClass, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  IMAGES = IMAGES;
  ICONS = ICONS;
  menuOpen = false;
 isLoggedIn: boolean = false;
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

  
  }

   ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.authSubscription = this.authService.authStateChanged.subscribe(() => {
      this.admin = this.authService.isAdmin();
      console.log("Admin status updated:", this.admin);
    });

     this.authSubscription = this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

    logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }

  showNavbar = true;
  private authSubscription!: Subscription;
  
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
  navigateTo(route: string) {
  this.router.navigate([route]);
}

}