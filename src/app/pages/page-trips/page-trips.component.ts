import { Component, OnInit } from '@angular/core';

import { Trip } from '../../models/trip';
import { TripFilters } from '../../pipes/filter-trips.pipe';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './page-trips.component.html',
  styleUrls: ['./page-trips.component.scss']
})
export class PageTripsComponent implements OnInit {
  filters: TripFilters;
  trips: Array<Trip> = [];

  constructor(private tripsService: TripsService, private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
    await this.loadTrips();
  }

  async loadTrips(): Promise<void> {
    this.trips = await this.tripsService.index();
  }

  // region Getters

  get bookedTrips(): number {
    return this.trips.reduce((acc: number, curr: Trip) => {
      return acc += curr.currentPeopleCount;
    }, 0);
  }

  get maxPrice(): number {
    const found = this.trips.find(trip => trip.id === this.maxPriceId);
    return found ? found.price : 0;
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

  onFiltersChanged(filters: TripFilters): void {
    this.filters = filters;
  }

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



  // endregion
}
