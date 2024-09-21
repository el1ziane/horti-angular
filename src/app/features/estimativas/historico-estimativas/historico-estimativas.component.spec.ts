import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoEstimativasComponent } from './historico-estimativas.component';

describe('HistoricoEstimativasComponent', () => {
  let component: HistoricoEstimativasComponent;
  let fixture: ComponentFixture<HistoricoEstimativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoEstimativasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoEstimativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
