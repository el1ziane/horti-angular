import { catchError, first, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Venda } from '../model/venda';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  private readonly API = 'http://localhost:8080/api/vendas';
  private vendasParaRelatorio: Venda[] = [];

  constructor(private httpClient: HttpClient) {}

  list() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Faz a requisição com os cabeçalhos
    return this.httpClient.get<Venda[]>(this.API, { headers }).pipe(
      first(),
      catchError((err) => {
        console.warn(`Erro ao buscar vendas: ${err.message}`);
        console.error('Erro completo:', err); // Log completo do erro
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  loadById(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<Venda>(`${this.API}/${id}`, { headers });
  }

  salvar(registro: Partial<Venda>) {
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);
  }

  verificarProduto(produtoNome: string): Observable<Produto | null> {
    const encodedNome = encodeURIComponent(produtoNome);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient
      .get<Produto>(`http://localhost:8080/api/vendas/produto/${encodedNome}`, {
        headers,
      })
      .pipe(
        first(),
        catchError((err) => {
          console.warn(`Erro ao buscar produto: ${err.message}`);
          return of(null);
        })
      );
  }

  // Método para obter os produtos mais vendidos
  getProdutosMaisVendidos(): Observable<{ nome: string; total: number }[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<Venda[]>(this.API, { headers }).pipe(
      map((vendas) => {
        const produtosCount = vendas.reduce((acc, venda) => {
          const nomeProduto = venda.produtoVenda?.produtoNome ?? '';
          if (venda.quantidadeVenda) {
            acc[nomeProduto] = (acc[nomeProduto] || 0) + venda.quantidadeVenda;
          }
          return acc;
        }, {} as { [key: string]: number });

        return Object.entries(produtosCount).map(([nome, total]) => ({
          nome,
          total,
        }));
      }),
      catchError((err) => {
        console.warn(`Erro ao buscar produtos mais vendidos: ${err.message}`);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  // Método para obter o valor total de vendas
  getValorTotalVendas(): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<number>(`${this.API}/valor-total`, { headers });
  }

  private criar(registro: Partial<Venda>) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post<Venda>(this.API, registro, { headers });
  }

  editar(registro: Partial<Venda>) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.put<Venda>(`${this.API}/${registro._id}`, registro, {
      headers,
    });
  }

  excluir(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.delete(`${this.API}/${id}`, { headers });
  }

  setVendasParaRelatorio(vendas: Venda[]) {
    this.vendasParaRelatorio = vendas;
  }

  getVendasParaRelatorio(): Venda[] {
    return this.vendasParaRelatorio;
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
}
