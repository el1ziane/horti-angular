import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { estimativaResolver } from './estimativa.resolver';

describe('estimativaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => estimativaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
