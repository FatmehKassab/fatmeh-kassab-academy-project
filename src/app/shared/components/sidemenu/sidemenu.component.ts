import { Component, EventEmitter, Output } from '@angular/core';
import { IMAGES } from '../../utils/images';
import { ICONS } from '../../utils/icons';

@Component({
  selector: 'app-sidemenu',
  imports: [],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {
  @Output() menuItemClick = new EventEmitter<string>();
  IMAGES = IMAGES;
  ICONS = ICONS;
    currentView: string = 'products'; 

  
    onItemClick(view: string) {
    this.menuItemClick.emit(view);
  }
}
