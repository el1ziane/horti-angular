import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { estoqueResolver } from './estoque.resolver';

describe('estoqueResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => estoqueResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
