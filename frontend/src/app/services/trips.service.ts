import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';

import { TripInterface } from '../models/trip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private collection = 'trips';

  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  index(): Observable<DocumentChangeAction<TripInterface>[]> {
    return this.firestore.collection<TripInterface>(this.collection).snapshotChanges();
  }

  show(id: string): Observable<firebase.firestore.DocumentSnapshot<TripInterface>> {
    return this.firestore.doc<TripInterface>(`${this.collection}/${id}`).get();
  }

  async create(trip: TripInterface): Promise<DocumentReference<TripInterface>> {
    return this.firestore.collection<TripInterface>(this.collection).add(trip);
  }

  async updateComments(trip: TripInterface): Promise<void> {
    return this.firestore.doc<TripInterface>(`${this.collection}/${trip.id}`).update({
      comments: trip.comments
    });
  }

  async updateRating(trip: TripInterface): Promise<void> {
    return this.firestore.doc<TripInterface>(`${this.collection}/${trip.id}`).update({
      ratingVotes: trip.ratingVotes
    });
  }

  async updateReservations(trip: TripInterface, count: number): Promise<void> {
    return this.firestore.doc<TripInterface>(`${this.collection}/${trip.id}`).update({
      reservedBy: [
        { user: this.authService.userRaw.uid, count },
        ...trip.reservedBy
      ]
    });
  }

  async destroy(id: string): Promise<void> {
    return this.firestore.doc<TripInterface>(`${this.collection}/${id}`).delete();
  }
}
