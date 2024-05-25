import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecebimentosListaComponent } from './recebimentos-lista.component';

describe('RecebimentosListaComponent', () => {
  let component: RecebimentosListaComponent;
  let fixture: ComponentFixture<RecebimentosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecebimentosListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecebimentosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
