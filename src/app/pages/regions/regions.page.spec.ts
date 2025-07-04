import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegionsPage } from './regions.page';
import { HttpService } from 'src/app/services/http.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('RegionsPage', () => {
  let component: RegionsPage;
  let fixture: ComponentFixture<RegionsPage>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    // Mock de retorno simulado para as regiões
    const dummyRegions = {
      results: [
        { name: 'kanto', url: 'https://pokeapi.co/api/v2/region/1/' },
        { name: 'johto', url: 'https://pokeapi.co/api/v2/region/2/' },
      ]
    };

    httpServiceSpy = jasmine.createSpyObj('HttpService', ['getAllRegions']);
    httpServiceSpy.getAllRegions.and.returnValue(of(dummyRegions));

    await TestBed.configureTestingModule({
      imports: [RegionsPage],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        { provide: ActivatedRoute, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionsPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deve carregar as regiões no ngOnInit', () => {
    fixture.detectChanges(); // chama ngOnInit e getRegions
    expect(httpServiceSpy.getAllRegions).toHaveBeenCalled();
    expect(component.regions.length).toBe(2);
    expect(component.regions[0].name).toBe('kanto');
    expect(component.regions[1].name).toBe('johto');
  });

  it('getRegionImage deve retornar caminho correto da imagem', () => {
    const imagePath = component.getRegionImage('kanto');
    expect(imagePath).toBe('assets/regions/kanto-region.jpg');
  });
});
