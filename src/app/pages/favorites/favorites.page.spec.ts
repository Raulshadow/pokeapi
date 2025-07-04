import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FavoritesPage } from './favorites.page';
import { HttpService } from 'src/app/services/http.service';
import { of } from 'rxjs';

describe('FavoritesPage', () => {
  // Testar a questão do localStorage para ter certeza do funcionamento.
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['getAllPokemonSimpleForm']); // Aqui foi para criar uma função falsa para simular o teste

    await TestBed.configureTestingModule({
      imports: [FavoritesPage],
      providers: [
        { provide: HttpService, useValue: httpSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os favoritos do localStorage e filtrar os pokémons corretos', () => {
    const storedFavorites = ['bulbasaur', 'pikachu'];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedFavorites));

    const dummyResponse = {
      results: [
        { name: 'bulbasaur', url: 'url1' },
        { name: 'charmander', url: 'url2' },
        { name: 'pikachu', url: 'url3' }
      ]
    };

    httpServiceSpy.getAllPokemonSimpleForm.and.returnValue(of(dummyResponse));

    component['loadFavorites']();

    expect(httpServiceSpy.getAllPokemonSimpleForm).toHaveBeenCalled();
    expect(component.favoritePokemons.length).toBe(2);
    expect(component.favoritePokemons[0].name).toBe('bulbasaur');
    expect(component.favoritePokemons[1].name).toBe('pikachu');
  });

  it('deve definir lista vazia se não houver favoritos no localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component['loadFavorites']();

    expect(component.favoritePokemons).toEqual([]);
  });
});
