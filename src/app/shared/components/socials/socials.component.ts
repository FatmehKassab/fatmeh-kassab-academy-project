import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss',
  standalone: true,
  imports:[NgIf,NgTemplateOutlet,OverlayBadgeModule]
})
export class SocialsComponent {
  @Input() iconPath: string = '';
  @Input() altText: string = 'icon';
  @Input() isDropdown: boolean = false;
  @Input() dropdownContent: TemplateRef<any> | null = null;
  @Output() iconClick = new EventEmitter<void>();
  @Input() badgeValue: string | number | null = null;
  @Input() showBadge: boolean = false;
 

  showDropdown = false;


  onClick() {
    this.iconClick.emit();
    if (this.isDropdown) {
      this.showDropdown = !this.showDropdown;
    }
  }
}
