import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { TextInputComponent } from "../../shared/components/inputs/text-input/text-input.component";
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-sign-up',
  standalone:true,
  imports: [ButtonComponent, TextInputComponent,NgIf,CommonModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      // Handle submission (e.g., API call)
    } else {
      this.signupForm.markAllAsTouched(); // Show validation errors
    }
  }

  get f() {
    return this.signupForm.controls;
  }
}
