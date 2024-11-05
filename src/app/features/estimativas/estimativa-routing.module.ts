import { Routes } from '@angular/router';
import { EstimativasComponent } from './estimativas.component';

const routes: Routes = [
  {path: 'estimativas',component:EstimativasComponent},
  {path: 'calcular',component:EstimativasComponent},
];

export class EstimativaRoutingModule { }



