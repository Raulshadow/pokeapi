import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  // Somente nesse spec de test unitário testa as principais funções do sistema, não necessitando de muitos mais testes, mas será adicionado
  const baseUrl = 'https://pokeapi.co/api/v2';
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        provideHttpClient(withInterceptorsFromDi()), // Necessita disso para aplicativos construídos em Standalone
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve procurar o obejeto simples do pokémon, apenas com nome e URL, mas basta checar o nome', () => {
    const dummyResponse = { results: [{ name: 'bulbasaur' }] };

    service.getAllPokemonSimpleForm(1).subscribe((res: any) => {
      expect(res.results.length).toBe(1);
      expect(res.results[0].name).toBe('bulbasaur');
    });

    const req = httpMock.expectOne(`${baseUrl}/pokemon?limit=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('deve buscar a descrição da pokédex baseado no nome do pokémon', () => {
    const dummyResponse = { flavor_text_entries: [] };

    service.getPokemonDescription('pikachu').subscribe(res => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/pokemon-species/pikachu`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('deve encontrar todas as versões-jogos da franquia pokémon, uma lista', () => {
    const dummyResponse = { results: [] };

    service.getAllPokemonGames().subscribe(res => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/version-group?limit=25`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('deve buscar os detalhes, ou seja um objeto mais completo com informações das versões-jogos', () => {
    const dummyGame = { name: 'red-blue' };

    service.getGameDetail('red-blue').subscribe(res => {
      expect(res).toEqual(dummyGame);
    });

    const req = httpMock.expectOne(`${baseUrl}/version-group/red-blue`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGame);
  });

  it('deve capturar a informação completa do pokémon, ao invés do geral.', () => {
    const dummyPokemon = { name: 'pikachu' };

    service.getPokemonByName('pikachu').subscribe(res => {
      expect(res).toEqual(dummyPokemon);
    });

    const req = httpMock.expectOne(`${baseUrl}/pokemon/pikachu`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemon);
  });

  it('deve procurar os dados de todas as regiões em formato de lista e simples.', () => {
    const dummyRegions = { results: [] };

    service.getAllRegions().subscribe(res => {
      expect(res).toEqual(dummyRegions);
    });

    const req = httpMock.expectOne(`${baseUrl}/region`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRegions);
  });

  it('deve procurar os dados da região em específico.', () => {
    const dummyRegion = { name: 'kanto' };

    service.getRegionDetail('kanto').subscribe(res => {
      expect(res).toEqual(dummyRegion);
    });

    const req = httpMock.expectOne(`${baseUrl}/region/kanto`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRegion);
  });
});
