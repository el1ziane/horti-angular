import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecebimentoComponent } from './form-compra.component';

describe('FormRecebimentoComponent', () => {
  let component: FormRecebimentoComponent;
  let fixture: ComponentFixture<FormRecebimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecebimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
