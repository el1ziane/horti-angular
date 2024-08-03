import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fornecedor } from '../model/fornecedor';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  private readonly API = 'http://localhost:8080/api/fornecedores';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Fornecedor[]>(this.API).pipe(
      first(),

    );
  }

  loadById(id: string){
    return this.httpClient.get<Fornecedor>(`${this.API}/${id}`);
  }
  salvar(registro: Partial<Fornecedor>){
    if (registro._id) {
      return this.editar(registro);
    }
    return this.criar(registro);

  }

  private criar(registro: Partial<Fornecedor>){
    return this.httpClient.post<Fornecedor>(this.API, registro);
  }

  editar(registro: Partial<Fornecedor>){
    return this.httpClient.put<Fornecedor>(`${this.API}/${registro._id}`,registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
