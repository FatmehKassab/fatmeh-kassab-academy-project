import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { TextInputComponent } from "../../shared/components/inputs/text-input/text-input.component";
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

interface SignInForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ButtonComponent, 
    TextInputComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  signinForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      
      const credentials = {
        Email: this.signinForm.value.email,
        Password: this.signinForm.value.password
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/products']); 
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.signinForm.markAllAsTouched();
    }
  }

  get f() {
    return this.signinForm.controls;
  }

  get IMAGES() {
    return {
      login_illustration: 'images/login_illustration.svg',
      logo: 'images/logo.svg'
    };
  }
}