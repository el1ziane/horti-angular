import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos.component';
import { FormProdutoComponent } from './form-produto/form-produto.component';

const routes: Routes = [
  {path: 'produto',component:ProdutosComponent},
  {path: 'novo',component:FormProdutoComponent},
  {path: 'editar/:id',component:FormProdutoComponent}
];

export class ProdutosRoutingModule { }



