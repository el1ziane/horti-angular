import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { producaoResolver } from '../producao.resolver';

describe('producaoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => producaoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
