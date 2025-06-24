import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonRow, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonBackButton, IonButtons ]
})
export class PokemonDetailPage implements OnInit {
  private httpService = inject(HttpService); // Injetando o serviço HTTP para fazer requisições à PokeAPI.
  private route = inject(ActivatedRoute); // Injetando o serviço de rotas para obter parâmetros da URL.

  pokemon: any = null;
  isLoading:boolean = true;

  constructor() { }

  private getPokemonDetails(name: string) {
    this.httpService.getPokemonByName(name).subscribe({
      next: (data: any) => {
        this.pokemon = {
          ...data,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png` // Adiciona a URL da imagem do Pokémon.
        }; // Pega os dados do pokémon vindo da API.
        this.isLoading = false; // Define o estado de carregamento como falso após obter os dados.
      },
      error: (error: any) => {
        console.error('Erro ao obter detalhes do Pokémon:', error); // Caso dê algum erro, exibe no console.
        this.isLoading = false; // Define o estado de carregamento como falso mesmo em caso de erro.
      }
    });
  }

  ngOnInit() {
    this.getPokemonDetails(this.route.snapshot.paramMap.get('name') || ''); // Obtém o nome do Pokémon da rota e chama o método para buscar os detalhes.
  }

}
