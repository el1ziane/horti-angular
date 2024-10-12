import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fornecedor } from '../model/fornecedor';
import { first, Observable } from 'rxjs';
import { Despesa } from '../model/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private readonly API = 'http://localhost:8080/api/despesa';
  private despesaParaRelatorio: Despesa[] = [];

  constructor(private httpClient: HttpClient) { }

  listDespesa() {
    return this.httpClient.get<Despesa[]>(this.API).pipe(
      first(),

    );
  }

  loadById(id: string){
    return this.httpClient.get<Despesa>(`${this.API}/${id}`);
  }
  salvar(registro: Partial<Despesa>){
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);

  }
  getTotalDespesas(): Observable<number> {
    return this.httpClient.get<number>(`${this.API}/total`);
  }
  private criar(registro: Partial<Despesa>){
    return this.httpClient.post<Despesa>(this.API, registro);
  }

  editar(registro: Partial<Despesa>){
    return this.httpClient.put<Despesa>(`${this.API}/${registro._id}`,registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
  setDespesaParaRelatorio(despesa: Despesa[]) {
    this.despesaParaRelatorio = despesa;
  }

  getDespesaParaRelatorio(): Despesa[] {
    return this.despesaParaRelatorio;
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
