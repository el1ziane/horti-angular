import { RouterModule, Routes } from '@angular/router';

import { RecebimentosComponent } from './recebimentos.component';
import { FormRecebimentoComponent } from './form-recebimento/form-recebimento.component';

const routes: Routes = [
  {path: 'recebimento',component:RecebimentosComponent},
  {path: 'novo',component:FormRecebimentoComponent},
  {path: 'editar/:id',component:FormRecebimentoComponent}
];


export class RecebimentosRoutingModule { }



