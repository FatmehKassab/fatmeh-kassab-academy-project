import { Component, effect, Input, TemplateRef, ViewChild } from '@angular/core';
import { SocialsComponent } from "../../../shared/components/socials/socials.component";
import { IMAGES } from '../../../shared/utils/images';
import { ICONS } from '../../../shared/utils/icons';
import { DrawerService } from '../../../shared/services/drawer.service';
import { CartService } from '../../../shared/services/cart.service';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { Product } from '../../../shared/interfaces/product.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, shareReplay, startWith, Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SocialsComponent, RouterModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  IMAGES = IMAGES;
  ICONS = ICONS;
  
  @Input() products: Product[] = [];
  @Input() product!: Product;
  
  public totalItem: number = 0;
  public totalFavorites: number = 0;
  username: string | null = null;
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;
userData: any;
  constructor(
    private drawerService: DrawerService,
    private cartService: CartService,
    public favoritesService: FavoritesService,
    private authService: AuthService
  ) {
    effect(() => {
      this.totalFavorites = this.favoritesService.count();
    });




  }
  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      });
      
       this.authService.isLoggedIn().subscribe((loggedIn) => {
    this.isLoggedIn = loggedIn;
    this.username = this.authService.getUserData()?.Firstname || 'User';
       console.log(">>>>>",loggedIn,this.isLoggedIn)

  });
  }
  ngOnDestroy() {
    // Clean up subscription
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  openCartDrawer() {
    this.drawerService.openDrawer('cart');
  }

  openFavoritesDrawer() {
    this.drawerService.openDrawer('favorites');
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

   @ViewChild('loggedInDropdown', { read: TemplateRef }) loggedInDropdown!: TemplateRef<any>;
  @ViewChild('loggedOutDropdown', { read: TemplateRef }) loggedOutDropdown!: TemplateRef<any>;

  get currentDropdown() {
    return this.authService.getCurrentAuthStatus() ? 
           this.loggedInDropdown : 
           this.loggedOutDropdown;
  }
}