import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone:true,
  imports: [NgIf, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() title: string = '';
  @Input() icon?: string; 
  @Input() className: string = '';
  @Input() bgColor: string = 'primary';
  @Input() width: string = '100%'; 
  @Input() textColor: string = 'white'; 

  @Output() onClick = new EventEmitter<void>();

  // ICONS: Record<string, string> = {

  // }; // i want to make this as constants for all icons and map them where i need 

  emitClick(): void {
    this.onClick.emit();
  }
}
