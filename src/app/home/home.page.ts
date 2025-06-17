import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonItem } from '@ionic/angular/standalone';
import { HttpService } from '../services/http.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonItem],
})
export class HomePage implements OnInit {
  private httpService = inject(HttpService);
  public pokemons: any[] = [];

  constructor(
  ) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.httpService.getPokemon().subscribe((data: any) => {
      this.pokemons = data.results;
    });
  }

  showPokemonDetails(id: number) {
    console.log('ID selecionado:', id);
  }
}
