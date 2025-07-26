import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {  selectQuantityByProductId } from '../../store/counter/counter.selectors';
import { decrement, increment } from '../../store/counter/counter.actions';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  @Input() productId!: number;
  quantity$: Observable<number>;

  constructor(private store: Store) {
    this.quantity$ = this.store.select(selectQuantityByProductId(this.productId));
  }

  onPlusClick(): void {
    this.store.dispatch(increment({ productId: this.productId }));
  }

  onMinusClick(): void {
    this.store.dispatch(decrement({ productId: this.productId }));
  }
}