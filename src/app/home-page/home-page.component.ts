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
  IonRadio,
  IonRadioGroup,
  IonSearchbar
} from "@ionic/angular/standalone";

import { CarService } from '../services/car.service';
import { Car } from '../models/car.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
  ],
})
export class HomePageComponent implements OnInit {
  cars: Car[] = [];

  typesVehicules: string[] = [];
  marques: string[] = [];
  prixs: number[] = [];

  selectedType: string | null = null;
  selectedMarque: string | null = null;
  selectedPrix: number | null = null;

  searchType: string = '';
  searchMarque: string = '';
  searchPrix: string = '';

  constructor(private carService: CarService) {}

  ngOnInit() {
    // Récupérer toutes les voitures
    this.cars = this.carService.getAllCars();

    // Récupérer dynamiquement les types, marques et prix
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

  selectType(type: string) {
    this.selectedType = type;
    this.closeModal('open-type');
  }

  selectMarque(marque: string) {
    this.selectedMarque = marque;
    this.closeModal('open-marque');
  }

  selectPrix(prix: number) {
    this.selectedPrix = prix;
    this.closeModal('open-prix');
  }

  private closeModal(triggerId: string) {
    const modal = document.querySelector(`ion-modal[trigger="${triggerId}"]`) as HTMLIonModalElement;
    modal?.dismiss();
  }

  // Filtrage des voitures
  get filteredCars(): Car[] {
    let filtered = this.cars;

    if (this.selectedType) {
      filtered = filtered.filter(car => car.specifications?.includes(this.selectedType!));
    }

    if (this.selectedMarque) {
      filtered = filtered.filter(car => car.name?.includes(this.selectedMarque!));
    }

    if (this.selectedPrix) {
      filtered = filtered.filter(car => car.price <= this.selectedPrix!);
    }

    return filtered;
  }

  // Méthode pour filtrer la recherche dans le modal
  filterList(items: string[], search: string) {
    if (!search) return items;
    return items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
  }
}
