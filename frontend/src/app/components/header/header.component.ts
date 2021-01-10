import { Component } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public authService: AuthService, public shoppingCart: ShoppingCartService) { }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
