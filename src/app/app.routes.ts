import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'game/:id',
    loadComponent: () => import('./pages/game-detail/game-detail.page').then( m => m.GameDetailPage)
  },

];
