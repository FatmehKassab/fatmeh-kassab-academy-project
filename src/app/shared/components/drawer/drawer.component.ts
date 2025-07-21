import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { DrawerService } from '../../services/drawer.service';
@Component({
  selector: 'app-drawer',
  imports: [DrawerModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  visible: boolean = false;
 constructor(private drawerService: DrawerService) {}

  ngOnInit() {
    this.drawerService.drawerVisible$.subscribe(visible => {
      this.visible = visible;
    });
  }
}
