import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);
  private api = 'https://pokeapi.co/api/v2'

  constructor() { }

  getAllPokemonSimpleForm(limit: number = 1025) {
    // Esse método serve para buscar todos os pokémons de forma direta, pegando a versão base deles, sem mega evoluções ou outras variações.
    return this.http.get(`${this.api}/pokemon?limit=${limit}`);
  }

  getPokemonDescription(name:string) {
    // Esse método serve para buscar a descrição da pokédex baseado no nome do pokémon, é possível que ele possa ter a versão em português
    return this.http.get(`${this.api}/pokemon-species/${name}`);
  }

  getAllPokemonGames(limit: number = 25) {
    // Esse método serve para buscar todos os as versões dos jogos da franquia evitando pegar as últimas dlcs e versões japonesas. Infelizmente ele ainda vem com dlcs e spinoffs, tratar no games.ps.
    return this.http.get(`${this.api}/version-group?limit=${limit}`);
  }

  getGameDetail(name: string) {
    // Esse método serve para auxiliar e pegar os detalhes da versão do grupo.
    return this.http.get(`${this.api}/version-group/${name}`)
  }

  getPokemonByName(name: string) {
    // Esse método serve para buscar um pokémon específico pelo nome.
    return this.http.get(`${this.api}/pokemon/${name}`);
  } 

  getAllRegions() {
    // Esse método serve para buscar todas as regiões da PokeAPI.
    return this.http.get(`${this.api}/region`);
  }

  getRegionDetail(name: string) {
    // Esse método serve para auxiliar e pegar os detalhes da Região.
    return this.http.get(`${this.api}/region/${name}`);
  }
}
