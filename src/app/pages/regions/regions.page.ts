import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
  standalone: true,
  imports: [NgFor, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonList, IonItem, IonAvatar, RouterLink]
})
export class RegionsPage implements OnInit { // Tela de listagem das regiões, exibindo imagens que façam referência a região.
  private httpService = inject(HttpService);
  regions: any[] = [];

  constructor() { }

  private getRegions() {
    // Recebendo todas as regiões da PokeAPI.
    this.httpService.getAllRegions().subscribe((data: any) => {
      this.regions = data.results;
    });
  }
   
  getRegionImage(name: string): string {
    // Retornando o caminho da imagem representativa da região.
    return `assets/regions/${name}-region.jpg`;
  }

  ngOnInit() {
    // Ao inicializar a página, procurar todas as regiões para exibir na lista.
    this.getRegions();
  }

}
