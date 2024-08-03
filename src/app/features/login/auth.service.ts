import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      this.usuarioAutenticado = JSON.parse(isAuthenticated);
      this.mostrarMenuEmitter.emit(this.usuarioAutenticado);
    }
  }

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'admin@email.com' && usuario.senha === '123') {
      this.usuarioAutenticado = true;
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['form']);
    } else {
      this.usuarioAutenticado = false;
      localStorage.setItem('isAuthenticated', JSON.stringify(false));
      this.mostrarMenuEmitter.emit(false);
    }
  }

  fazerLogout() {
    this.usuarioAutenticado = false;
    localStorage.removeItem('isAuthenticated');
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']);
  }

  isUsuarioAutenticado(): boolean {
    return this.usuarioAutenticado;
  }
}
