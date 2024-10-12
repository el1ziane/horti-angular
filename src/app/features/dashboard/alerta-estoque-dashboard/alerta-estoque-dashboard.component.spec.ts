import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaEstoqueDashboardComponent } from './alerta-estoque-dashboard.component';

describe('AlertaEstoqueDashboardComponent', () => {
  let component: AlertaEstoqueDashboardComponent;
  let fixture: ComponentFixture<AlertaEstoqueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaEstoqueDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertaEstoqueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
