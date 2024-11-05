import { Estoque } from './../model/estoque';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private estoqueParaRelatorio: Estoque[] = [];
  private readonly API = 'http://localhost:8080/api/estoque';
  private readonly PRODUCT_API = 'http://localhost:8080/api/produto';


  
  constructor(private httpClient: HttpClient) { }

  // Método para obter o token do localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para adicionar o token ao cabeçalho da requisição
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  list(): Observable<Estoque[]> {
    return this.httpClient.get<Estoque[]>(this.API, { headers: this.getHeaders() }).pipe(
      first()
    );
  }

  loadById(id: string): Observable<Estoque> {
    return this.httpClient.get<Estoque>(`${this.API}/${id}`, { headers: this.getHeaders() });
  }

  getQuantidadeEstoque(): Observable<number> {
    return this.httpClient.get<number>(`${this.API}/quantidade`, { headers: this.getHeaders() });
  }

  setEstoqueParaRelatorio(estoque: Estoque[]) {
    this.estoqueParaRelatorio = estoque;
  }

  getEstoqueParaRelatorio(): Estoque[] {
    return this.estoqueParaRelatorio;
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

  removerQuantidadeEstoque(id: string, quantidade: number): Observable<any> {
    return this.httpClient.put<any>(`${this.API}/${id}/remover`, quantidade, { headers: this.getHeaders() });
  }
}