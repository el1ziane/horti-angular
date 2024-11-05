import { RouterModule, Routes } from '@angular/router';

import { CompraComponent} from './compra.component';
import { FormCompraComponent } from './form/form-compra/form-compra.component';
import { FormDespesaComponent } from './form/form-despesa/form-despesa.componentt
import { authGuard } from '../../auth-guard.guard';

const routes: Routes = [
  canActivate: [authGuard],
  {path: 'recebimento',component:CompraComponent},
  {path: 'novo',component:FormCompraComponent},
  {path: 'editar-compra/:id',component:FormCompraComponent},
  { path: 'nova', component: FormDespesaComponent},
  {path: 'editar-despesa/:id',component:FormDespesaComponent}
];


export class CompraRoutingModule { }



