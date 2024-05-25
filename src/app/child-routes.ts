
import { FormComponent } from './form/form.component';
import { RecebimentosComponent } from './recebimentos/containers/recebimentos/recebimentos.component';



export const childRoutes = [
  {
    path: 'form',
    component: FormComponent,
    data: { icon: 'home', text: 'Início' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'inventory_2', text: 'Estoque' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'ecor', text: 'Produtos' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'calculate', text: 'Estimativa' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'manage_history', text: 'Produção' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'add_business', text: 'Vendas' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'payments', text: 'Despesas' }
  },
  {
    path: 'recebimentos',
    component: RecebimentosComponent,
    data: { icon: 'point_of_sale', text: 'Recebimento' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'groups', text: 'Fornecedores' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'person_add', text: 'Funcionários' }
  },
  {
    path: 'chart',
    component: FormComponent,
    data: { icon: 'description', text: 'Relatórios' }
  },

];
