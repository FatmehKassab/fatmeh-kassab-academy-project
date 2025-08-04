import { Component, inject, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { SearchDrawerService } from '../../services/searchDrawer.service';
import { DialogModule } from 'primeng/dialog';
import { SearchInputComponent } from "../inputs/search-input/search-input.component";

@Component({
  selector: 'app-search-drawer',
  imports: [DrawerModule, DialogModule, SearchInputComponent],
  templateUrl: './search-drawer.component.html',
  styleUrl: './search-drawer.component.scss'
})
export class SearchDrawerComponent implements OnInit {
  visible = false;

    constructor(
private searchDrawerService : SearchDrawerService
  ) {
    
  }


  ngOnInit(): void {
    console.log("drawerrrr")
    this.searchDrawerService.drawerVisible$.subscribe(visible => {
      this.visible = visible;
    });
  }

  onSearch(query: string) {
  console.log('Search:', query);
  // filter or fetch results
}

}
