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
import { VendasComponent } from './features/vendas/vendas.component';
import { VendasFormComponent } from './features/vendas/vendas-form/vendas-form.component';
import { VendaResolver } from './guards/venda.resolver';
import { ProducaoResolver } from './guards/producao.resolver';
import { ProducaoComponent } from './features/producao/producao.component';
import { FormProducaoComponent } from './features/producao/form-producao/form-producao.component';
import { EstimativaResolver } from './guards/estimativa.resolver';
import { FormEstimativasComponent } from './features/estimativas/form-estimativas/form-estimativas.component';
import { EstoqueComponent } from './features/estoque/estoque.component';

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
  {
    path: 'vendas',
    children: [
      { path: '', component: VendasComponent},
      { path: 'novo', component: VendasFormComponent, resolve: {venda: VendaResolver}},
      {path: 'editar/:id',component:VendasFormComponent, resolve:{venda: VendaResolver}}
    ]
  },
  {
    path: 'producao',
    children: [
      { path: '', component: ProducaoComponent},
      { path: 'novo', component: FormProducaoComponent, resolve: {producao: ProducaoResolver}},
      {path: 'editar/:id',component:FormProducaoComponent, resolve:{producao: ProducaoResolver}}
    ]
  },

  {
    path: 'estimativa',
    children: [
      { path: '', component: FormEstimativasComponent, resolve: {estimativa: EstimativaResolver}},
      { path: 'estimativas', component: FormEstimativasComponent, resolve: {estimativa: EstimativaResolver}},
      {path: 'historico/:id', component: FormEstimativasComponent, resolve: {estimativa: EstimativaResolver}}
    ]
  },
  {
    path: 'estoque',
    children: [
      { path: '', component: EstoqueComponent},
     // { path: 'novo', component: FormProducaoComponent, resolve: {producao: ProducaoResolver}},
     // {path: 'editar/:id',component:FormProducaoComponent, resolve:{producao: ProducaoResolver}}
    ]
  },
  { path: '**', redirectTo: 'courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
