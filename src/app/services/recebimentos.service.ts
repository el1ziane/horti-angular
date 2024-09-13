import { first } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recebimento } from '../model/recebimento';

@Injectable({
  providedIn: 'root'
})
export class RecebimentosService {
  private readonly API = 'http://localhost:8080/api/recebimentos';
  private recebimentoParaRelatorio: Recebimento[] = [];
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Recebimento[]>(this.API).pipe(
      first(),

    );
  }

  loadById(id: string){
    return this.httpClient.get<Recebimento>(`${this.API}/${id}`);
  }
  salvar(registro: Partial<Recebimento>){
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);

  }

  private criar(registro: Partial<Recebimento>){
    return this.httpClient.post<Recebimento>(this.API, registro);
  }

  editar(registro: Partial<Recebimento>){
    return this.httpClient.put<Recebimento>(`${this.API}/${registro._id}`,registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
  setRecebimentoParaRelatorio(recebimentos: Recebimento[]) {
    this.recebimentoParaRelatorio = recebimentos;
  }

  getRecebimentoParaRelatorio(): Recebimento[] {
    return this.recebimentoParaRelatorio;
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
