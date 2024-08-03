import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutosService } from '../services/produtos.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoResolver  {

  constructor(private service: ProdutosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id: "",codigo: "",produtoNome: "",quantidadeProduto: null,valorProduto: null ,peso: null});
  }
}
