import { Inject, Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
// import { AppLoginService } from './login.service';
import { Observable } from 'rxjs';
import { AppLoginService } from '@services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AppLoginService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoginPage = (route.routeConfig?.path || '').includes('login');
    const token = this.authService.token;

    if (isLoginPage) {
      return this.authService.isLoggedIn
        ? this.router.createUrlTree(['/dashboard'])
        : true;
    }

    return this.authService.isLoggedIn
      ? true
      : this.router.createUrlTree(['/login1']);
  }
}
