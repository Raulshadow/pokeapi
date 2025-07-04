import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDetailPage } from './game-detail.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GameUtilsService } from 'src/app/services/game-utils.service';
import { UtilsService } from 'src/app/services/utils.service';

describe('GameDetailPage', () => {
  let component: GameDetailPage;
  let fixture: ComponentFixture<GameDetailPage>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['getGameDetail']); // Simulando o serviço para testar.
    const dummyGame = { name: 'red-blue', id: 1 };
    httpServiceSpy.getGameDetail.and.returnValue(of(dummyGame));

    await TestBed.configureTestingModule({
      imports: [GameDetailPage],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'red-blue' } } },
        }, // Parâmetro de teste
        GameUtilsService,
        UtilsService,
      ],
    }).compileComponents();

    httpServiceSpy.getGameDetail.and.returnValue( // Estou utilizando um fake para executar o teste de execução da página, o teste do serviço http está feito no arquivo http.service.spec.ts
      of({
        name: 'red-blue',
        generation: { name: 'generation-i' },
        regions: [{ name: 'kanto' }],
        pokedexes: [{ name: 'kanto' }],
        versions: [{ name: 'red' }, { name: 'blue' }],
        move_learn_methods: [{ name: 'level-up' }, { name: 'machine' }],
      })
    );
    fixture = TestBed.createComponent(GameDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // chama o ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar os detalhes do jogo e definir gameVersionGroup', () => {
    expect(component.gameVersionGroup).toEqual({
        name: 'red-blue',
        generation: { name: 'generation-i' },
        regions: [{ name: 'kanto' }],
        pokedexes: [{ name: 'kanto' }],
        versions: [{ name: 'red' }, { name: 'blue' }],
        move_learn_methods: [{ name: 'level-up' }, { name: 'machine' }],
      });
    expect(httpServiceSpy.getGameDetail).toHaveBeenCalledWith('red-blue');
  });
});
