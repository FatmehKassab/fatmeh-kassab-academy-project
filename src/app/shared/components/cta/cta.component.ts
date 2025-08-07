import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cta',
  imports: [ButtonComponent],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  private route =inject(Router)
  navigateTo(path: string) {
    this.route.navigate([path]);
  }

}
