import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() { }
  private _drawerVisible = new BehaviorSubject<boolean>(false);
  drawerVisible$ = this._drawerVisible.asObservable();

  openDrawer() {
    this._drawerVisible.next(true);
    console.log("open")
  }

  closeDrawer() {
    this._drawerVisible.next(false);
  }
}
