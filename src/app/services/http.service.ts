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

  getPokemonByName(name: string) {
    // Esse método serve para buscar um pokémon específico pelo nome.
    return this.http.get(`${this.api}/pokemon/${name}`);
  }
}
