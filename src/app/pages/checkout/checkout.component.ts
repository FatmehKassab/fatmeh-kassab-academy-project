import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems, selectGrandTotal, selectTotalQuantity } from '../../shared/store/cart/cart.selectors';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { Product } from '../../shared/interfaces/product.model';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { clearCart } from '../../shared/store/cart/cart.actions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-checkout',
  imports: [ProductListComponent,CommonModule,TextInputComponent,ButtonComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  products: any[] = [];
    totalItems: number = 0;
      totalQuantity$!: Observable<number>;
        grandTotal$!: Observable<number>;
 constructor(private store: Store,private router: Router,private messageService: MessageService) {  this.grandTotal$ = this.store.select(selectGrandTotal)}


ngOnInit(): void {
  
  this.store.select(selectCartItems).subscribe((items:Product[]) => {
  this.products = [...items];
});
this.totalQuantity$ = this.store.select(selectTotalQuantity);
    this.totalQuantity$.subscribe(quantity => {
      this.totalItems = quantity;
    });

}


grandTotal = this.products.reduce((acc, item) => acc + item.price, 0);



  navigateTo(path: string) {
    this.router.navigate([path]);
  }



      confirmOrder() {
    
        this.store.dispatch(clearCart());
         this.messageService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Order placed successfully!' 
        });
    
    }

}
