import { Routes } from '@angular/router';
import { EstimativasComponent } from './estimativas.component';

const routes: Routes = [
  {path: 'estimativas',component:EstimativasComponent},
  {path: 'calcular',component:EstimativasComponent},
 // {path: 'editar/:id',component:FormProdutoComponent}
];

export class EstimativaRoutingModule { }



