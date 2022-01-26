import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(credentials: ICredentials) {
    return this.http
      .post<ILoginResponse>('https://stack-tracker-api.herokuapp.com/api/user/login', credentials)
      .subscribe(data => this.saveToken(data.token))
  }

  private saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this.isLoggedIn = true;
  }
}
