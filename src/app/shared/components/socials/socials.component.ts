import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss',
  standalone: true,
  imports:[NgIf]

})
export class SocialsComponent {
  @Input() iconPath: string = '';
  @Input() altText: string = 'icon';
  @Input() isDropdown: boolean = false;
  @Input() dropdownContent: TemplateRef<any> | null = null;
  @Output() iconClick = new EventEmitter<void>();
  @Input() badgeValue: string | number | null = null;
  @Input() showBadge: boolean = false;
 

 firstName: string = '';
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;

constructor(    private authService: AuthService){
  
}


  showDropdown = false;


  onClick() {
    this.iconClick.emit();
    if (this.isDropdown) {
      this.showDropdown = !this.showDropdown;
    }
  }

    ngOnInit(): void {
       this.authService.isLoggedIn().subscribe((loggedIn) => {
    this.isLoggedIn = loggedIn;
 const user = this.authService.getUserData();
  this.firstName = user?.given_name ?? 'User';

    

  });
  }
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

    logout() {
   this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }

}
