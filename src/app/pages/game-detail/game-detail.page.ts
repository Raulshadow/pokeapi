import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSpinner, IonGrid, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, IonChip, IonCard, IonItem, IonList, IonButtons, IonLabel, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonBackButton } from '@ionic/angular/standalone';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { GameUtilsService } from 'src/app/services/game-utils.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.page.html',
  styleUrls: ['./game-detail.page.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonRow, IonSpinner, NgFor, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonChip, IonCard, IonItem, IonList, IonButtons, IonLabel, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonBackButton, RouterLink]
})
export class GameDetailPage implements OnInit { // Página de detalhes dos jogos, exibindo as poucas informações que possuímos.
  private httpService = inject(HttpService);
  private route = inject(ActivatedRoute);

  gameVersionGroup: any = null;

  constructor(private gameUtils: GameUtilsService, private utils:UtilsService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name'); // Puxa a informação do jogo-versão a partir do nome, pois essa navegação pode vir da página da região resultando em precisar do nome.
    this.getGamesDetails(name||'');
  }

  getGameImage(name:string) {
    return this.gameUtils.getGameImage(name); // Serviço de buscar imagem.
  }

  formatName(name:string) {
    return this.utils.formatName(name);
  }

  private getGamesDetails(name: string) { // Busca detalhes das jogos-versões.
    this.httpService.getGameDetail(name).subscribe(data => {
      this.gameVersionGroup = data;
    });
  }
}
