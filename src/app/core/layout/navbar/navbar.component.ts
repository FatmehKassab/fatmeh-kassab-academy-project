import { Component } from '@angular/core';
import { SocialsComponent } from "../../../shared/components/socials/socials.component";
import { IMAGES } from '../../../shared/utils/images';
import { ICONS } from '../../../shared/utils/icons';
import { DrawerService } from '../../../shared/services/drawer.service';

@Component({
  selector: 'app-navbar',
  imports: [SocialsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 IMAGES = IMAGES;
 ICONS = ICONS;

 constructor(private drawerService: DrawerService) {}

  openDrawer() {
    this.drawerService.openDrawer();
  }
}
