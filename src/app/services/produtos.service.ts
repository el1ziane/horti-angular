import { first, catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private produtosParaRelatorio: Produto[] = [];
  private readonly API = 'http://localhost:8080/api/produto';

  constructor(private httpClient: HttpClient) { }

  list() {
    const token = localStorage.getItem('token');
    //console.log('Token utilizado nas requisições:', token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<Produto[]>(this.API, { headers }).pipe(
      first(),
      catchError(err => {
       // console.warn(`Erro ao buscar produtos: ${err.message}`);
        //console.error('Erro completo:', err);
        return of([]); 
      })
    );
  }

  loadById(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Produto>(`${this.API}/${id}`, { headers });
  }

  salvar(registro: Partial<Produto>) {
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);
  }

  private criar(registro: Partial<Produto>) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<Produto>(this.API, registro, { headers });
  }

  editar(registro: Partial<Produto>) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<Produto>(`${this.API}/${registro._id}`, registro, { headers });
  }

  excluir(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete(`${this.API}/${id}`, { headers });
  }

  setProdutosParaRelatorio(produtos: Produto[]) {
    this.produtosParaRelatorio = produtos;
  }

  getProdutosParaRelatorio(): Produto[] {
    return this.produtosParaRelatorio;
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
