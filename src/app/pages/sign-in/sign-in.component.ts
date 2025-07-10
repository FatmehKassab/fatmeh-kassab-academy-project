import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { TextInputComponent } from "../../shared/components/inputs/text-input/text-input.component";
import { RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder) {}

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
      console.log('Form submitted:', this.signinForm.value);
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