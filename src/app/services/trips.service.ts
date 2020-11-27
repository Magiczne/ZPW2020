import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TripInterface, Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private apiUrl = 'api/trips';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  async index(): Promise<Array<Trip>> {
    return await this.http.get<Array<Trip>>(this.apiUrl).toPromise();
  }

  async show(id: number): Promise<Trip> {
    const url = `${this.apiUrl}/${id}`;

    return await this.http.get<Trip>(url).toPromise();
  }

  async create(trip: TripInterface): Promise<void> {
    await this.http.post<Trip>(this.apiUrl, Trip.fromInterface(trip), this.httpOptions).toPromise();
  }

  async destroy(id: number): Promise<Trip> {
    const url = `${this.apiUrl}/${id}`;

    return await this.http.delete<Trip>(url, this.httpOptions).toPromise();
  }
}
