import { Component } from '@angular/core';

import { Trip } from '../_models/trip';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  trips: Array<Trip> = [
    new Trip(1),
    new Trip(2),
    new Trip(3),
    new Trip(4),
    new Trip(5),
    new Trip(6),
    new Trip(7),
    new Trip(8),
  ];

  get bookedTrips(): number {
    return this.trips.reduce((acc: number, curr: Trip) => {
      return acc += curr.currentPeopleCount;
    }, 0);
  }

  get maxPriceId(): number {
    const trip = this.trips.reduce((prev: Trip, curr: Trip)  => {
      return prev.price < curr.price ? curr : prev;
    });

    return trip.id;
  }

  get minPriceId(): number {
    const trip = this.trips.reduce((prev: Trip, curr: Trip)  => {
      return prev.price < curr.price ? prev : curr;
    });

    return trip.id;
  }
}
