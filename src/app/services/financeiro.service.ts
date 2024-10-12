import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  private readonly COMPRAS_API = 'http://localhost:8080/api/recebimentos/total-compras-pendentes';
  private readonly DESPESAS_API = 'http://localhost:8080/api/despesa/total-despesas-pendentes';

  constructor(private httpClient: HttpClient) { }

  getTotalComprasPendentes(): Observable<number> {
    return this.httpClient.get<number>(this.COMPRAS_API);
  }

  getTotalDespesasPendentes(): Observable<number> {
    return this.httpClient.get<number>(this.DESPESAS_API);
  }
}
