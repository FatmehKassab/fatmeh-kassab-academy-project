import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private mainTitleSubject = new BehaviorSubject<string>('Product');
  private dynamicTitleSubject = new BehaviorSubject<string>('');

  mainTitle$ = this.mainTitleSubject.asObservable();
  dynamicTitle$ = this.dynamicTitleSubject.asObservable();

  setTitles(main: string, dynamic: string) {
    this.mainTitleSubject.next(main);
    this.dynamicTitleSubject.next(dynamic);
  }
}
