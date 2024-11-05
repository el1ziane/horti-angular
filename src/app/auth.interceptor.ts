import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthGuard } from './auth-guard';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authGuard: AuthGuard) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!this.authGuard.handleAuthError(error)) {
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
