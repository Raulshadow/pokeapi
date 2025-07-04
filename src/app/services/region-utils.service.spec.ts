import { TestBed } from '@angular/core/testing';
import { RegionUtilsService } from './region-utils.service';

describe('RegionUtilsService', () => {
  let service: RegionUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar o caminho correto da imagem da região', () => {
    const regionName = 'kanto';
    const expectedPath = `assets/maps/${regionName}.png`;
    const result = service.getGameImage(regionName);
    expect(result).toBe(expectedPath);
  });

  it('deve retornar o caminho correto com outro nome de região', () => {
    const regionName = 'johto';
    const expectedPath = `assets/maps/${regionName}.png`;
    const result = service.getGameImage(regionName);
    expect(result).toBe(expectedPath);
  });
});
