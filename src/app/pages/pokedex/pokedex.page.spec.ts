import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PokedexPage } from './pokedex.page';
import { HttpService } from 'src/app/services/http.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PokedexPage', () => {
  let component: PokedexPage;
  let fixture: ComponentFixture<PokedexPage>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  const dummyPokemons = {
    results: [
      { name: 'bulbasaur', url: 'url1' },
      { name: 'ivysaur', url: 'url2' },
      { name: 'venusaur', url: 'url3' }
    ]
  };

  beforeEach(async () => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['getAllPokemonSimpleForm']);
    httpServiceSpy.getAllPokemonSimpleForm.and.returnValue(of(dummyPokemons));

    await TestBed.configureTestingModule({
      imports: [PokedexPage],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    // Simula favoritos armazenados no local storage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'favoritePokemons') return JSON.stringify(['bulbasaur']);
      return null;
    });

    spyOn(localStorage, 'setItem');

    fixture = TestBed.createComponent(PokedexPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Chama ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar todos os pokémons e favoritos no ngOnInit', () => {
    expect(httpServiceSpy.getAllPokemonSimpleForm).toHaveBeenCalled();
    expect(component.allPokemons.length).toBe(3);
    expect(component.favorites).toEqual(['bulbasaur']);
  });

  it('deve filtrar pokémons pelo nome', () => { // teste da busca por nome.
    component.searchTerm = 'ivy';
    component.onSearchChange();

    expect(component.filtredPokemons.length).toBe(1);
    expect(component.filtredPokemons[0].name).toBe('ivysaur');
  });

  it('deve filtrar pokémons pelo id', () => { // teste da busca por ID.
    component.searchTerm = '1';
    component.onSearchChange();

    expect(component.filtredPokemons[0].name).toBe('bulbasaur');
  });

  it('deve adicionar um pokémon aos favoritos', () => { // Adição de um pokémon nos favoritos.
    component.favorites = [];
    component.toggleFavorite('pikachu');

    expect(component.favorites.includes('pikachu')).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('deve remover um pokémon dos favoritos', () => { // Remoção de um dos pokémons nos favoritos.
    component.favorites = ['pikachu'];
    component.toggleFavorite('pikachu');

    expect(component.favorites.includes('pikachu')).toBeFalse();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  // checagem de favoritos, se está corrto.
  it('deve retornar true se o pokémon for favorito', () => {
    component.favorites = ['charmander'];
    expect(component.isFavorite('charmander')).toBeTrue();
  });

  it('deve retornar false se o pokémon não for favorito', () => {
    component.favorites = ['charmander'];
    expect(component.isFavorite('squirtle')).toBeFalse();
  });
});
