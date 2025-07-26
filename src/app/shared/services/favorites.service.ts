import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteItems = signal<any[]>([]);
  public favorites = computed(() => this.favoriteItems());
  public count = computed(() => this.favoriteItems().length);

  constructor() {}

  addToFavorites(product: any): void {
    const exists = this.favoriteItems().some(item => item.id === product.id);
    if (!exists) {
      this.favoriteItems.update(items => [...items, product]);
    }
  }

  removeFavorite(product: any): void {
    this.favoriteItems.update(items =>
      items.filter(item => item.id !== product.id)
    );
  }

  clearFavorites(): void {
    this.favoriteItems.set([]);
  }

  isFavorite(product: any): boolean {
    return this.favoriteItems().some(p => p.id === product.id);
  }
}
