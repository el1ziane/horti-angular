import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutosService } from '../services/produtos.service';
import { Producao } from '../model/producao';
import { ProducaoService } from '../services/producao.service';
import { EstoqueService } from '../services/estoque.service';
import { Estoque } from '../model/estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueResolver  {

  constructor(private service: EstoqueService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Estoque> {
    if (route.params && route.params['id']) {
        return this.service.loadById(route.params['id']).pipe(
            catchError(error => {
                console.error('Erro ao carregar estoque:', error);
                // Aqui, ao invés de retornar um string, você deve criar um Produto vazio ou similar
                return of({
                    _id: "",
                    codigoEstoque: "",
                    produtoEstoque: { /* inicialize aqui com um objeto Produto vazio ou com valores padrão */ } as Produto,
                    quantidadeEstoque: null,
                    valorUnitarioEstoque: null,
                    valorTotalEstoque: null,
                    dataEstoque: new Date()
                });
            })
        );
    }
    return of({
        _id: "",
        codigoEstoque: "",
        produtoEstoque: { /* inicialize aqui com um objeto Produto vazio ou com valores padrão */ } as Produto,
        quantidadeEstoque: null,
        valorUnitarioEstoque: null,
        valorTotalEstoque: null,
        dataEstoque: new Date()
    });
}

}
