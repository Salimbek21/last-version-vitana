import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

import { SignInModel, SignUpLastStepModel } from '@models/sign-up.model';
import { HttpBaseService } from './http-base.service';
@Injectable({ providedIn: 'root' })
export class AppLoginService {
  private http$ = inject(HttpBaseService);
  router = inject(Router);

  get token() {
    return JSON.parse(localStorage.getItem('token') || '{}');
  }
  get isLoggedIn() {
    const isLoggedin = localStorage.getItem('token');

    return !!isLoggedin;
  }

  signIn(body: SignInModel) {
    return this.http$.post('api/auth/login', body).pipe(
      tap((response: any) => {
        localStorage.setItem('token', JSON.stringify(response));

        this.router.navigate(['/']);
      })
    );
  }

  logout() {
    this.router.navigate(['/login1']);
    return localStorage.clear();
  }
  checkLogin(): void {
    const decodedToken = jwtDecode<any>(this.token['accessToken']);

    const expireRefresh = this.token.refreshTokenExpiration;
    const refreshToken = this.token.refreshToken;
    const accessToken = this.token.accessToken;

    if (new Date(decodedToken.exp * 1000) < new Date()) {
      this.logout();
    }
  }
}
