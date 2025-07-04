import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegionDetailPage } from './region-detail.page';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RegionUtilsService } from 'src/app/services/region-utils.service';
import { of } from 'rxjs';

describe('RegionDetailPage', () => {
  let component: RegionDetailPage;
  let fixture: ComponentFixture<RegionDetailPage>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;
  let regionUtilsServiceSpy: jasmine.SpyObj<RegionUtilsService>;

  beforeEach(async () => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['getRegionDetail']);
    utilsServiceSpy = jasmine.createSpyObj('UtilsService', ['formatName']);
    regionUtilsServiceSpy = jasmine.createSpyObj('RegionUtilsService', ['getGameImage']);

    const dummyRegion = {
      name: 'kanto',
      main_generation: [],
      locations: [],
      names: [],
      pokedexes: [],
      version_groups: [],
      games: []
    };

    httpServiceSpy.getRegionDetail.and.returnValue(of(dummyRegion));
    utilsServiceSpy.formatName.and.callFake((name: string) => `Formatted ${name}`);
    regionUtilsServiceSpy.getGameImage.and.callFake((name: string) => `image-path/${name}.png`);

    await TestBed.configureTestingModule({
      imports: [RegionDetailPage],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        { provide: UtilsService, useValue: utilsServiceSpy },
        { provide: RegionUtilsService, useValue: regionUtilsServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'kanto'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // chama ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar detalhes da região e atribuir ao campo region', () => {
    expect(httpServiceSpy.getRegionDetail).toHaveBeenCalledWith('kanto');
    expect(component.region).toEqual({
      name: 'kanto',
      main_generation: [],
      locations: [],
      names: [],
      pokedexes: [],
      version_groups: [],
      games: []
    });
  });

  it('getRegionImage deve chamar regionUtils.getGameImage', () => {
    const imagePath = component.getRegionImage('kanto');
    expect(regionUtilsServiceSpy.getGameImage).toHaveBeenCalledWith('kanto');
    expect(imagePath).toBe('image-path/kanto.png');
  });

  it('formatName deve chamar utils.formatName', () => {
    const formatted = component.formatName('kanto');
    expect(utilsServiceSpy.formatName).toHaveBeenCalledWith('kanto');
    expect(formatted).toBe('Formatted kanto');
  });
});
