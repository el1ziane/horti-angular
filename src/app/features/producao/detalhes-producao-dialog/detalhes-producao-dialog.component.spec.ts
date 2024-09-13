import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProducaoDialogComponent } from './detalhes-producao-dialog.component';

describe('DetalhesProducaoDialogComponent', () => {
  let component: DetalhesProducaoDialogComponent;
  let fixture: ComponentFixture<DetalhesProducaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesProducaoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesProducaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
