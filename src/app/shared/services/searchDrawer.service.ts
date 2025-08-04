import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDrawerService {
  private visibleSubject = new BehaviorSubject<boolean>(false);
  drawerVisible$ = this.visibleSubject.asObservable();

  openSearchDrawer() {
    this.visibleSubject.next(true);
  }

  closeSearchDrawer() {
    this.visibleSubject.next(false);
  }
}
