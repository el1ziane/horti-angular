import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard';
import { childRoutes } from './child-routes';
import { CompraComponent } from './features/compra/compra.component';
import { FormCompraComponent } from './features/compra/form/form-compra/form-compra.component';
import { FormDespesaComponent } from './features/compra/form/form-despesa/form-despesa.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FormEstimativasComponent } from './features/estimativas/form-estimativas/form-estimativas.component';
import { EstoqueComponent } from './features/estoque/estoque.component';
import { FormFornecedorComponent } from './features/fornecedores/form-fornecedor/form-fornecedor.component';
import { FornecedoresComponent } from './features/fornecedores/fornecedores.component';
import { ContaUsuarioComponent } from './features/login/conta-usuario/conta-usuario.component';
import { LoginComponent } from './features/login/login.component';
import { RecuperarSenhaComponent } from './features/login/recuperar-senha/recuperar-senha.component';
import { RedefinirSenhaComponent } from './features/login/redefinir-senha/redefinir-senha.component';
import { FormProducaoComponent } from './features/producao/form-producao/form-producao.component';
import { ProducaoComponent } from './features/producao/producao.component';
import { FormProdutoComponent } from './features/produtos/form-produto/form-produto.component';
import { ProdutosComponent } from './features/produtos/produtos.component';
import { VendasFormComponent } from './features/vendas/vendas-form/vendas-form.component';
import { VendasComponent } from './features/vendas/vendas.component';
import { CompraResolver } from './guards/compra.resolver';
import { DespesaResolver } from './guards/despesa.resolver';
import { EstimativaResolver } from './guards/estimativa.resolver';
import { FornecedorResolver } from './guards/fornecedor.resolver';
import { ProducaoResolver } from './guards/producao.resolver';
import { ProdutoResolver } from './guards/produto.resolver';
import { UsuarioResolver } from './guards/usuario.resolver';
import { VendaResolver } from './guards/venda.resolver';


const routes: Routes = [
  ...childRoutes,
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
  {
    path: 'compra',  canActivate: [AuthGuard],
    children: [
      { path: '', component: CompraComponent,  canActivate: [AuthGuard] },
      { path: 'novo', component: FormCompraComponent, resolve: {compra: CompraResolver}},
      {path: 'editar-compra/:id',component:FormCompraComponent, resolve:{compra: CompraResolver}},
      { path: 'nova', component: FormDespesaComponent, resolve: {despesa: DespesaResolver}},
      {path: 'editar-despesa/:id',component:FormDespesaComponent, resolve:{despesa: DespesaResolver}}
    ],

  },
  { path: 'minha-conta/:id', component: ContaUsuarioComponent, resolve: { usuario: UsuarioResolver } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'produto', canActivate: [AuthGuard],
    children: [
      { path: '', component: ProdutosComponent, canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]},
      { path: 'novo', component: FormProdutoComponent, resolve: {produto: ProdutoResolver}},
      {path: 'editar/:id',component:FormProdutoComponent, resolve:{produto: ProdutoResolver}}
    ],

  },
  {
    path: 'fornecedores',
    children: [
      { path: '', component: FornecedoresComponent},
      { path: 'novo', component: FormFornecedorComponent, resolve: {fornecedor: FornecedorResolver}},
      {path: 'editar/:id',component:FormFornecedorComponent, resolve:{fornecedor: FornecedorResolver}}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'vendas',
    children: [
      { path: '', component: VendasComponent},
      { path: 'novo', component: VendasFormComponent, resolve: {venda: VendaResolver}},
      {path: 'editar/:id',component:VendasFormComponent, resolve:{venda: VendaResolver}}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'producao',
    children: [
      { path: '', component: ProducaoComponent},
      { path: 'novo', component: FormProducaoComponent, resolve: {producao: ProducaoResolver}},
      {path: 'editar/:id',component:FormProducaoComponent, resolve:{producao: ProducaoResolver}}
    ],
    canActivate: [AuthGuard]
  },

  {
    path: 'estimativa',
    children: [
      { path: '', component: FormEstimativasComponent, resolve: {estimativa: EstimativaResolver}},
      { path: 'estimativas', component: FormEstimativasComponent, resolve: {estimativa: EstimativaResolver}},
      {path: 'historico/:id', component: FormEstimativasComponent, resolve: {estimativa: EstimativaResolver}}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'estoque',
    children: [
      { path: '', component: EstoqueComponent},
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
