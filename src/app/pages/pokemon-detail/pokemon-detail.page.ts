import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { IonSpinner, IonChip, IonGrid, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [IonChip, IonGrid, IonLabel, IonSpinner, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonRow, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonBackButton, IonButtons ]
})
export class PokemonDetailPage implements OnInit {
  private httpService = inject(HttpService); // Injetando o serviço HTTP para fazer requisições à PokeAPI.
  private route = inject(ActivatedRoute); // Injetando o serviço de rotas para obter parâmetros da URL.

  pokemon: any = null;

  constructor() {}

  private getPokemonDetails(name: string) {
    forkJoin({ //Utilizando o Forkjoin para realizar duas chamadas ao mesmo tempo, para que assim possa adicionar a descrição da pokédex no pokémon.
      details: this.httpService.getPokemonByName(name),
      species: this.httpService.getPokemonDescription(name),
    }).subscribe({
      next: ({ details, species }: { details: any, species: any }) => {
        // Teoricamente talvez tenha o português em algumas gerações, adicionei mas talvez não seja correto
        const entry = // Busca da Entrada para o flavor_text procurando se tem uma linguagem pt, caso não tenha pegará em en
          species.flavor_text_entries.find(
            (e: any) => e.language.name === 'pt'
          ) ||
          species.flavor_text_entries.find(
            (e: any) => e.language.name === 'en'
          );

        const description = entry
          ? entry.flavor_text.replace(/\n|\f/g, ' ')
          : 'Descrição não disponível.';

        this.pokemon = {
          ...details,
          description: description, // adicionando a descrição ao objeto
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`,
        };
      },
      error: (error) => {
        console.error('Erro ao obter detalhes do Pokémon:', error);
      },
    });
  }

  ngOnInit() {
    this.getPokemonDetails(this.route.snapshot.paramMap.get('name') || ''); // Obtém o nome do Pokémon da rota e chama o método para buscar os detalhes.
  }
}
