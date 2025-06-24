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
});
