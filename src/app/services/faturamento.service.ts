import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, of } from 'rxjs';

import { Faturamento } from '../model/faturamento';

@Injectable({
  providedIn: 'root',
})
export class FaturamentoService {
  private readonly API = 'http://localhost:8080/api/faturamento';
  private readonly COMPRAS_API =
    'http://localhost:8080/api/recebimentos/total-compras-pendentes';
  private readonly DESPESAS_API =
    'http://localhost:8080/api/despesa/total-despesas-pendentes';
  private readonly VENDAS_API = 'http://localhost:8080/api/vendas';
  private readonly COMPRAS_API1 = 'http://localhost:8080/api/compras';
  private readonly PRODUCAO_API = 'http://localhost:8080/api/producao';
  private financeiroParaRelatorio: Faturamento[] = [];
  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Faturamento[]>(this.API).pipe(first());
  }

  getTotalComprasPendentes(): Observable<number> {
    return this.httpClient.get<number>(this.COMPRAS_API);
  }

  getTotalDespesasPendentes(): Observable<number> {
    return this.httpClient.get<number>(this.DESPESAS_API);
  }
  setFinanceiroParaRelatorio(financeiro: Faturamento[]) {
    this.financeiroParaRelatorio = financeiro;
  }

  getFinanceiroParaRelatorio(): Faturamento[] {
    return this.financeiroParaRelatorio;
  }

  imprimirRelatorio(sectionId: string) {
    const printContents = document.getElementById(sectionId)?.innerHTML;
    if (!printContents) return;

    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    location.reload();
  }
  getFinanceiroPorMes(mes: number): Observable<Faturamento[]> {
    return this.httpClient
      .get<Faturamento[]>(`${this.API}/mes/${mes}`)
      .pipe(first());
  }

  gerarFinanceiro(mesAno: string): Observable<Faturamento[]> {
    return this.httpClient.get<Faturamento[]>(`${this.API}/mes/${mesAno}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
