import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProducaoComponent } from './form-producao.component';

describe('FormRecebimentoComponent', () => {
  let component: FormProducaoComponent;
  let fixture: ComponentFixture<FormProducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProducaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
