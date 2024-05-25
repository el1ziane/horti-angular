import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecebimentosComponent } from './recebimentos/containers/recebimentos/recebimentos.component';
import { FormRecebimentoComponent } from './recebimentos/containers/form-recebimento/form-recebimento.component';
import { RecebimentoResolver } from './recebimentos/guards/recebimento.resolver';
import { childRoutes } from './child-routes';

// Importa as rotas de childRoutes
const routes: Routes = [
  ...childRoutes,
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'recebimentos',
    children: [
      { path: '', component: RecebimentosComponent },
      { path: 'novo', component: FormRecebimentoComponent, resolve: {recebimento: RecebimentoResolver}},
      {path: 'editar/:id',component:FormRecebimentoComponent, resolve:{recebimento: RecebimentoResolver}}
    ]
  },
  { path: '**', redirectTo: 'courses' } // Rota padrão em caso de rota não encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
