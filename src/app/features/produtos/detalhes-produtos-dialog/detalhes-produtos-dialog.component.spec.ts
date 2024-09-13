import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProdutosDialogComponent } from './detalhes-produtos-dialog.component';

describe('DetalhesProdutosDialogComponent', () => {
  let component: DetalhesProdutosDialogComponent;
  let fixture: ComponentFixture<DetalhesProdutosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesProdutosDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesProdutosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
