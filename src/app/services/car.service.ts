import { Injectable } from '@angular/core';
import { Car } from '../models/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [
    {
      id: 1,
      name: 'Renault Clio',
      image: 'assets/bm.jpg',
      price: 10000,
      specifications: 'SUV',
      rating: 5.0,
      description: 'Location Renault Clio très confortable.',
      zones: ['Dakar', 'Thiès'],
      options: ['Audio input', 'Gps', 'Radio', 'Wifi'],
      isFavorite: false,
      marques: ['Renault'] // ✅ tableau
    },
    {
      id: 2,
      name: 'Peugeot 208',
      image: 'assets/vb.jpg',
      price: 40000,
      specifications: 'Berline',
      rating: 4.5,
      description: 'Location Peugeot 208 très confortable.',
      zones: ['Dakar', 'Thiès'],
      options: ['Audio input', 'Gps', 'Radio', 'Wifi'],
      isFavorite: false,
      marques: ['Peugeot']
    },
    {
      id: 3,
      name: 'Audi A3',
      image: 'assets/jaune.webp',
      price: 7000,
      specifications: 'Citadine',
      rating: 5.0,
      description: 'Location Audi A3 très confortable.',
      zones: ['Dakar', 'Thiès'],
      options: ['Audio input', 'Gps'],
      isFavorite: false,
      marques: ['Audi']
    },
    {
      id: 4,
      name: 'BMW X1',
      image: 'assets/p.avif',
      price: 90000,
      specifications: 'SUV',
      rating: 5.0,
      description: 'Location BMW X1 très confortable.',
      zones: ['Dakar', 'Thiès'],
      options: ['Audio input', 'Gps'],
      isFavorite: false,
      marques: ['BMW']
    }
  ];

  private readonly FAVORITES_KEY = 'car_favorites';

  constructor() {
    this.loadFavoritesFromStorage();
  }

  // --- Voitures ---
  getAllCars(): Car[] {
    return this.cars;
  }

  getCarById(id: number): Car | undefined {
    return this.cars.find(car => car.id === id);
  }

  getFavoriteCars(): Car[] {
    return this.cars.filter(car => car.isFavorite);
  }

  // --- Filtres dynamiques ---
  getAllTypes(): string[] {
    return [...new Set(this.cars.map(car => car.specifications))].sort();
  }

  getAllMarques(): string[] {
    return [...new Set(
      this.cars.reduce((acc: string[], car: Car) => acc.concat(car.marques || []), [])
    )].sort();
  }

  getAllPrix(): number[] {
    return [...new Set(this.cars.map(car => car.price))].sort((a, b) => a - b);
  }

  // --- Favoris ---
  toggleFavorite(carId: number): void {
    const car = this.cars.find(c => c.id === carId);
    if (car) {
      car.isFavorite = !car.isFavorite;
      this.saveFavoritesToStorage();
    }
  }

  addToFavorites(carId: number): void {
    const car = this.cars.find(c => c.id === carId);
    if (car && !car.isFavorite) {
      car.isFavorite = true;
      this.saveFavoritesToStorage();
    }
  }

  removeFromFavorites(carId: number): void {
    const car = this.cars.find(c => c.id === carId);
    if (car && car.isFavorite) {
      car.isFavorite = false;
      this.saveFavoritesToStorage();
    }
  }

  // --- LocalStorage ---
  private saveFavoritesToStorage(): void {
    const favorites = this.cars.filter(car => car.isFavorite).map(car => car.id);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  private loadFavoritesFromStorage(): void {
    const storedFavorites = localStorage.getItem(this.FAVORITES_KEY);
    if (storedFavorites) {
      const favoriteIds: number[] = JSON.parse(storedFavorites);
      favoriteIds.forEach(id => {
        const car = this.cars.find(c => c.id === id);
        if (car) car.isFavorite = true;
      });
    }
  }
}
