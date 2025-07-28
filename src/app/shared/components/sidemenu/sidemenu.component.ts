import { Component } from '@angular/core';
import { IMAGES } from '../../utils/images';
import { ICONS } from '../../utils/icons';

@Component({
  selector: 'app-sidemenu',
  imports: [],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {
  IMAGES = IMAGES;
  ICONS = ICONS;
}
