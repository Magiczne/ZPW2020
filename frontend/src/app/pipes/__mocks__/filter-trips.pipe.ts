import { Pipe, PipeTransform } from '@angular/core';

import { Trip } from '../../models/trip';

@Pipe({ name: 'filterTrips' })
export class FilterTripsPipeMock implements PipeTransform {
  transform(trips: Array<Trip>, filters: any): Array<Trip> {
    return trips;
  }
}
