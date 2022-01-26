import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ICredentials {
  email: string;
  password: string;
}

interface ILoginResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading = false;
  isError = false;
  _isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  get isLoggedIn(): boolean {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this._isLoggedIn = true;
    } else {
      this._isLoggedIn = false;
    }
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  public login(credentials: ICredentials) {
    this.isError = false;
    this.isLoading = true;
    return this.http
      .post<ILoginResponse>('https://stack-tracker-api.herokuapp.com/api/user/login', credentials)
      .subscribe(
        data => {
          this.isLoading = false;
          this.saveToken(data.token)
        },
        err => {
          this.isError = true;
          this.isLoading = false;
        }
      )
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    this._isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  private saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }
}
