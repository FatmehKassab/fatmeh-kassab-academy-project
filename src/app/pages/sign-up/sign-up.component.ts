import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { TextInputComponent } from "../../shared/components/inputs/text-input/text-input.component";
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ButtonComponent, 
    TextInputComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
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
    this.signupForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9]{10,15}$/),
        Validators.minLength(10),
        Validators.maxLength(15)
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/) 
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  private passwordMatchValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

onSubmit(): void {
  if (this.signupForm.valid) {
    this.isLoading = true;
    this.errorMessage = null;
    
    const formData = this.signupForm.value;
    const userData = {
      Firstname: formData.fname,
      Lastname: formData.lname,
      Email: formData.email,
      Password: formData.password,
      RoleName: formData.rolename,
    };

    this.authService.signUp(userData).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Sign up failed. Please try again.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  } else {
    this.signupForm.markAllAsTouched();
  }
}

  get f() {
    return this.signupForm.controls;
  }

  get passwordsMatch(): boolean {
    return this.signupForm.hasError('mismatch') && 
           this.f['confirmPassword'].touched;
  }

  get IMAGES() {
    return {
      login_illustration: 'images/login_illustration.svg',
      logo: 'images/logo.svg'
    };
  }
}