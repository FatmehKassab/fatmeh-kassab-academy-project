import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent implements OnInit {
  title: string = '';
  shouldShowTitle: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.getDeepestChild(this.activatedRoute);
        this.title = route.snapshot.data['title'] || '';

        const currentUrl = this.router.url;
        const excludedRoutes = ['/sign-in', '/sign-up', '/home'];

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
