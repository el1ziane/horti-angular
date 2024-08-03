import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { childRoutes } from './child-routes';
import { FormRecebimentoComponent } from './features/recebimentos/form-recebimento/form-recebimento.component';
import { RecebimentoResolver } from './guards/recebimento.resolver';
import { RecebimentosComponent } from './features/recebimentos/recebimentos.component';
import { ProdutosComponent } from './features/produtos/produtos.component';
import { FormProdutoComponent } from './features/produtos/form-produto/form-produto.component';
import { ProdutoResolver } from './guards/produto.resolver';
import { FornecedoresComponent } from './features/fornecedores/fornecedores.component';
import { FormFornecedorComponent } from './features/fornecedores/form-fornecedor/form-fornecedor.component';
import { FornecedorResolver } from './guards/fornecedor.resolver';

const routes: Routes = [
  ...childRoutes,
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'recebimentos',
    children: [
      { path: '', component: RecebimentosComponent },
      { path: 'novo', component: FormRecebimentoComponent, resolve: {recebimento: RecebimentoResolver}},
      {path: 'editar/:id',component:FormRecebimentoComponent, resolve:{recebimento: RecebimentoResolver}}
    ]
  },
  {
    path: 'produtos',
    children: [
      { path: '', component: ProdutosComponent},
      { path: 'novo', component: FormProdutoComponent, resolve: {produto: ProdutoResolver}},
      {path: 'editar/:id',component:FormProdutoComponent, resolve:{produto: ProdutoResolver}}
    ]
  },
  {
    path: 'fornecedores',
    children: [
      { path: '', component: FornecedoresComponent},
      { path: 'novo', component: FormFornecedorComponent, resolve: {fornecedor: FornecedorResolver}},
      {path: 'editar/:id',component:FormFornecedorComponent, resolve:{fornecedor: FornecedorResolver}}
    ]
  },
  { path: '**', redirectTo: 'courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
