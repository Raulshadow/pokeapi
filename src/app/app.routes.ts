import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'game/:name',
    loadComponent: () => import('./pages/game-detail/game-detail.page').then( m => m.GameDetailPage)
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.page').then( m => m.PokemonDetailPage)
  },
  {
    path: 'region/:name',
    loadComponent: () => import('./pages/region-detail/region-detail.page').then( m => m.RegionDetailPage)
  },
];
