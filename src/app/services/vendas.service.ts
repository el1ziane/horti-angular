import { catchError, first, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venda } from '../model/venda';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  private readonly API = 'http://localhost:8080/api/vendas';
  private vendasParaRelatorio: Venda[] = [];

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Venda[]>(this.API).pipe(
      first(),

    );
  }

  loadById(id: string){
    return this.httpClient.get<Venda>(`${this.API}/${id}`);
  }
  salvar(registro: Partial<Venda>){
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);

  }
  verificarProduto(produtoNome: string): Observable<Produto | null> {
    const encodedNome = encodeURIComponent(produtoNome);
    return this.httpClient.get<Produto>(`http://localhost:8080/api/vendas/produto/${encodedNome}`).pipe(
        first(),
        catchError(err => {
            console.warn(`Erro ao buscar produto: ${err.message}`);
            return of(null);
        })
    );
}


// Método para obter os produtos mais vendidos
getProdutosMaisVendidos(): Observable<{ nome: string; total: number }[]> {
  return this.httpClient.get<Venda[]>(this.API).pipe(
    map(vendas => {
      const produtosCount = vendas.reduce((acc, venda) => {
        // A string produtoVenda precisa ser um nome ou ID que você espera contar
        const nomeProduto = venda.produtoVenda; // Aqui, produtoVenda é uma string

        // Verifique se a quantidadeVenda é válida antes de somar
        if (venda.quantidadeVenda) {
          acc[nomeProduto] = (acc[nomeProduto] || 0) + venda.quantidadeVenda;
        }

        return acc;
      }, {} as { [key: string]: number });

      // Transforme o objeto em um array
      return Object.entries(produtosCount).map(([nome, total]) => ({ nome, total }));
    }),
    catchError(err => {
      console.warn(`Erro ao buscar produtos mais vendidos: ${err.message}`);
      return of([]); // Retorna um array vazio em caso de erro
    })
  );
}

 // Método para obter o valor total de vendas
 getValorTotalVendas(): Observable<number> {
  return this.httpClient.get<number>(`${this.API}/valor-total`);
}

  private criar(registro: Partial<Venda>){
    return this.httpClient.post<Venda>(this.API, registro);
  }

  editar(registro: Partial<Venda>){
    return this.httpClient.put<Venda>(`${this.API}/${registro._id}`,registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
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
