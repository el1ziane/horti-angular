import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDespesaDialogComponent } from './detalhes-despesa-dialog.component';

describe('DetalhesDespesaDialogComponent', () => {
  let component: DetalhesDespesaDialogComponent;
  let fixture: ComponentFixture<DetalhesDespesaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesDespesaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesDespesaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
