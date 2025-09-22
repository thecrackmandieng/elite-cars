import { Component } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs, LoadingController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

import { addIcons } from 'ionicons';
import { home, heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.scss'],
  standalone: true,
  imports: [ IonIcon, IonTabBar, IonTabButton, IonTabs, RouterModule],
})
export class ExampleComponent {
  constructor(private loadingController: LoadingController) {
    addIcons({ home, favorite: heart, heart, 'heart-outline': heartOutline });
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
