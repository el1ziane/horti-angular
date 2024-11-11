import { first, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../model/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private readonly API = 'http://localhost:8080/api/compras';
  private compraParaRelatorio: Compra[] = [];
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Compra[]>(this.API).pipe(
      first(),

    );
  }

  loadById(id: string){
    return this.httpClient.get<Compra>(`${this.API}/${id}`);
  }
  salvar(registro: Partial<Compra>){
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);

  }

  getValorTotalCompras(): Observable<number> {
    return this.httpClient.get<number>(`${this.API}/total`);
  }
  private criar(registro: Partial<Compra>){
    return this.httpClient.post<Compra>(this.API, registro);
  }

  editar(registro: Partial<Compra>){
    return this.httpClient.put<Compra>(`${this.API}/${registro._id}`,registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
  setCompraParaRelatorio(compra: Compra[]) {
    this.compraParaRelatorio = compra;
  }

  getCompraParaRelatorio(): Compra[] {
    return this.compraParaRelatorio;
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
