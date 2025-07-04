import { TestBed, ComponentFixture } from '@angular/core/testing';
import { GamesPage } from './games.page';
import { HttpService } from 'src/app/services/http.service';
import { GameUtilsService } from 'src/app/services/game-utils.service';
import { UtilsService } from 'src/app/services/utils.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('GamesPage', () => {
  let component: GamesPage;
  let fixture: ComponentFixture<GamesPage>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    const dummyGames = {
      results: [ // Fiz um resultado hipotético, pois quero filtrar as dlcs que começãm com the, e também as versões japonesas.
        { name: 'red-blue', url: 'https://pokeapi.co/api/v2/version-group/1/' },
        { name: 'the-mystery-dungeon', url: 'https://pokeapi.co/api/v2/version-group/2/' },
        { name: 'diamond-japan', url: 'https://pokeapi.co/api/v2/version-group/3/' }
      ]
    };

    httpServiceSpy = jasmine.createSpyObj('HttpService', ['getAllPokemonGames']);// Função fake, spy, para teste
    httpServiceSpy.getAllPokemonGames.and.returnValue(of(dummyGames));

    await TestBed.configureTestingModule({
      imports: [GamesPage],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        { provide: ActivatedRoute, useValue: {} },
        GameUtilsService,
        UtilsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // chama ngOnInit
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deve carregar os jogos corretamente, filtrando os inválidos e adicionando id', () => {
    expect(httpServiceSpy.getAllPokemonGames).toHaveBeenCalled();

    expect(component.gamesVersions.length).toBe(1); // Só "red-blue" deve passar
    expect(component.gamesVersions[0]).toEqual({
      name: 'red-blue',
      url: 'https://pokeapi.co/api/v2/version-group/1/',
      id: '1'
    });
  });
});