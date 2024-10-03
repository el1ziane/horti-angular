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

  constructor(private httpClient: HttpClient) { }

  adicionarAoEstoque(item: Estoque): Observable<Estoque> {
    return this.httpClient.post<Estoque>(`${this.API}/add`, item).pipe(
      tap(response => {
        console.log('Item adicionado ao estoque:', response);
      })
    );
  }

  list(): Observable<Estoque[]> {
    return this.httpClient.get<Estoque[]>(this.API).pipe(
      first(),
    );
  }
  loadById(id: string){
    return this.httpClient.get<Estoque>(`${this.API}/${id}`);
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
