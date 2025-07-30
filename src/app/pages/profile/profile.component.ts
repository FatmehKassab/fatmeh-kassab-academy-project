import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
 activeTab: string = 'account';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
