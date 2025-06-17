import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient);

  constructor() { }

  getPokemon() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200');
  } 
}
