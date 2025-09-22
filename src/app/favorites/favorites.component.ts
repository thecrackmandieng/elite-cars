import { Component, OnInit } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonContent, IonIcon } from "@ionic/angular/standalone";
import { CarService } from '../services/car.service';
import { Car } from '../models/car.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, IonContent, CommonModule, IonIcon],
})
export class FavoritesComponent implements OnInit {
  favoriteCars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.loadFavoriteCars();
  }

  loadFavoriteCars() {
    this.favoriteCars = this.carService.getFavoriteCars();
  }

  onCarClick(car: Car) {
    // Navigate to car detail page with car ID
    window.location.href = `/example/car-detail/${car.id}`;
  }

  toggleFavorite(car: Car) {
    this.carService.toggleFavorite(car.id);
    this.loadFavoriteCars(); // Refresh the list
  }
}
