import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private visibleSubject = new BehaviorSubject<boolean>(false);
  private typeSubject = new BehaviorSubject<'cart' | 'favorites'>('cart');

  drawerVisible$ = this.visibleSubject.asObservable();
  drawerType$ = this.typeSubject.asObservable();

  openDrawer(type: 'cart' | 'favorites') {
    this.typeSubject.next(type);
    this.visibleSubject.next(true);
  }

  closeDrawer() {
    this.visibleSubject.next(false);
  }
}
