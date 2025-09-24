import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.interface';
import { Reservation } from '../models/reservation.interface';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
         IonButtons, IonRadioGroup, IonRadio, IonItem, IonLabel, IonFooter, IonInput,
         IonModal, IonDatetime } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: true,
  imports: [
    IonFooter, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonRadioGroup, IonRadio,
    IonInput, IonDatetime, CommonModule, FormsModule
  ]
})
export class ReservationComponent implements OnInit, OnDestroy {

  @ViewChild('nextButton', { static: false }) nextButton!: ElementRef<HTMLIonButtonElement>;
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  car: Car | undefined;
  showStartDatePicker = false;
  showEndDatePicker = false;
  private subscriptions: Subscription[] = [];
  private isNavigating = false;

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

  toggleStartDatePicker() {
    this.showStartDatePicker = !this.showStartDatePicker;
    if (this.showStartDatePicker) {
      this.showEndDatePicker = false;
    }
  }

  toggleEndDatePicker() {
    this.showEndDatePicker = !this.showEndDatePicker;
    if (this.showEndDatePicker) {
      this.showStartDatePicker = false;
    }
  }

  onStartDateSelected(event: any) {
    const selectedDate = new Date(event.detail.value);
    this.reservation.startDate = selectedDate;
    this.showStartDatePicker = false;
    this.onDateChange();
  }

  onEndDateSelected(event: any) {
    const selectedDate = new Date(event.detail.value);
    this.reservation.endDate = selectedDate;
    this.showEndDatePicker = false;
    this.onDateChange();
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

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getDuration(): number {
    if (!this.reservation.startDate || !this.reservation.endDate) return 0;
    return Math.ceil((this.reservation.endDate.getTime() - this.reservation.startDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Focus management methods
  ionViewWillEnter() {
    // Set focus to first interactive element when entering the page
    setTimeout(() => {
      const firstButton = document.querySelector('ion-button');
      if (firstButton instanceof HTMLElement) {
        firstButton.focus();
      }
    }, 100);
  }

  ionViewWillLeave() {
    // Clear focus from any focused elements before leaving
    this.clearFocus();
    this.isNavigating = true;
  }

  private clearFocus() {
    // Remove focus from any currently focused element
    if (document.activeElement && document.activeElement instanceof HTMLElement) {
      (document.activeElement as HTMLElement).blur();
    }
  }

  onNext() {
    // Clear focus before navigation to prevent aria-hidden issues
    this.clearFocus();
    this.isNavigating = true;

    console.log('Reservation data:', this.reservation);
    this.router.navigate(['/example/confirmation'], {
      state: {
        reservationData: this.reservation,
        car: this.car,
        carId: this.reservation.carId,
        totalPrice: this.reservation.totalPrice
      }
    });
  }

  onBack() {
    // Clear focus before navigation to prevent aria-hidden issues
    this.clearFocus();
    this.isNavigating = true;

    this.router.navigate(['/example/car-detail', this.car?.id]);
  }
}
