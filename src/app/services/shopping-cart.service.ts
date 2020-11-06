import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  selectedTrips: Array<{ trip: Trip, count: number }> = [];

  deselect(trip: Trip): void {
    const entry = this.selectedTrips.find(e => e.trip.id === trip.id);

    if (entry) {
      entry.count--;
    }

    if (entry.count === 0) {
      this.selectedTrips = this.selectedTrips.filter(e => e.trip.id !== trip.id);
    }
  }

  select(trip: Trip): void {
    const entry = this.selectedTrips.find(e => e.trip.id === trip.id);

    if (entry) {
      entry.count++;
    } else {
      this.selectedTrips.push({
        trip,
        count: 1
      });
    }
  }
}
