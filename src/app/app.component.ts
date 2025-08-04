import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextInputComponent } from "./shared/components/inputs/text-input/text-input.component";
import { ButtonComponent } from "./shared/components/button/button.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { PageTitleComponent } from "./shared/components/page-title/page-title.component";
import { DrawerComponent } from "./shared/components/drawer/drawer.component";
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { Toast } from "primeng/toast";
import { SearchDrawerComponent } from './shared/components/search-drawer/search-drawer.component';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet, PageTitleComponent, DrawerComponent, NavbarComponent, FooterComponent, Toast,SearchDrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fatmeh-kassab-academy-project';


}

