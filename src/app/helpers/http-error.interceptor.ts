import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { ACCESS_TOKEN, CURRENT_USER } from '../models/constants';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError(
        (response): Observable<any> => {
          if (response instanceof HttpErrorResponse) {
            this.apiService.hideSpinner();
            if ([401].includes(response.status)) {
              // use for global way
              const whiteList = ['/login', '/register'];

              if (!whiteList.includes(this.router.url)) {
                localStorage.removeItem(CURRENT_USER);
                localStorage.removeItem(ACCESS_TOKEN);
                this.authService.currentUserSubject.next(null!);
                this.router.navigate(['login'], {
                  queryParams: { returnUrl: this.router.url },
                });
              }

              let errorMessage = response.error.message
                ? response.error.message
                : response.message;
              return throwError(errorMessage);
            } else {
              // use for SAV response
              let errorMessage = '';
              if (response.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `${response.error.message}`;
              } else {
                // server-side error
                if (response.error.message) {
                  errorMessage = `${response.error.message}`;
                } else {
                  errorMessage = `Error Code: ${response.status}\nMessage: ${response.message}`;
                }
              }
              return throwError(errorMessage);
            }
          }
          return of(null);
        }
      )
    );
  }
}
