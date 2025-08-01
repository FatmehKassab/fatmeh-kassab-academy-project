import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { TextInputComponent } from "../../shared/components/inputs/text-input/text-input.component";
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  imports: [NgIf, TextInputComponent, ReactiveFormsModule,ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  activeTab: string = 'account'; 
  addressForm!: FormGroup;
 firstName: string = '';
 public user: any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router,private messageService: MessageService,
     private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      if (tab) {
        this.activeTab = tab;
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { tab: this.activeTab },
          queryParamsHandling: 'merge',
        });
      }
    });

    this.initializeForm();

       this.user = this.authService.getUserData();

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
  
  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
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