import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimativasComponent } from './estimativas.component';

describe('EstimativasComponent', () => {
  let component: EstimativasComponent;
  let fixture: ComponentFixture<EstimativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimativasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstimativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
