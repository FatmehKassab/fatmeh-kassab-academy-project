import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToCart, removeCartItem } from '../../store/cart/cart.actions';
import { AsyncPipe } from '@angular/common';
import { selectQuantityByProductId } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnChanges {
  @Input() productId!: number;
  @Input() product: any;
  @Input() inCart: boolean = false;

  quantity$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
    this.quantity$ = this.store.select(selectQuantityByProductId(this.productId));
    }
  }

  onPlusClick(): void {
    this.store.dispatch(addToCart({ product: this.product }));
  }

onMinusClick(): void {
  this.store.dispatch(removeCartItem({ productId: this.productId }));
}

}
