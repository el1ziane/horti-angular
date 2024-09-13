import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesFornecedoresDialogComponent } from './detalhes-fornecedores-dialog.component';

describe('DetalhesFornecedoresDialogComponent', () => {
  let component: DetalhesFornecedoresDialogComponent;
  let fixture: ComponentFixture<DetalhesFornecedoresDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesFornecedoresDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesFornecedoresDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
