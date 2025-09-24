import { Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';

export const routes: Routes = [
  {
    path: 'example',
    component: ExampleComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home-page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./favorites/favorites.component').then((m) => m.FavoritesComponent),
      },
      {
        path: 'car-detail/:id',
        loadComponent: () =>
          import('./car-detail/car-detail.component').then((m) => m.CarDetailComponent),
      },
      {
        path: 'reservation/:id',
        loadComponent: () =>
          import('./reservation/reservation.component').then((m) => m.ReservationComponent),
      },
      {
        path: 'confirmation',
        loadComponent: () =>
          import('./reservation/confirmation.component').then((m) => m.ConfirmationComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./search/search.component').then((m) => m.SearchComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: '',
        redirectTo: '/example/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/example/home',
    pathMatch: 'full',
  },
];

// Additional routes for tabs
export const tabRoutes: Routes = [
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
];
