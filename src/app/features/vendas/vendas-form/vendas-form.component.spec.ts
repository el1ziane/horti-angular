import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasFormComponent } from './vendas-form.component';

describe('VendasFormComponent', () => {
  let component: VendasFormComponent;
  let fixture: ComponentFixture<VendasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendasFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
