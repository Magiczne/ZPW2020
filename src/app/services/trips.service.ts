import { Injectable } from '@angular/core';
import { TripInterface, Trip } from '../models/trip';

import Trips from '../_data/trips';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  trips = Trips;

  index(): Array<Trip> {
    return this.trips;
  }

  show(id: number): Trip | undefined {
    return this.trips.find(trip => trip.id === id);
  }

  create(trip: TripInterface): void {
    this.trips.push(Trip.fromInterface(trip));
  }

  destroy(id: number): void {
    this.trips = this.trips.filter(trip => trip.id !== id);
  }
}
