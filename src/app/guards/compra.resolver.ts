import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Compra } from '../model/compra';
import { CompraService } from '../services/compra.service';

@Injectable({
  providedIn: 'root'
})
export class CompraResolver  {

  constructor(private service: CompraService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Compra> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id: "",fornecedorRec: "",produto: "",quantidadeRecebimento: null,valorRecebimento: null ,dataRecebimento: new Date(),status: ""});
  }
}
