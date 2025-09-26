import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonCheckbox,
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
    IonButtons,
    IonCheckbox,
    IonSearchbar
  ],
})
export class HomePageComponent implements OnInit {
  @ViewChild('modalType', { static: false }) modalType: any;
  @ViewChild('modalMarque', { static: false }) modalMarque: any;
  @ViewChild('modalPrix', { static: false }) modalPrix: any;

  cars: Car[] = [];
  typesVehicules: string[] = [];
  marques: string[] = [];
  prixs: number[] = [];
  selectedType: string[] = [];
  selectedMarque: string[] = [];
  selectedPrix: number[] = [];
  searchType: string = '';
  searchMarque: string = '';
  searchPrix: string = '';
  filteredTypesVehicules: string[] = [];
  filteredMarques: string[] = [];
  filteredPrixs: number[] = [];
  canDismiss: boolean = true;
  presentingElement: any = null;

  constructor(private carService: CarService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    this.presentingElement = await document.querySelector('ion-content');
    this.cars = this.carService.getAllCars();
    this.typesVehicules = this.carService.getAllTypes();
    this.marques = this.carService.getAllMarques();
    this.prixs = this.carService.getAllPrix();
    this.updateFilteredData();
    console.log('Cars loaded:', this.cars);
    console.log('Types:', this.typesVehicules);
    console.log('Marques:', this.marques);
    console.log('Prixs:', this.prixs);
  }

  // Méthodes pour ouvrir les modals
  async toggleType() {
    await this.modalType.present();
  }

  async toggleMarque() {
    await this.modalMarque.present();
  }

  async togglePrix() {
    await this.modalPrix.present();
  }

  onCarClick(car: Car) {
    window.location.href = `/example/car-detail/${car.id}`;
  }

  toggleFavorite(car: Car, event: Event) {
    event.stopPropagation();
    this.carService.toggleFavorite(car.id);
    car.isFavorite = !car.isFavorite;
  }

  toggleSelection(list: any[], value: any) {
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
  }

  selectType(type: string) {
    this.toggleSelection(this.selectedType, type);
    this.updateFilteredData();
  }

  selectMarque(marque: string) {
    this.toggleSelection(this.selectedMarque, marque);
    this.updateFilteredData();
  }

  selectPrix(prix: number) {
    this.toggleSelection(this.selectedPrix, prix);
    this.updateFilteredData();
  }

  onSearchTypeChange(): void {
    this.updateFilteredData();
  }

  onSearchMarqueChange(): void {
    this.updateFilteredData();
  }

  onSearchPrixChange(): void {
    this.updateFilteredData();
  }

  updateFilteredData(): void {
    this.filteredTypesVehicules = this.filterList(this.typesVehicules, this.searchType);
    this.filteredMarques = this.filterList(this.marques, this.searchMarque);
    this.filteredPrixs = !this.searchPrix
      ? [...this.prixs]
      : this.prixs.filter(prix => prix.toString().includes(this.searchPrix));
    this.cdr.detectChanges();
  }

  filterList(items: string[], search: string): string[] {
    if (!search) return [...items];
    return items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  get filteredCars(): Car[] {
    let filtered = [...this.cars];
    if (this.selectedType.length > 0) {
      filtered = filtered.filter(car =>
        this.selectedType.some(type => car.specifications?.includes(type))
      );
    }
    if (this.selectedMarque.length > 0) {
      filtered = filtered.filter(car =>
        this.selectedMarque.some(marque => car.marques?.includes(marque))
      );
    }
    if (this.selectedPrix.length > 0) {
      const maxPrix = Math.max(...this.selectedPrix);
      filtered = filtered.filter(car => car.price <= maxPrix);
    }
    return filtered;
  }
}
