import { RouterModule, Routes } from '@angular/router';

import { CompraComponent} from './compra.component';
import { FormCompraComponent } from './form-compra/form-compra.component';
import { FormDespesaComponent } from './form-compra/form-despesa/form-despesa.component';

const routes: Routes = [
  {path: 'recebimento',component:CompraComponent},
  {path: 'novo',component:FormCompraComponent},
  {path: 'editar/:id',component:FormCompraComponent},
  { path: 'nova', component: FormDespesaComponent},
  {path: 'edita/:id',component:FormDespesaComponent}
];


export class CompraRoutingModule { }



