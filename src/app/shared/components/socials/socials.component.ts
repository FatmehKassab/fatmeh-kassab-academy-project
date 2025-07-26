import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, effect, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss',
  standalone: true,
  imports: [NgIf, OverlayBadgeModule]
})
export class SocialsComponent {
  @Input() iconPath: string = '';
  @Input() altText: string = 'icon';
  @Input() isDropdown: boolean = false;
  @Input() dropdownContent: TemplateRef<any> | null = null;
  @Output() iconClick = new EventEmitter<void>();
  @Input() showBadge: boolean = false;
  @Input() drawerType: 'cart' | 'favorites' = 'cart';

  firstName: string = '';
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;

  totalItems: number = 0;
  totalFavorites: number = 0;

  constructor(
    private authService: AuthService,
    public favoritesService: FavoritesService,
    private cartService: CartService,
  ) {
    effect(() => {
      this.totalFavorites = this.favoritesService.count();
    });
  }

  get badgeValue(): number {
    return this.drawerType === 'cart' ? this.totalItems : this.totalFavorites;
  }

  showDropdown = false;

  onClick() {
    this.iconClick.emit();
    if (this.isDropdown) {
      this.showDropdown = !this.showDropdown;
    }
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      const user = this.authService.getUserData();
      this.firstName = user?.given_name ?? 'User';

      this.cartService.getProducts().subscribe((res) => {
        this.totalItems = res.length;
      });
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
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
}
