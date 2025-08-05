import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { TextInputComponent } from '../inputs/text-input/text-input.component';
import { AddressService } from '../../services/address.service';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-address-component',
  imports: [NgIf, TextInputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './address-component.component.html',
  styleUrl: './address-component.component.scss'
})
export class AddressComponentComponent implements OnInit {
  @Input() isProfile: boolean = false;
  addressForm!: FormGroup;
  isEditing = true;
  submittedAddress: any = null;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
    });
    

    const savedAddress = this.addressService.getAddress();
    if (savedAddress) {
      this.addressForm.patchValue(savedAddress);
      this.submittedAddress = savedAddress;
      if (this.isProfile) {
        this.isEditing = false; 
      }
    }
  }

  onSubmitForm() {
    if (this.addressForm.valid) {
      this.submittedAddress = this.addressForm.value;
      this.isEditing = false;
      this.addressService.setAddress(this.submittedAddress);
             this.messageService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Address Changed Successfully!' 
        });
    }
  }

  editAddress() {
    this.isEditing = true;
  }





  get f() {
    return this.addressForm.controls;
  }
}