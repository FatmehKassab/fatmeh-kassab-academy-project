import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { TextInputComponent } from '../inputs/text-input/text-input.component';
import { AddressService } from '../../services/address.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-address-component',
  imports: [NgIf,TextInputComponent, ReactiveFormsModule,ButtonComponent],
  templateUrl: './address-component.component.html',
  styleUrl: './address-component.component.scss'
})
export class AddressComponentComponent {
activeTab: string = 'account'; 
  addressForm!: FormGroup;
   isEditing = true; 
  submittedAddress: any = null;
 firstName: string = '';
 public user: any;
  constructor( private fb: FormBuilder
   ,private addressService: AddressService
  ) {}

  ngOnInit() {
   

    this.initializeForm();

  
        const savedAddress = this.getSavedAddressFromProfile(); 
    if (savedAddress) {
      this.addressForm.patchValue(savedAddress);
      this.submittedAddress = savedAddress;
      this.isEditing = false;
    }

    

        }


  
  
onSubmitForm() {
    if (this.addressForm.valid) {
      this.submittedAddress = this.addressForm.value;
      this.isEditing = false;

      this.addressService.setAddress(this.submittedAddress); 
    }
  }

  editAddress() {
    this.isEditing = true;
  }

  saveAddressToProfile(address: any) {
    // TODO: implement actual saving logic
    console.log('Saving to profile:', address);
  }

  getSavedAddressFromProfile() {
    // Mocked example — replace with real profile retrieval
    return null;
  }

  private initializeForm(): void {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
    });
  }


  get f() {
    return this.addressForm.controls;
  }
}
