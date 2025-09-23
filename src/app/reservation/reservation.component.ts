import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.interface';
import { Reservation } from '../models/reservation.interface';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonBackButton,
         IonButtons, IonRadioGroup, IonRadio, IonItem, IonLabel, IonFooter, IonInput,
         IonModal, IonDatetime, IonDatetimeButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: true,
  imports: [
    IonFooter, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonBackButton, IonButtons, IonRadioGroup, IonRadio,
    IonInput, IonModal, IonDatetime, IonDatetimeButton, CommonModule, FormsModule
  ]
})
export class ReservationComponent implements OnInit {

  car: Car | undefined;
  isDateModalOpen = false;
  selectedDateType: 'start' | 'end' | null = null;
  reservation: Reservation = {
    carId: 0,
    withDriver: false,
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    startTime: '09:55',
    endTime: '09:55',
    paymentMethod: 'wave',
    downPayment: 10,
    totalPrice: 0,
    startDateDisplay: '',
    endDateDisplay: ''
  };

  driverOptions = [
    { id: 'without', label: 'Sans Chauffeur', price: 20000 },
    { id: 'with', label: 'Avec Chauffeur', price: 30000 }
  ];

  downPaymentOptions = [
    { percentage: 10, amount: 2000 },
    { percentage: 30, amount: 6000 }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.carService.getCarById(id);
    if (this.car) {
      this.reservation.carId = this.car.id;
      this.reservation.startDateDisplay = this.formatDate(this.reservation.startDate);
      this.reservation.endDateDisplay = this.formatDate(this.reservation.endDate);
      this.calculateTotal();
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('fr-FR', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  openDateModal(type: 'start' | 'end') {
    this.selectedDateType = type;
    this.isDateModalOpen = true;
  }

  closeDateModal() {
    this.isDateModalOpen = false;
    this.selectedDateType = null;
  }

  onDateSelected(event: any) {
    const selectedDate = new Date(event.detail.value);
    if (this.selectedDateType === 'start') {
      this.reservation.startDate = selectedDate;
    } else if (this.selectedDateType === 'end') {
      this.reservation.endDate = selectedDate;
    }
    this.onDateChange();
    this.closeDateModal();
  }

  calculateTotal() {
    if (!this.car) return;
    const days = Math.ceil((this.reservation.endDate.getTime() - this.reservation.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const basePrice = this.car.price * days;
    const driverPrice = this.reservation.withDriver ? this.driverOptions[1].price * days : 0;
    this.reservation.totalPrice = basePrice + driverPrice;
  }

  onDriverOptionChange() {
    this.calculateTotal();
  }

  onDateChange() {
    this.reservation.startDateDisplay = this.formatDate(this.reservation.startDate);
    this.reservation.endDateDisplay = this.formatDate(this.reservation.endDate);
    this.calculateTotal();
  }

  onNext() {
    console.log('Reservation data:', this.reservation);
    this.router.navigate(['/example/confirmation']);
  }

  onBack() {
    this.router.navigate(['/example/car-detail', this.car?.id]);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getDuration(): number {
    if (!this.reservation.startDate || !this.reservation.endDate) return 0;
    return Math.ceil((this.reservation.endDate.getTime() - this.reservation.startDate.getTime()) / (1000 * 60 * 60 * 24));
  }
}
