import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { RecebimentoResolver } from './recebimento.resolver';


describe('recebimentoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => recebimentoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
