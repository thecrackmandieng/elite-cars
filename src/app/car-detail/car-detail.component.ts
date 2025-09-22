import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.interface';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonBackButton, IonButtons, CommonModule, RouterModule]
})
export class CarDetailComponent implements OnInit {
  car: Car | undefined;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.carService.getCarById(id);
  }

  onReserve() {
    // TODO: Implement reservation logic
    console.log('Réservation demandée pour:', this.car?.name);
  }
}
