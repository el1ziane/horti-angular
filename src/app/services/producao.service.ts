import { Producao } from './../model/producao';
import { first } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProducaoService {
  private readonly API = 'http://localhost:8080/api/producao';
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
    return this.httpClient.put<Producao>(`${this.API}/${registro._id}`,registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
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
