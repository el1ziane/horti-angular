import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesEstoqueDialogComponent } from './detalhes-estoque-dialog.component';

describe('DetalhesEstoqueDialogComponent', () => {
  let component: DetalhesEstoqueDialogComponent;
  let fixture: ComponentFixture<DetalhesEstoqueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesEstoqueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesEstoqueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
