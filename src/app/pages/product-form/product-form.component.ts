import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';



@Component({
  standalone:true,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
   imports: [

  CommonModule,
    FormsModule,
    ReactiveFormsModule,

// TextInputComponent,
// ButtonComponent

  
  ],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      inStock: ['', [Validators.required, Validators.min(0)]]
    });

  
  }

  ngOnInit(): void {
    if ( this.config.data.product) {
      this.productForm.patchValue(this.config.data.product);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.ref.close(this.productForm.value);
    }
  }

  onCancel(): void {
    this.ref.close();
  }
}