import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  formatName(name: string | null | undefined): string { // Lembrar de alterar GameUtils para retirar a função e utilizar somente essa.
    if (!name) return 'Desconhecido';
    return name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }
}
