import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon
} from "@ionic/angular/standalone";
import { CarService } from '../services/car.service';
import { Car } from '../models/car.interface';
import { addIcons } from 'ionicons';
import { car, star } from 'ionicons/icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonIcon
  ],
})
export class SearchComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  selectedBrand: string = 'Tout';
  brands: string[] = [];
  allBrands: string[] = [];

  constructor(private carService: CarService) {
    addIcons({ car, star });
  }

  ngOnInit() {
    this.cars = this.carService.getAllCars();
    this.brands = this.carService.getAllMarques();
    this.allBrands = ['Tout', ...this.brands];
    this.filteredCars = [...this.cars];
  }

  onBrandClick(brand: string) {
    this.selectedBrand = brand;

    if (brand === 'Tout') {
      this.filteredCars = [...this.cars];
    } else {
      // ✅ correction : utiliser includes car marques est un tableau
      this.filteredCars = this.cars.filter(car => car.marques.includes(brand));
    }
  }

  onCarClick(car: Car) {
    window.location.href = `/example/car-detail/${car.id}`;
  }

  toggleFavorite(car: Car, event: Event) {
    event.stopPropagation();
    this.carService.toggleFavorite(car.id);
    car.isFavorite = !car.isFavorite;
  }

  trackByFn(index: number, item: Car): number {
    return item.id;
  }
}
