import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';
import { Trip } from '../models/trip';
import { TripsService } from './trips.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let tripsService: jasmine.SpyObj<TripsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TripsService', ['updateReservations']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TripsService, useValue: spy }
      ]
    });

    service = TestBed.inject(ShoppingCartService);
    tripsService = TestBed.inject(TripsService) as jasmine.SpyObj<TripsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial data', () => {
    expect(service.selectedTrips).toHaveSize(0);
  });

  it('should update trips data when selected', () => {
    const trip = new Trip();
    trip.id = '1';

    service.select(trip);

    expect(service.selectedTrips).toHaveSize(1);
  });

  it('should update trip counter when selected existing trip', () => {
    const trip = new Trip();
    trip.id = '1';

    service.selectedTrips = [{
      trip,
      count: 1
    }];

    service.select(trip);

    expect(service.selectedTrips).toHaveSize(1);
    expect(service.selectedTrips[0].count).toBe(2);
  });

  it('should update trip counter when deselected existing trip', () => {
    const trip = new Trip();
    trip.id = '1';

    service.selectedTrips = [{
      trip,
      count: 2
    }];

    service.deselect(trip);

    expect(service.selectedTrips).toHaveSize(1);
    expect(service.selectedTrips[0].count).toBe(1);
  });

  it('should remove trip from list when deselected with single counter', () => {
    const trip = new Trip();
    trip.id = '1';

    service.selectedTrips = [{
      trip,
      count: 1
    }];

    service.deselect(trip);

    expect(service.selectedTrips).toHaveSize(0);
  });

  it('should not call reservations update when there are no trips selected', () => {
    service.save();

    expect(tripsService.updateReservations).toHaveBeenCalledTimes(0);
  });

  it('should call update reservation the same number of times as the number of trips', () => {
    const trip = new Trip();
    trip.id = '1';

    const trip2 = new Trip();
    trip.id = '2';

    service.selectedTrips = [{
      trip,
      count: 1
    }, {
      trip: trip2,
      count: 2
    }];

    service.save();

    expect(tripsService.updateReservations).toHaveBeenCalledTimes(2);
  });
});
