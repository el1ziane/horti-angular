import { Routes } from '@angular/router';
import { VendasComponent } from './vendas.component';
import { VendasFormComponent } from './vendas-form/vendas-form.component';

const routes: Routes = [
  {path: 'venda',component:VendasComponent},
  {path: 'novo',component:VendasFormComponent},
  {path: 'editar/:id',component:VendasFormComponent}
];

export class VendasRoutingModule { }



