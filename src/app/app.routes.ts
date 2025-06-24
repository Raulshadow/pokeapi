import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'region/:name',
    loadComponent: () => import('./pages/region-detail/region-detail.page').then( m => m.RegionDetailPage)
  },

];
