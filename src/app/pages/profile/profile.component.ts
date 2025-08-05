import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { TextInputComponent } from "../../shared/components/inputs/text-input/text-input.component";
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MessageService } from 'primeng/api';
import { ActiveTabComponent } from '../../shared/components/active-tab/active-tab.component';
import { AddressService } from '../../shared/services/address.service';

@Component({
  selector: 'app-profile',
  imports: [NgIf, TextInputComponent, ReactiveFormsModule,ButtonComponent,ActiveTabComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  activeTab: string = 'account'; 
  addressForm!: FormGroup;
   isEditing = true; 
  submittedAddress: any = null;
 firstName: string = '';
 public user: any;
  constructor( private fb: FormBuilder,private messageService: MessageService,
     private authService: AuthService,private addressService: AddressService
  ) {}

  ngOnInit() {
   

    this.initializeForm();

       this.user = this.authService.getUserData();
        const savedAddress = this.getSavedAddressFromProfile(); // Example method
    if (savedAddress) {
      this.addressForm.patchValue(savedAddress);
      this.submittedAddress = savedAddress;
      this.isEditing = false;
    }

    

        }

        onTabChanged(tab: string) {
    this.activeTab = tab;
  }

  deleteAccount(){
    this.authService.deleteAccount().subscribe({
  next: () => {
    this.messageService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Account Deleted Successfully!' 
        });
  },
  error: (err) => {
     const msg = err.error?.message || 'Deleting account failed. Please try again.';
    this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail:  msg
        });
  }
});

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



  onSubmit(): void {
    if (this.addressForm.valid) {
       this.messageService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Address Changed Successfully!' 
        });
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  get f() {
    return this.addressForm.controls;
  }
}