import { Component, OnInit } from '@angular/core';
import {DocumentChangeAction} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import {Trip, TripInterface} from '../../models/trip';
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
  trips$: Observable<Array<DocumentChangeAction<TripInterface>>> = new Observable<Array<DocumentChangeAction<TripInterface>>>();

  constructor(
    private tripsService: TripsService,
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadTrips();
  }

  async loadTrips(): Promise<void> {
    this.trips$ = this.tripsService.index();
    this.trips$.subscribe(data => {
      this.trips = data.map(e => {
        return Trip.fromInterface({
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        });
      });
    });
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

  get maxPriceId(): string {
    const trip = this.trips.reduce((prev: Trip, curr: Trip) => {
      return prev.price < curr.price ? curr : prev;
    });

    return trip.id;
  }

  get minPriceId(): string {
    const trip = this.trips.reduce((prev: Trip, curr: Trip) => {
      return prev.price < curr.price ? prev : curr;
    });

    return trip.id;
  }

  // endregion

  // region Event handlers

  onFiltersChanged(filters: TripFilters): void {
    this.filters = filters;
  }

  onTripReserved(id: string): void {
    this.shoppingCartService.select(this.trips.find(trip => trip.id === id));
  }

  onTripUnreserved(id: string): void {
    this.shoppingCartService.deselect(this.trips.find(trip => trip.id === id));
  }

  async onTripRated(data: { id: string, rating: number }): Promise<void> {
    const entry = this.trips.find(trip => trip.id === data.id);

    if (entry) {
      entry.rating = data.rating;
      await this.tripsService.updateRating(entry);
    }
  }

  onTripRemoved(id: string): void {
    this.tripsService.destroy(id)
      .then(async () => {
        await this.loadTrips();
      })
      .catch(err => {
        if (err.message) {
          this.toastr.show(err.message);
        }
      });
  }

  // endregion
}
