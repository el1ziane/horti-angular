import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesVendasDialogComponent } from './detalhes-vendas-dialog.component';

describe('DetalhesVendasDialogComponent', () => {
  let component: DetalhesVendasDialogComponent;
  let fixture: ComponentFixture<DetalhesVendasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesVendasDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesVendasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
