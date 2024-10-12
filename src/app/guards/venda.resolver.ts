import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { VendasService } from '../services/vendas.service';
import { Venda } from '../model/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaResolver  {

  constructor(private service: VendasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Venda> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id: "",codigoVenda: "",produtoVenda:"",quantidadeVenda: null,valorVenda: null , dataFinal: new Date(), dataInicial: new Date(), statusVenda: ""});
  }
}
