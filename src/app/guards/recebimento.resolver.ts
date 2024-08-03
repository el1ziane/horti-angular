import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recebimento } from '../model/recebimento';
import { RecebimentosService } from '../services/recebimentos.service';

@Injectable({
  providedIn: 'root'
})
export class RecebimentoResolver  {

  constructor(private service: RecebimentosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recebimento> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id: "",fornecedorRec: "",produto: "",quantidadeRecebimento: null,valorRecebimento: null ,dataRecebimento: new Date(),status: ""});
  }
}
