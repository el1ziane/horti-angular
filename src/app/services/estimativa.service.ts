import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Estimativa } from '../model/estimativa';

@Injectable({
  providedIn: 'root'
})
export class EstimativaService {

  private readonly API = 'http://localhost:8080/api/estimativa';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Estimativa[]>(this.API).pipe(
      first(),

    );
  }

  loadById(id: string){
    return this.httpClient.get<Estimativa>(`${this.API}/${id}`);
  }
  salvar(registro: Partial<Estimativa>){

    return this.calcular(registro);

  }

  private calcular(registro: Partial<Estimativa>){
    return this.httpClient.post<Estimativa>(this.API, registro);
  }

}
