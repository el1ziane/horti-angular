


import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecebimentosService } from '../services/recebimentos.service';
import { Recebimento } from '../model/recebimento';

@Injectable({
  providedIn: 'root'
})
export class RecebimentoResolver  {

  constructor(private service: RecebimentosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recebimento> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id: "",fornecedor: "",produto: "",quantidadeRecebimento: 0,valorRecebimento:0 ,dataRecebimento: new Date(),status: ""});
  }
}
