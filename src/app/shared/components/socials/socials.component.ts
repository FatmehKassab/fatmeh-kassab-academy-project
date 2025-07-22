import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss',
  standalone: true,
  imports:[NgIf,NgTemplateOutlet]
})
export class SocialsComponent {
  @Input() iconPath: string = '';
  @Input() altText: string = 'icon';
  @Input() isDropdown: boolean = false;
  @Input() dropdownContent: TemplateRef<any> | null = null;
  @Output() iconClick = new EventEmitter<void>();

  showDropdown = false;

  onClick() {
    this.iconClick.emit();
    if (this.isDropdown) {
      this.showDropdown = !this.showDropdown;
    }
  }
}
