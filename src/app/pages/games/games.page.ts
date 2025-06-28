import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { RouterLink } from '@angular/router';
import { GameUtilsService } from 'src/app/services/game-utils.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
  standalone: true,
  imports: [NgFor, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonList, IonItem, IonAvatar, RouterLink],
})
export class GamesPage implements OnInit { // Página de listagem de jogos-versões, evitando exibir duplicatas japonesas + dlcs.
  private httpService = inject(HttpService);
  public gamesVersions: any[] = [];

  constructor(private gameUtils: GameUtilsService, private utils: UtilsService) {}

  ngOnInit() {
    this.getAllGames();
  }

  getGameImage(name:string) {
    return this.gameUtils.getGameImage(name);
  }

  formatName(name:string) {
    return this.utils.formatName(name);
  }

  private getAllGames() {
    this.httpService.getAllPokemonGames().subscribe((data: any) => {
      this.gamesVersions = data.results.
        filter(
          (game: { name: string; url: string }) => {
            const name = game.name.toLowerCase();
            return !name.startsWith('the') && !name.includes('japan'); // Retirando as versões repetidas e dlcs que também vêm na resposta.
          }
        ).
        map(
          (game: { name: string; url: string }) => {
            const id = game.url.split('/').filter(Boolean).pop(); // Extrai o último número da URL
            return { ...game, id };
          }
        )
    });
  }
}
