import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ACCESS_TOKEN } from '../models/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private headerOptions: HttpHeaders;

  constructor(private http: HttpClient, public spinner: NgxSpinnerService) {
    this.headerOptions = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
  }

  public GET(path: string, params?: object) {
    // because API not support authentication in header
    // just use in params like: {token:...}
    // So can not handle add token in http interceptor
    this.showSpinner();
    const token = this.setToken();
    if (token) {
      this.headerOptions = this.headerOptions.set(
        'Authorization',
        `Bearer ${token}`
      );
    }
    let url = `${this.apiUrl}/${path}`;
    let options = {
      headers: this.headerOptions,
      ...params,
    };

    return this.http.get(url, options).pipe(
      map((res: any) => {
        this.hideSpinner();
        return res;
      })
    );
  }

  public POST(
    path: string,
    params?: object,
    httpOptions?: object,
    showSpinner = true
  ) {
    // because API not support authentication in header
    // just use in params like: {token:...}
    // So can not handle add token in http interceptor

    if (showSpinner) {
      this.showSpinner();
    }
    const token = this.setToken();
    let paramsOptions = {};
    if (token) {
      paramsOptions = { token };
    }
    let url = `${this.apiUrl}/${path}`;
    let options = {
      headers: this.headerOptions,
      ...httpOptions,
    };
    let paramsRq = { ...paramsOptions, ...params };

    return this.http.post(url, paramsRq, options).pipe(
      map((res: any) => {
        if (showSpinner) {
          this.hideSpinner();
        }
        return res;
      })
    );
  }

  public PUT(
    path: string,
    params?: object,
    httpOptions?: object,
    showSpinner = true
  ) {
    // because API not support authentication in header
    // just use in params like: {token:...}
    // So can not handle add token in http interceptor

    if (showSpinner) {
      this.showSpinner();
    }

    let paramsOptions = {};
    let url = `${this.apiUrl}/${path}`;
    const token = this.setToken();
    if (token) {
      this.headerOptions = this.headerOptions.set(
        'Authorization',
        `Bearer ${token}`
      );
    }
    let options = {
      headers: this.headerOptions,
      ...httpOptions,
    };
    let paramsRq = { ...paramsOptions, ...params };

    return this.http.put(url, paramsRq, options).pipe(
      map((res: any) => {
        if (showSpinner) {
          this.hideSpinner();
        }
        return res;
      })
    );
  }
  public DELETE(
    path: string,
    params?: object,
    httpOptions?: object,
    showSpinner = true
  ) {
    // because API not support authentication in header
    // just use in params like: {token:...}
    // So can not handle add token in http interceptor

    if (showSpinner) {
      this.showSpinner();
    }

    let url = `${this.apiUrl}/${path}`;
    const token = this.setToken();
    if (token) {
      this.headerOptions = this.headerOptions.set(
        'Authorization',
        `Bearer ${token}`
      );
    }
    let options = {
      headers: this.headerOptions,
      ...httpOptions,
    };

    return this.http.delete(url, options).pipe(
      map((res: any) => {
        if (showSpinner) {
          this.hideSpinner();
        }
        return res;
      })
    );
  }

  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  setToken() {
    const token = localStorage.getItem(ACCESS_TOKEN);

    return token;
  }
}
