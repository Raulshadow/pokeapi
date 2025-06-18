import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonItem, IonSearchbar } from '@ionic/angular/standalone';
import { HttpService } from '../../services/http.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  templateUrl: 'pokedex.page.html',
  styleUrls: ['pokedex.page.scss'],
  imports: [NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonItem, IonSearchbar, FormsModule]
})
export class PokedexPage implements OnInit {
  private httpService = inject(HttpService); // Injetando o serviço HTTP para fazer requisições à PokeAPI.
  public allPokemons: any[] = [];
  public filtredPokemons: any[] = [];
  public searchTerm: string = '';

  constructor(
  ) {}

  private getPokemons() {
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

  ngOnInit() {
    // Método de inicialização da pokedex page, onde é feito o carregamento dos pokémons.
    this.getPokemons();
  }

  onSearchChange() {
    // Método chamado quando o usuário digita na barra de pesquisa.
    const searchTerm = this.searchTerm.toLowerCase(); // Obtém o termo de pesquisa em minúsculas.
    this.filtredPokemons = this.allPokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm) || pokemon.id.toString() === searchTerm  // Filtrando pokemons por nome ou número da Pokédex.
    );
  }
}
