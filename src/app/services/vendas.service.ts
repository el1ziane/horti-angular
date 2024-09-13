import { first } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venda } from '../model/venda';

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
