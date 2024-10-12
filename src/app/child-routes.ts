import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { EstoqueComponent } from './features/estoque/estoque.component';
import { ProdutosComponent } from './features/produtos/produtos.component';
import { FornecedoresComponent } from './features/fornecedores/fornecedores.component';
import { VendasComponent } from './features/vendas/vendas.component';
import { EstimativasComponent } from './features/estimativas/estimativas.component';
import { ProducaoComponent } from './features/producao/producao.component';
import { CompraComponent } from './features/recebimentos/compra.component';



export const childRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { icon: 'home', text: 'Início' }
  },
  {
    path: 'estoque',
    component: EstoqueComponent,
    data: { icon: 'inventory_2', text: 'Estoque' }
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
    data: { icon: 'ecor', text: 'Produtos' }
  },
  {
    path: 'estimativas',
    component: EstimativasComponent,
    data: { icon: 'calculate', text: 'Estimativa' }
  },
  {
    path: 'producao',
    component: ProducaoComponent,
    data: { icon: 'manage_history', text: 'Produção' }
  },
  {
    path: 'vendas',
    component: VendasComponent,
    data: { icon: 'add_business', text: 'Vendas' }
  },

  {
    path: 'compra',
    component: CompraComponent,
    data: { icon: 'point_of_sale', text: 'Compras' }
  },
  {
    path: 'fornecedores',
    component: FornecedoresComponent,
    data: { icon: 'groups', text: 'Fornecedores' }
  },
  {
    path: 'financeiro',
    component: FornecedoresComponent,
    data: { icon: 'money', text: 'Financeiro' }
  },

];
