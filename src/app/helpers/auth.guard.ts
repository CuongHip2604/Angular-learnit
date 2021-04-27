import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let currentUser = null;
    this.authService.currentUser.subscribe((user: User) => {
      currentUser = user;
    });

    const ignorePath = ['/login', '/register'];

    if (currentUser) {
      if (ignorePath.some((path) => state.url.includes(path))) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      if (!ignorePath.some((path) => state.url.includes(path))) {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
      return true;
    }
  }
}
