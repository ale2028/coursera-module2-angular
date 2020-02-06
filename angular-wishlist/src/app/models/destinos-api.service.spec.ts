import { TestBed } from '@angular/core/testing';

import { DestinosApiService } from './destinos-api.service';

describe('DestinosApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DestinosApiService = TestBed.get(DestinosApiService);
    expect(service).toBeTruthy();
  });
});
