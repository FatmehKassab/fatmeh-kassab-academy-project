import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-socials',
  imports: [],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class SocialsComponent {
  @Input() iconPath: string = '';
  @Input() altText: string = 'icon';


}
