import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-active-tab',
   changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor],
  templateUrl: './active-tab.component.html',
  styleUrl: './active-tab.component.scss'
})
export class ActiveTabComponent implements OnInit {
  @Input() activeTab: string = 'account';
  @Output() tabChanged = new EventEmitter<string>();

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  tabs = [
    { key: 'account', title: 'Account Setting', subtitle: 'Personal information & Address' },
    { key: 'privacy', title: 'Privacy & Security', subtitle: 'Change password' },
    { key: 'deactivate', title: 'Deactivate Account', subtitle: 'Delete Account' },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tab = params['tab'];
      if (tab) {
        this.activeTab = tab;
        this.tabChanged.emit(tab); 
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { tab: this.activeTab },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.tabChanged.emit(tab); 
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
  }
}
