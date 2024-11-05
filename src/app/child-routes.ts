import { CanActivate } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EstoqueComponent } from './features/estoque/estoque.component';
import { ProdutosComponent } from './features/produtos/produtos.component';
import { FornecedoresComponent } from './features/fornecedores/fornecedores.component';
import { VendasComponent } from './features/vendas/vendas.component';
import { EstimativasComponent } from './features/estimativas/estimativas.component';
import { ProducaoComponent } from './features/producao/producao.component';
import { CompraComponent } from './features/compra/compra.component';
import { AuthGuard } from './auth-guard';
import { FaturamentoComponent } from './features/faturamento/faturamento.component';

export const childRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent, canActivate: [AuthGuard],
    data: { icon: 'home', text: 'Início' }
  },
  {
    path: 'estoque',
    component: EstoqueComponent,canActivate: [AuthGuard],
    data: { icon: 'inventory_2', text: 'Estoque' }
  },
  {
    path: 'produto',
    component: ProdutosComponent, canActivate: [AuthGuard],
    data: { icon: 'ecor', text: 'Produtos' }
  },
  {
    path: 'estimativas',
    component: EstimativasComponent, canActivate: [AuthGuard],
    data: { icon: 'calculate', text: 'Estimativa' }
  },
  {
    path: 'producao',
    component: ProducaoComponent,canActivate: [AuthGuard],
    data: { icon: 'manage_history', text: 'Produção' }
  },
  {
    path: 'vendas',
    component: VendasComponent,canActivate: [AuthGuard],
    data: { icon: 'add_business', text: 'Vendas' }
  },

  {
    path: 'compra',
    component: CompraComponent,canActivate: [AuthGuard],
    data: { icon: 'point_of_sale', text: 'Compras' }
  },
  {
    path: 'fornecedores', canActivate: [AuthGuard],
    component: FornecedoresComponent,
    data: { icon: 'groups', text: 'Fornecedores' }
  },
  {
    path: 'Faturamento', canActivate: [AuthGuard],
    component: FaturamentoComponent,
    data: { icon: 'file_open', text: 'Faturamento' }
  },

];