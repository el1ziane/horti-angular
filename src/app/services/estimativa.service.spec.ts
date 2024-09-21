import { TestBed } from '@angular/core/testing';

import { EstimativaService } from './estimativa.service';

describe('EstimativaService', () => {
  let service: EstimativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
