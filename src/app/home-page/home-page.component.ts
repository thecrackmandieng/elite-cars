import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,

  IonButtons, IonRadio } from "@ionic/angular/standalone";

import { CarService } from '../services/car.service';
import { Car } from '../models/car.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [IonRadio,
    CommonModule,
    FormsModule,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonModal,
    IonList,
    IonItem,
    IonLabel

  ],
})
export class HomePageComponent implements OnInit {
  cars: Car[] = [];

  typesVehicules: string[] = [];
  marques: string[] = [];
  prixs: number[] = [];

  // ✅ plusieurs sélections possibles
  selectedType: string[] = [];
  selectedMarque: string[] = [];
  selectedPrix: number[] = [];

  searchType: string = '';
  searchMarque: string = '';
  searchPrix: string = '';

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.cars = this.carService.getAllCars();

    this.typesVehicules = Array.from(new Set(this.cars.map(car => car.specifications))).sort();
    this.marques = Array.from(new Set(this.cars.map(car => car.name))).sort();
    this.prixs = Array.from(new Set(this.cars.map(car => car.price))).sort((a, b) => a - b);
  }

  onCarClick(car: Car) {
    window.location.href = `/example/car-detail/${car.id}`;
  }

  toggleFavorite(car: Car, event: Event) {
    event.stopPropagation();
    this.carService.toggleFavorite(car.id);
    car.isFavorite = !car.isFavorite;
  }

  // ✅ Gestion des checkboxes
  toggleSelection(list: any[], value: any) {
    if (list.includes(value)) {
      list.splice(list.indexOf(value), 1); // décocher
    } else {
      list.push(value); // cocher
    }
  }
  selectMarque(marque: string) {
    if (this.selectedMarque.includes(marque)) {
      this.selectedMarque = this.selectedMarque.filter(m => m !== marque);
    } else {
      this.selectedMarque.push(marque);
    }
  }

  selectPrix(prix: number) {
    if (this.selectedPrix.includes(prix)) {
      this.selectedPrix = this.selectedPrix.filter(p => p !== prix);
    } else {
      this.selectedPrix.push(prix);
    }
  }
selectType(type: string) {
    if (this.selectedType.includes(type)) {
      this.selectedType = this.selectedType.filter(t => t !== type);
    } else {
      this.selectedType.push(type);
    }
  }

  // ✅ Filtrage multi-sélections
  get filteredCars(): Car[] {
    let filtered = this.cars;

    if (this.selectedType.length > 0) {
      filtered = filtered.filter(car =>
        this.selectedType.some(type => car.specifications?.includes(type))
      );
    }

    if (this.selectedMarque.length > 0) {
      filtered = filtered.filter(car =>
        this.selectedMarque.some(marque => car.name?.includes(marque))
      );
    }

    if (this.selectedPrix.length > 0) {
      const maxPrix = Math.max(...this.selectedPrix);
      filtered = filtered.filter(car => car.price <= maxPrix);
    }

    return filtered;
  }


  filterList(items: string[], search: string) {
    if (!search) return items;
    return items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
  }
}
