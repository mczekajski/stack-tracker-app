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
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  async login(credentials: ICredentials) {
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

  private saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }
}
