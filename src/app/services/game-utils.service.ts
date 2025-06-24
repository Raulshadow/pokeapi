import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameUtilsService {
  // Como irei utilizar a imagem e a função de formatação de nome, coloquei para ser um serviço padrão para games.
  constructor() { }

  formatName(name: string): string {
    return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Usando no lugar do titlecase pois repete várias vezes o nome, ent economia de código.
  }

  getGameImage(name: string): string {
    // Retornando o caminho da imagem representativa da região.
    return `assets/games/${name}.jpg`;
  }
}
