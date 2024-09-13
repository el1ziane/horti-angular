import { Routes } from '@angular/router';
import { FormProducaoComponent } from './form-producao/form-producao.component';
import { ProducaoComponent } from './producao.component';

const routes: Routes = [
  {path: 'producao',component:ProducaoComponent},
  {path: 'novo',component:FormProducaoComponent},
  {path: 'editar/:id',component:FormProducaoComponent}
];


export class ProducaoRoutingModule { }



