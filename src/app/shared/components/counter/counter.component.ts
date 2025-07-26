import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {  selectQuantityByProductId } from '../../store/counter/counter.selectors';
import { decrement, increment } from '../../store/counter/counter.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnChanges {
  @Input() productId!: number;
   quantity$!: Observable<number>;

constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
      this.quantity$ = this.store.select(selectQuantityByProductId(this.productId));
    }
  }

  onPlusClick(): void {
    this.store.dispatch(increment({ productId: this.productId }));
   
  }

  onMinusClick(): void {
    this.store.dispatch(decrement({ productId: this.productId }));
  }
  
}