import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.page').then( m => m.PokemonDetailPage)
  },
];
