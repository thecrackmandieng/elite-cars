import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonIcon, IonTabBar, IonTabButton, IonTabs, LoadingController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import { addIcons } from 'ionicons';
import { home, heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.scss'],
  standalone: true,
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs, RouterModule, CommonModule],
})
export class ExampleComponent implements OnInit {
  shouldHideTabs: boolean = false;

  constructor(
    private loadingController: LoadingController,
    private router: Router
  ) {
    addIcons({ home, favorite: heart, heart, 'heart-outline': heartOutline });
  }

  ngOnInit() {
    // Check initial route
    this.updateTabVisibility(this.router.url);

    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateTabVisibility(event.url);
      });
  }

  private updateTabVisibility(url: string) {
    // Hide tabs for reservation and confirmation pages
    this.shouldHideTabs = url.includes('/reservation') || url.includes('/confirmation');
  }

  // Handle tab navigation
  onTabClick(tabName: string) {
    if (tabName === 'favorites') {
      this.router.navigate(['/example/favorites']);
    } else if (tabName === 'home') {
      this.router.navigate(['/example/home']);
    } else if (tabName === 'search') {
      this.router.navigate(['/example/search']);
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'crescent'
    });

    await loading.present();
  }
}
