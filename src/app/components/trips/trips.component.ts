import { Component, OnInit } from '@angular/core';

import { Trip, TripInterface } from '../../models/trip';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  trips: Array<Trip> = [];

  constructor(private tripsService: TripsService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.trips = this.tripsService.index();
  }

  // region Getters

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
      return prev.price < curr  .price ? prev : curr;
    });

    return trip.id;
  }

  // endregion

  // region Event handlers

  onTripReserved(id: number): void {
    this.shoppingCartService.select(this.trips.find(trip => trip.id === id));
  }

  onTripUnreserved(id: number): void {
    this.shoppingCartService.deselect(this.trips.find(trip => trip.id === id));
  }

  onTripRated(data: { id: number, rating: number }): void {
    const entry = this.trips.find(trip => trip.id === data.id);
    entry?.setRating(data.rating);
  }

  onTripRemoved(id: number): void {
    this.trips = this.trips.filter(trip => trip.id !== id);
  }

  onTripSaved(data: TripInterface): void {
    this.tripsService.create(data);
  }

  // endregion
}
