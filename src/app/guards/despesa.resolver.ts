import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Despesa } from '../model/despesa';
import { CompraService } from '../services/compra.service';
import { DespesaService } from '../services/despesa.service';

@Injectable({
  providedIn: 'root'
})
export class DespesaResolver  {

  constructor(private service: DespesaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Despesa> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id: "",fornecedorDespesa: "",descricaoDespesa: "", valorDespesa: null, dataDespesa: new Date(), statusDespesa: ""});
  }
}
