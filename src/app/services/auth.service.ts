import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ACCESS_TOKEN, API_PATH, CURRENT_USER } from '../models/constants';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private apiService: ApiService, private router: Router) {
    const currentUser = localStorage.getItem(CURRENT_USER);
    this.currentUserSubject = new BehaviorSubject<User>(
      currentUser ? JSON.parse(currentUser) : ''
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public setCurrentUserValue(userInfo: object) {
    const user = { ...this.currentUserValue, ...userInfo };
    this.storeUser(user);
  }

  private storeUser(user: User) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public login(params: User) {
    return this.apiService.POST(API_PATH.LOGIN, params).pipe(
      tap((res) => {
        const userData = res.data.user;
        localStorage.setItem(CURRENT_USER, JSON.stringify(userData));
        localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
        this.storeUser(userData);
        return userData;
      })
    );
  }

  public register(params: User) {
    return this.apiService.POST(API_PATH.REGISTER, params);
  }

  public logout() {
    localStorage.removeItem(CURRENT_USER);
    localStorage.removeItem(ACCESS_TOKEN);
    this.currentUserSubject.next(null!);
    this.router.navigate(['/login']);
  }
}
