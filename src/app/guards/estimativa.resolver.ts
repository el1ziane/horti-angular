import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recebimento } from '../model/recebimento';
import { RecebimentosService } from '../services/recebimentos.service';
import { Estimativa } from '../model/estimativa';
import { EstimativaService } from '../services/estimativa.service';

@Injectable({
  providedIn: 'root'
})
export class EstimativaResolver  {

  constructor(private service: EstimativaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Estimativa> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id: "",produtoEstimativa: "",caixaEstimativa: null,pesoEstimativa: null, tipoEntrada: ""});
  }
}
