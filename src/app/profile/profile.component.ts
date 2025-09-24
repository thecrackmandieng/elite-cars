import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonTabs,
  IonTabBar,
  IonTabButton
} from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

import { addIcons } from 'ionicons';
import { home, heart, search, person, chevronForward, shareOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonLabel,
    CommonModule
  ]
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) {
    addIcons({
      home,
      heart,
      search,
      person,
      chevronForward,
      shareOutline
    });
  }

  ngOnInit() {}

  onMenuItemClick(item: string) {
    switch(item) {
      case 'settings':
        console.log('Navigate to settings');
        // TODO: Navigate to settings page
        break;
      case 'history':
        console.log('Navigate to history');
        // TODO: Navigate to history page
        break;
      case 'about':
        console.log('Navigate to about');
        // TODO: Navigate to about page
        break;
      case 'delete':
        console.log('Navigate to delete account');
        // TODO: Navigate to delete account page
        break;
    }
  }

  onTabClick(tabName: string) {
    switch(tabName) {
      case 'home':
        this.router.navigate(['/example/home']);
        break;
      case 'favorites':
        this.router.navigate(['/example/favorites']);
        break;
      case 'search':
        this.router.navigate(['/example/search']);
        break;
      case 'profile':
        this.router.navigate(['/example/profile']);
        break;
    }
  }
}
