import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
  standalone: true,
  imports: [NgFor, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonList, IonItem, IonAvatar],
})
export class GamesPage implements OnInit {
  private httpService = inject(HttpService);
  public gamesVersions: any[] = [];

  constructor() {}

  ngOnInit() {
    this.getAllGames();
  }

  private getAllGames() {
    this.httpService.getAllPokemonGames().subscribe((data: any) => {
      this.gamesVersions = data.results.filter(
        (game: { name: string; url: string }) => {
          const name = game.name.toLowerCase();
          return !name.startsWith('the') && !name.includes('japan');
        }
      );
    });
  }

  formatGameName(name: string): string {
    return 'Pokémon ' + name.replace(/-/g, ' ');
  }

  getGameImage(name: string): string {
    // Retornando o caminho da imagem representativa da região.
    return `assets/games/${name}.jpg`;
  }
}
