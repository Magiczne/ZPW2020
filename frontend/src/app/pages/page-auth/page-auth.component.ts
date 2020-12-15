import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-auth',
  templateUrl: './page-auth.component.html',
  styleUrls: ['./page-auth.component.scss']
})
export class PageAuthComponent {
  email: string;
  password: string;

  constructor(public authService: AuthService, public toastr: ToastrService, public router: Router) {}

  async register(): Promise<void> {
    try {
      await this.authService.register(this.email, this.password);
      await this.router.navigate(['']);
    } catch (e) {
      if (e.message) {
        this.toastr.show(e.message);
      }
    } finally {
      this.email = '';
      this.password = '';
    }
  }

  async login(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password);
      await this.router.navigate(['']);
    } catch (e) {
      if (e.message) {
        this.toastr.show(e.message);
      }
    } finally {
      this.email = '';
      this.password = '';
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      await this.router.navigate(['auth']);
    } catch (e) {
      if (e.message) {
        this.toastr.show(e.message);
      }
    }
  }

  get isDisabled(): boolean {
    return !this.email || !this.password;
  }
}
