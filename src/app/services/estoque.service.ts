import { Estoque } from './../model/estoque';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private estoqueParaRelatorio: Estoque[] = [];
  private readonly API = 'http://localhost:8080/api/estoque';
  private readonly PRODUCT_API = 'http://localhost:8080/api/produto';


  constructor(private httpClient: HttpClient) { }



    list(): Observable<Estoque[]> {
      return this.httpClient.get<Estoque[]>(this.API).pipe(
        first()
      );
    }

  loadById(id: string){
    return this.httpClient.get<Estoque>(`${this.API}/${id}`);
  }
  getQuantidadeEstoque(): Observable<number> {
    return this.httpClient.get<number>(`${this.API}/quantidade`); // Alterado para chamar a rota correta
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


}
