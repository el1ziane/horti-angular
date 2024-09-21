import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstimativasComponent } from './form-estimativas.component';

describe('FormEstimativasComponent', () => {
  let component: FormEstimativasComponent;
  let fixture: ComponentFixture<FormEstimativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEstimativasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEstimativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
