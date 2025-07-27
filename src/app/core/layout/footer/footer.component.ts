import { Component } from '@angular/core';
import { SocialsComponent } from "../../../shared/components/socials/socials.component";
import { IMAGES } from '../../../shared/utils/images';
import { ICONS } from '../../../shared/utils/icons';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [SocialsComponent,NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
 ICONS = ICONS;
 IMAGES =IMAGES;

   constructor(
private router: Router
  
   ) {
 this.router.events
       .pipe(filter(event => event instanceof NavigationEnd))
       .subscribe((event: NavigationEnd) => {
         const hiddenRoutes = ['/sign-in', '/sign-up'];
         this.showFooter = !hiddenRoutes.includes(event.url);
       });
   }
 
   showFooter = true;
}
