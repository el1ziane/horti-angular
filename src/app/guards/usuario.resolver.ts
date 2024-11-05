import { Usuario } from './../features/login/usuario';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from '../features/login/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolver  {

  constructor(private usuarioService: UsuarioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    if (route.params && route.params['id']) {
      return this.usuarioService.loadById(route.params['id']);
    }
    return of({_id: "",nome: "",email: "", senha: ""});
  }
}
