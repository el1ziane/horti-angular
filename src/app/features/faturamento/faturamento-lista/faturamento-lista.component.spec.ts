import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroListaComponent } from './faturamento-lista.component';

describe('FinanceiroListaComponent', () => {
  let component: FinanceiroListaComponent;
  let fixture: ComponentFixture<FinanceiroListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceiroListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceiroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
