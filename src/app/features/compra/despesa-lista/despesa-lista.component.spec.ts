import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaListaComponent } from './despesa-lista.component';

describe('DespesaListaComponent', () => {
  let component: DespesaListaComponent;
  let fixture: ComponentFixture<DespesaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespesaListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DespesaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
