import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import Trips from '../_data/trips';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return {
      trips: Trips
    };
  }

  genId(trips: Array<Trip>): number {
    return trips.length > 0 ? Math.max(...trips.map(trip => trip.id)) + 1 : 1;
  }
}
