import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { vendaResolver } from './venda.resolver';

describe('vendaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => vendaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
