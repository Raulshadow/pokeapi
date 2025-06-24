import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegionUtilsService {

  constructor() { }
  getGameImage(name: string): string {
    // Retornando o caminho da imagem representativa da região.
    return `assets/maps/${name}.png`;
  }
}
