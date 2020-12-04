import { Component } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-auth',
  templateUrl: './page-auth.component.html',
  styleUrls: ['./page-auth.component.scss']
})
export class PageAuthComponent {
  email: string;
  password: string;

  constructor(public authService: AuthService) {}

  register(): void {
    this.authService.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  login(): void {
    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  get isDisabled(): boolean {
    return !this.email || !this.password;
  }

  logout(): void {
    this.authService.logout();
  }
}
