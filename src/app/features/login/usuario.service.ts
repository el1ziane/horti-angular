import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  getUsuarioLogado(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/me`);
  }
  loadById(id: string) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
        console.error(`ID inválido: ${id}`);
        return throwError('ID deve ser um número válido.');
    }
    return this.http.get<Usuario>(`${this.apiUrl}/${parsedId}`);
}

atualizarUsuario(registro: Partial<Usuario>){
  return this.http.put<Usuario>(`${this.apiUrl}/${registro._id}`,registro);
}
alterarSenha(senhaAtual: string, novaSenha: string): Observable<any> {
  const payload = {
    senhaAtual: senhaAtual,
    novaSenha: novaSenha
  };

  return this.http.put<any>(`${this.apiUrl}/alterar-senha`, payload);
}
salvar(registro: Partial<Usuario>) {
  if (registro._id) {
    return this.atualizarUsuario(registro);
  }
  return null;
}

}

