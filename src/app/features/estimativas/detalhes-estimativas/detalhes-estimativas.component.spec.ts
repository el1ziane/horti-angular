import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesEstimativasComponent } from './detalhes-estimativas.component';

describe('DetalhesEstimativasComponent', () => {
  let component: DetalhesEstimativasComponent;
  let fixture: ComponentFixture<DetalhesEstimativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesEstimativasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesEstimativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
