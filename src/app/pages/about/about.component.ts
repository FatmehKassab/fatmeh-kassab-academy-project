import { Component } from '@angular/core';
import { IMAGES } from '../../shared/utils/images';
import { CtaComponent } from "../../shared/components/cta/cta.component";

@Component({
  selector: 'app-about',
  imports: [CtaComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
IMAGES=IMAGES
}
