import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroMesDashboardComponent } from './financeiro-mes-dashboard.component';

describe('FinanceiroMesDashboardComponent', () => {
  let component: FinanceiroMesDashboardComponent;
  let fixture: ComponentFixture<FinanceiroMesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceiroMesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceiroMesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
