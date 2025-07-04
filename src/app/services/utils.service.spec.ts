import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  // São testes mais simples, apesar de saber que a lógica estava correta, é uma prática testar a função o retorno e saber se ela pode quebrar ou não, como acontecia com algumas páginas
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar "Desconhecido" quando o nome for null', () => {
    expect(service.formatName(null)).toBe('Desconhecido');
  });

  it('deve retornar "Desconhecido" quando o nome for undefined', () => {
    expect(service.formatName(undefined)).toBe('Desconhecido');
  });

  it('deve formatar nomes corretamente substituindo hífens por espaços e capitalizando', () => {
    const input = 'red-blue';
    const output = 'Red Blue';
    expect(service.formatName(input)).toBe(output);
  });

  it('deve capitalizar apenas a primeira letra de cada palavra', () => {
    const input = 'black-and-white';
    const output = 'Black And White';
    expect(service.formatName(input)).toBe(output);
  });

  it('deve retornar o nome formatado quando não houver hífens', () => {
    const input = 'kanto';
    const output = 'Kanto';
    expect(service.formatName(input)).toBe(output);
  });
});
