import { Component, OnInit, inject } from '@angular/core';
import { IonButton, IonIcon, IonCardTitle, IonCardHeader, IonCol, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonSearchbar } from '@ionic/angular/standalone';
import { HttpService } from '../../services/http.service';
import { NgFor, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: 'pokedex.page.html',
  styleUrls: ['pokedex.page.scss'],
  imports: [IonButton, IonIcon, TitleCasePipe, NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonSearchbar, FormsModule, RouterLink, IonCardHeader, IonCol, IonCardTitle]
})
export class PokedexPage implements OnInit {
  private httpService = inject(HttpService); // Injetando o serviço HTTP para fazer requisições à PokeAPI.

  public allPokemons: any[] = [];
  public filtredPokemons: any[] = [];
  public searchTerm: string = '';
  public favorites: string[] = [];

  constructor(
  ) {}

  private getPokemons() { // Captura os dados de todos os pokémons.
    this.httpService.getAllPokemonSimpleForm().subscribe((data: any) => {
      this.allPokemons = data.results.map((pokemon: any, index: number) => {
        const id = index + 1; // Atribuindo id ao pokemon, se a ordem da API estiver correta, também conta como o número da Pokédex.
        return {
          id: id,
          name: pokemon.name,
          url: pokemon.url,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` // URL da imagem do Pokémon. Será carregada para próxima página para exibir mais informações.
        }

      });
      this.filtredPokemons = this.allPokemons; // Inicializa a lista filtrada com todos os pokémons.
    });
  }

  private loadFavorites() { // Guardar os pokémons favoritos no armazenamento local, para garantir que seja salvo para cada usuário, o ideal seria utilizar cookies ou um BD mas na situação essa é a melhor.
    const stored = localStorage.getItem('favoritePokemons');
    this.favorites = stored ? JSON.parse(stored) : [];
  }

  private saveFavorites() { // Salvar no armazenamento local como uma string em formato json.
    localStorage.setItem('favoritePokemons', JSON.stringify(this.favorites));
  }

  ngOnInit() {
    // Métodos de inicialização da pokedex page, onde é feito o carregamento dos pokémons e favoritos.
    this.getPokemons();
    this.loadFavorites();
  }

  onSearchChange() {
    // Método chamado quando o usuário digita na barra de pesquisa.
    const searchTerm = this.searchTerm.toLowerCase(); // Obtém o termo de pesquisa em minúsculas.
    this.filtredPokemons = this.allPokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm) || pokemon.id.toString() === searchTerm  // Filtrando pokemons por nome ou número da Pokédex.
    );
  }

  toggleFavorite(pokemonName: string) {
    console.log(pokemonName);
    const index = this.favorites.indexOf(pokemonName);
    if (index > -1) {
      this.favorites.splice(index,1); // caso ele esteja na lista, significa que a pessoa esta tirando, logo, retira o nome do pokémon.
    } else {
      this.favorites.push(pokemonName); // caso não seja encontrado, então ele tem que ser adicionado na lista.
    }

    this.saveFavorites(); // salvar no armazenamento local
  }

  isFavorite(pokemonName:string): boolean { // Ccheca se o pokémon está salvo como favorito no armazenamento.
    return this.favorites.includes(pokemonName);
  }
}
