import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextInputComponent } from "./shared/components/inputs/text-input/text-input.component";
import { ButtonComponent } from "./shared/components/button/button.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TextInputComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fatmeh-kassab-academy-project';
   username: string = '';
  password: string = '';
  email: string = '';
  
  handleSubmit(): void {
  console.log('Button clicked!');
}

}

