import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from './features/login/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.verificarAcesso();
  }

  canActivateChild(): boolean {
    return this.verificarAcesso();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.verificarAcesso();
  }

  private verificarAcesso(): boolean {
    if (this.authService.isUsuarioAutenticado()) {
      console.log("AuthGuard: Acesso permitido");
      return true;
    } else {
      console.log("AuthGuard: Acesso negado, redirecionando...");
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      return false;
    }
  }

  public handleAuthError(error: HttpErrorResponse): boolean {
    if (error.status === 401) {
      console.log("Token expirado, redirecionando para login...");
      this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
      });
      return false;
    }
    return true;
  }
}
