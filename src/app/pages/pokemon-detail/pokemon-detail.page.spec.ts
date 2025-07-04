import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailPage } from './pokemon-detail.page';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { of } from 'rxjs';

describe('PokemonDetailPage', () => {
  let component: PokemonDetailPage;
  let fixture: ComponentFixture<PokemonDetailPage>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', [
      'getPokemonByName',
      'getPokemonDescription'
    ]);

    // Dummy datas
    const dummyDetails = { id: 25, name: 'pikachu' };
    const dummySpecies = {
      flavor_text_entries: [
        { flavor_text: 'Electric Mouse Pokémon.', language: { name: 'en' } }
      ]
    };

    // Retorno dos dummy datas
    httpServiceSpy.getPokemonByName.and.returnValue(of(dummyDetails));
    httpServiceSpy.getPokemonDescription.and.returnValue(of(dummySpecies));

    await TestBed.configureTestingModule({
      imports: [PokemonDetailPage],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'pikachu' // /pokemon/pikachu
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // chama ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar os detalhes e montar o objeto "pokemon"', () => {
    expect(httpServiceSpy.getPokemonByName).toHaveBeenCalledWith('pikachu');
    expect(httpServiceSpy.getPokemonDescription).toHaveBeenCalledWith('pikachu');

    expect(component.pokemon).toEqual({
      id: 25,
      name: 'pikachu',
      description: 'Electric Mouse Pokémon.',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    });
  });
});
