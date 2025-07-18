import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextInputComponent } from "./shared/components/inputs/text-input/text-input.component";
import { ButtonComponent } from "./shared/components/button/button.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { PageTitleComponent } from "./shared/components/page-title/page-title.component";

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet, PageTitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fatmeh-kassab-academy-project';


}

