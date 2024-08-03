import { first } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly API = 'http://localhost:8080/api/produtos';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Produto[]>(this.API).pipe(
      first(),

    );
  }

  loadById(id: string){
    return this.httpClient.get<Produto>(`${this.API}/${id}`);
  }
  salvar(registro: Partial<Produto>){
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);

  }

  private criar(registro: Partial<Produto>){
    return this.httpClient.post<Produto>(this.API, registro);
  }

  editar(registro: Partial<Produto>){
    return this.httpClient.put<Produto>(`${this.API}/${registro._id}`,registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
