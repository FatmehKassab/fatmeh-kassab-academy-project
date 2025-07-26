import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, effect, EventEmitter, Input, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { FavoritesService } from '../../services/favorites.service';
import { Store } from '@ngrx/store';
import { selectTotalQuantity } from '../../store/cart/cart.selectors';

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
totalQuantity$!: Observable<number>;
  constructor(
    private authService: AuthService,
    public favoritesService: FavoritesService,
    private store: Store
  ) {
    effect(() => {
      this.totalFavorites = this.favoritesService.count();
    });
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

        this.totalQuantity$ = this.store.select(selectTotalQuantity);
    });

     this.totalQuantity$ = this.store.select(selectTotalQuantity);
  this.totalQuantity$.subscribe(quantity => {
    this.totalItems = quantity;
  });
  }

  get badgeValue(): number {
    return this.drawerType === 'cart' ? this.totalItems : this.totalFavorites;
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
