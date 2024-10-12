import { Producao } from './../model/producao';
import { catchError, first, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProducaoService {
  private readonly API = 'http://localhost:8080/api/producao';
  private readonly PRODUCT_API = 'http://localhost:8080/api/produto';
  private producaoParaRelatorio: Producao[] = [];

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Producao[]>(this.API).pipe(
      first(),

    );
  }

  loadById(id: string){
    return this.httpClient.get<Producao>(`${this.API}/${id}`);
  }

  salvar(registro: Partial<Producao>){
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);

  }

  private criar(registro: Partial<Producao>){
    return this.httpClient.post<Producao>(this.API, registro);
  }

  editar(registro: Partial<Producao>){
    return this.httpClient.put<Producao>(`${this.API}/${registro._id}`, registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
  verificarProduto(produtoNome: string): Observable<Produto | null> {
    const encodedNome = encodeURIComponent(produtoNome); // Certifique-se de codificar o nome
    return this.httpClient.get<Produto>(`http://localhost:8080/api/producao/produto/${encodedNome}`).pipe(
        first(),
        catchError(err => {
            console.warn(`Erro ao buscar produto: ${err.message}`);
            return of(null);
        })
    );
}




  setProducaoParaRelatorio(producoes: Producao[]) {
    this.producaoParaRelatorio = producoes;
  }

  getProducaoParaRelatorio(): Producao[] {
    return this.producaoParaRelatorio;
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
