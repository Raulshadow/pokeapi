import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pokedex',
        loadComponent: () =>
          import('../pages/pokedex/pokedex.page').then((m) => m.PokedexPage),
      },
      {
        path: 'regions',
        loadComponent: () =>
          import('../pages/regions/regions.page').then((m) => m.RegionsPage),
      },
      {
        path: 'games',
        loadComponent: () =>
          import('../pages/games/games.page').then((m) => m.GamesPage),
      },
      {
        path: 'favorites',
        loadComponent: () => 
          import('../pages/favorites/favorites.page').then( m => m.FavoritesPage)
      },
      {
        path: '',
        redirectTo: '/tabs/pokedex',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/pokedex',
    pathMatch: 'full',
  },
];
