import { Component } from '@angular/core';
import { SocialsComponent } from "../../../shared/components/socials/socials.component";

@Component({
  selector: 'app-footer',
  imports: [SocialsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
 get IMAGES() {
    return {
      login_illustration: 'images/login_illustration.svg',
      logo: 'images/logo.svg'
    };
  }

     get ICONS(): any {
    return {
      search: 'icons/search.svg', 
      cart: 'icons/cart.svg',
      user_white: 'icons/user_white.svg',
    };
  }
}
