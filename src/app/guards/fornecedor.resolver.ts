import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FornecedoresService } from '../services/fornecedores.service';
import { Fornecedor } from '../model/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorResolver  {

  constructor(private service: FornecedoresService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fornecedor> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({_id: "",fornecedorNome: "",cnpj: "",email: "",telefone: ""});
  }
}
