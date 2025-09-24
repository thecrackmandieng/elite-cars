import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonItem,
  IonInput,
  IonFooter,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonButtons,
    IonItem,
    IonInput,
    CommonModule,
    FormsModule
  ]
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  @ViewChild('nextButton', { static: false }) nextButton!: ElementRef<HTMLIonButtonElement>;
  @ViewChild('firstNameInput', { static: false }) firstNameInput!: ElementRef<HTMLIonInputElement>;

  // Données du formulaire de confirmation
  userInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  };

  // Données de réservation passées depuis la page précédente
  reservationData: any = null;
  totalPrice: number = 0;
  carId: number | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer les données passées via navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.reservationData = navigation.extras.state;
      this.totalPrice = this.reservationData?.totalPrice || 0;
      this.carId = this.reservationData?.reservationData?.carId || this.reservationData?.carId || null;

      // Debug logging
      console.log('Navigation state received:', this.reservationData);
      console.log('Car ID extracted:', this.carId);
    } else {
      console.warn('No navigation state found');
      // Fallback: try to get carId from query params if available
      this.route.queryParams.subscribe(params => {
        if (params['carId']) {
          this.carId = Number(params['carId']);
        }
      });
    }
  }

  // Méthode pour valider l'email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Focus management methods
  ionViewWillEnter() {
    // Set focus to first input field when entering the page
    setTimeout(() => {
      const firstInput = document.querySelector('ion-input');
      if (firstInput) {
        (firstInput as any).setFocus();
      }
    }, 100);
  }

  ionViewWillLeave() {
    // Clear focus from any focused elements before leaving
    this.clearFocus();
  }

  private clearFocus() {
    // Remove focus from any currently focused element
    if (document.activeElement && document.activeElement instanceof HTMLElement) {
      (document.activeElement as HTMLElement).blur();
    }
  }

  onBack() {
    // Clear focus before navigation to prevent aria-hidden issues
    this.clearFocus();
    if (this.carId) {
      // Navigate back to reservation with the car ID
      this.router.navigate(['/example/reservation', this.carId]);
    } else {
      // Fallback navigation to home or car list
      console.warn('Car ID not available, navigating to home');
      this.router.navigate(['/example/home']);
    }
  }

  onNext() {
    // Clear focus before navigation to prevent aria-hidden issues
    this.clearFocus();

    // Validation des champs requis
    if (
      !this.userInfo.firstName ||
      !this.userInfo.lastName ||
      !this.userInfo.email ||
      !this.userInfo.phone ||
      !this.userInfo.password
    ) {
      console.log('Tous les champs sont requis');
      return;
    }

    // Validation email
    if (!this.isValidEmail(this.userInfo.email)) {
      console.log('Email invalide');
      return;
    }

    // Logique de soumission
    console.log('Données de confirmation:', {
      userInfo: this.userInfo,
      reservationData: this.reservationData
    });

    // Navigation vers la page suivante (ajuste selon besoin)
    // this.router.navigate(['/example/success']);
  }
}
