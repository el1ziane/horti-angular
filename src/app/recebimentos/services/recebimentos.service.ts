import { delay, first, Observable, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recebimento} from '../model/recebimento';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecebimentosService {
  /*loadById(arg0: any): import("@angular/router").MaybeAsync<Observable<Recebimento>> {
    throw new Error('Method not implemented.');
  }*/

  private readonly API = 'api/recebimentos';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Recebimento[]>(this.API).pipe(
      first(),
     // delay(1000),
     // tap(recebimentos => console.log(recebimentos))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Recebimento>(`${this.API}/${id}`);
  }
  salvar(registro: Partial<Recebimento>){
    //console.log(registro);
    if (registro._id) {
      //console.log('editar');
      return this.editar(registro);
    }
    //console.log('criar');
    return this.criar(registro);
    //return this.httpClient.post<Recebimento>(this.API, registro);
  }

  private criar(registro: Partial<Recebimento>){
    return this.httpClient.post<Recebimento>(this.API, registro);
  }

  private editar(registro: Partial<Recebimento>){
    return this.httpClient.put<Recebimento>(`${this.API}/${registro._id}`,registro);
  }

  excluir(id : string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
