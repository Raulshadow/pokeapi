import { TestBed } from '@angular/core/testing';
import { GameUtilsService } from './game-utils.service';

describe('GameUtilsService', () => {
  let service: GameUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar o caminho correto da imagem da versão dos jogos', () => {
    const gameName = 'red-blue';
    const expectedPath = `assets/games/${gameName}.jpg`;
    const result = service.getGameImage(gameName);
    expect(result).toBe(expectedPath);
  });

  it('deve retornar o caminho correto de outra versão-jogo', () => {
    const gameName = 'x-y';
    const expectedPath = `assets/games/${gameName}.jpg`;
    const result = service.getGameImage(gameName);
    expect(result).toBe(expectedPath);
  });
});
