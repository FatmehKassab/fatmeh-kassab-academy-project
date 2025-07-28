import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { ICONS } from '../../utils/icons';
import { ProductService } from '../../services/product.service';
import { TitleService } from '../../services/title.service';


@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent implements OnInit {
  mainTitle: string = '';  
  dynamicTitle: string = ''; 
  shouldShowTitle: boolean = true;

  ICONS = ICONS;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private customTitleService: TitleService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.getDeepestChild(this.activatedRoute);
        const dataTitle = route.snapshot.data['title'];
 this.customTitleService.mainTitle$.subscribe(title => this.mainTitle = title);
    this.customTitleService.dynamicTitle$.subscribe(title => this.dynamicTitle = title);
        if (typeof dataTitle === 'string') {

          this.mainTitle = dataTitle;
          this.dynamicTitle = '';
        } else if (typeof dataTitle === 'object') {

          this.mainTitle = dataTitle.main;
          this.dynamicTitle = dataTitle.dynamic;
        }

        const currentUrl = this.router.url;
        const excludedRoutes = ['/sign-in', '/sign-up', '/home','/admin'];
        this.shouldShowTitle = !excludedRoutes.includes(currentUrl);
      });
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
