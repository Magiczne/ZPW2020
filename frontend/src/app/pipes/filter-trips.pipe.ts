import { Pipe, PipeTransform } from '@angular/core';

import { Trip } from '../models/trip';

export interface TripFilters {
  date: {
    min?: Date,
    max?: Date
  };

  name: string;

  price: {
    min: number,
    max: number
  };

  rating: {
    min: number,
    max: number
  };
}

@Pipe({
  name: 'filterTrips'
})
export class FilterTripsPipe implements PipeTransform {
  transform(trips: Array<Trip>, filters: TripFilters): Array<Trip> {
    trips = this.applyDateFilter(trips, filters);
    trips = this.applyNameFilter(trips, filters);
    trips = this.applyPriceFilter(trips, filters);
    trips = this.applyRatingFilter(trips, filters);

    return trips;
  }

  applyDateFilter(trips: Array<Trip>, filters: TripFilters): Array<Trip> {
    if (filters.date.min !== undefined && filters.date.max !== undefined) {
      return trips.filter(trip => trip.startDate >= filters.date.min && trip.endDate <= filters.date.max);
    }

    if (filters.date.min !== undefined) {
      return trips.filter(trip => trip.startDate >= filters.date.min);
    }

    if (filters.date.max !== undefined) {
      return trips.filter(trip => trip.endDate <= filters.date.max);
    }

    return trips;
  }

  applyNameFilter(trips: Array<Trip>, filters: TripFilters): Array<Trip> {
    return trips.filter(trip => trip.name.includes(filters.name));
  }

  applyPriceFilter(trips: Array<Trip>, filters: TripFilters): Array<Trip> {
    return trips.filter(trip => trip.price >= filters.price.min && trip.price <= filters.price.max);
  }

  applyRatingFilter(trips: Array<Trip>, filters: TripFilters): Array<Trip> {
    return trips.filter(trip => trip.rating >= filters.rating.min && trip.rating <= filters.rating.max);
  }
}
