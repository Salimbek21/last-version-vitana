import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { AppLoginService } from '@services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private signUpService: AppLoginService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.signUpService.token;
    console.log(token,"token");

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token?.access}` },
      });
    }

    return next.handle(request);
  }
}
