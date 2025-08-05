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
import { AddressComponentComponent } from "../../shared/components/address-component/address-component.component";

@Component({
  selector: 'app-profile',
  imports: [NgIf, TextInputComponent, ReactiveFormsModule, ButtonComponent, ActiveTabComponent, AddressComponentComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  activeTab: string = 'account'; 
  passwordForm!: FormGroup;
 firstName: string = '';
 public user: any;
  constructor( private fb: FormBuilder,private messageService: MessageService,
     private authService: AuthService
  ) {}

  ngOnInit() {
   


       this.user = this.authService.getUserData();
    

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



  onSubmit(): void {
    if (this.passwordForm.valid) {
       this.messageService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Address Changed Successfully!' 
        });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  get f() {
    return this.passwordForm.controls;
  }
}