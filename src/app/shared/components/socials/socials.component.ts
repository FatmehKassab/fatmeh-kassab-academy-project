import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-socials',
  imports: [],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class SocialsComponent {
  @Input() iconPath: string = '';
  @Input() altText: string = 'icon';
  @Output() iconClick = new EventEmitter<void>();

  onClick() {
    console.log("click")
    this.iconClick.emit();
  }

}
