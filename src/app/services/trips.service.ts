import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

import { TripInterface } from '../models/trip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private collection = 'trips';

  constructor(private firestore: AngularFirestore) {}

  index(): Observable<DocumentChangeAction<TripInterface>[]> {
    return this.firestore.collection<TripInterface>(this.collection).snapshotChanges();
  }

  show(id: number): Observable<firebase.firestore.DocumentSnapshot<TripInterface>> {
    return this.firestore.doc<TripInterface>(`${this.collection}/${id}`).get();
  }

  async create(trip: TripInterface): Promise<DocumentReference<TripInterface>> {
    return this.firestore.collection<TripInterface>(this.collection).add({
      currentPeopleCount: 0,
      rating: 0,
      ...trip
    });
  }

  async destroy(id: string): Promise<void> {
    return this.firestore.doc<TripInterface>(`${this.collection}/${id}`).delete();
  }
}
