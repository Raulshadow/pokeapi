import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpService } from 'src/app/services/http.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [RouterLink, NgFor, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavoritesPage {
  public favoritePokemons: any[] = [];
  private httpService = inject(HttpService);

  constructor() { }

  private loadFavorites()  { // Captura todos os pokémons favoritos do armazenamento local.
    const stored = localStorage.getItem('favoritePokemons');
    const favorites = stored ? JSON.parse(stored) : [];

    if(favorites.length === 0) {
      this.favoritePokemons = [];
      return;
    }

    this.httpService.getAllPokemonSimpleForm().subscribe((data: any) => { // podia realizar uma requisição para cada pokémon, contudo, isso para muitos pokémons poderiam demandar muito tempo, e por ser uma requisição rápida
      this.favoritePokemons = data.results.map((pokemon: any, index: number) => {
        const id = index + 1; // Atribuindo id ao pokemon, se a ordem da API estiver correta, também conta como o número da Pokédex.
        return {
          id: id,
          name: pokemon.name,
          url: pokemon.url,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` // URL da imagem do Pokémon. Será carregada para próxima página para exibir mais informações.
        }
      }).filter((pokemon: any)=> favorites.includes(pokemon.name));
    });
  }
  
  ionViewWillEnter() { // Isso carrega favoritos toda vez que a página entra em foco, pois com o ngOnInit não estava sendo carregado junto, somente quando recarregado
    this.loadFavorites();
  }

}
