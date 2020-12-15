import { Component } from '@angular/core';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-shopping-cart',
  templateUrl: './trip-shopping-cart.component.html',
  styleUrls: ['./trip-shopping-cart.component.scss']
})
export class TripShoppingCartComponent {
  constructor(private shoppingCartService: ShoppingCartService) {}

  get trips(): Array<{ trip: Trip, count: number }> {
    return this.shoppingCartService.selectedTrips;
  }

  get priceSummary(): number {
    return this.trips.reduce((acc, entry) => {
      return acc += entry.trip.price * entry.count;
    }, 0);
  }

  onSubmit(): void {
    this.shoppingCartService.save();
  }
}
