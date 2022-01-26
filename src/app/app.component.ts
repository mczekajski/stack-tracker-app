import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stack-tracker-app';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
  }

  logout(): void {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
