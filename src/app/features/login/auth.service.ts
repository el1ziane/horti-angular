import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService   {
  private readonly API = 'http://localhost:8080/api/auth';
  private usuarioAutenticado: boolean = false;
  private jwtHelper = new JwtHelperService();
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) {
    this.usuarioAutenticado = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
    this.mostrarMenuEmitter.emit(this.usuarioAutenticado);
  }
  

  fazerLogin(usuario: Usuario) {
    const usuarioParaLogin = { email: usuario.email, senha: usuario.senha };
  
    this.http.post(`${this.API}/login`, usuarioParaLogin).subscribe(
      (response: any) => {
        console.log('Resposta do servidor:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('isAuthenticated', 'true');
          console.log('Token armazenado:', response.token);
          this.verificarAutenticacao(); // Verifica o estado de autenticação
          this.router.navigate(['dashboard']);
        } else {
          this.mostrarMenuEmitter.emit(false);
          console.error('Token não encontrado na resposta.');
        }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        console.log('Detalhes do erro:', error.error);
        this.mostrarMenuEmitter.emit(false);
      }
    );
  }     

  fazerLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated'); // Remove o estado de autenticação
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  

  isUsuarioAutenticado(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this.isTokenExpirado(token);
  }
  isTokenExpirado(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }
  verificarAutenticacao() {
    const isAuthenticated = this.isUsuarioAutenticado();
    this.mostrarMenuEmitter.emit(isAuthenticated); // Emite o estado do menu
  }
  enviarEmailRecuperacao(email: string): Observable<any> {
    return this.http.post(`${this.API}/recuperar-senha`, { email });
  }

  recuperarSenha(email: string) {
   
}
redefinirSenha(token: string, novaSenha: string): Observable<any> {
  return this.http.post(`${this.API}/redefinir-senha`, { token, novaSenha });
}

  
}
