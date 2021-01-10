import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { TripsService } from './trips.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  selectedTrips: Array<{ trip: Trip, count: number }> = [];

  constructor(private tripsService: TripsService) {}

  get tripsCount(): number {
    return this.selectedTrips.reduce((acc, trip) => {
      return acc += trip.count;
    }, 0);
  }

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

  save(): void {
    this.selectedTrips.forEach(async data => {
      await this.tripsService.updateReservations(data.trip, data.count);
    });

    this.selectedTrips = [];
  }
}
