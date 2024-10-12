import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopVendasDashboardComponent } from './top-vendas-dashboard.component';

describe('TopVendasDashboardComponent', () => {
  let component: TopVendasDashboardComponent;
  let fixture: ComponentFixture<TopVendasDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopVendasDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopVendasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
