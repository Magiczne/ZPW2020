import firebase from 'firebase';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { Trip, TripInterface } from '../../models/trip';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-page-trip-preview',
  templateUrl: './page-trip-preview.component.html',
  styleUrls: ['./page-trip-preview.component.scss']
})
export class PageTripPreviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private tripsService: TripsService,
    private builder: FormBuilder) { }

  id = '';
  trip: Trip;
  trip$: Observable<firebase.firestore.DocumentSnapshot<TripInterface>>;

  form: FormGroup;
  comment = new FormControl('', Validators.required);

  get userReservedThisTrip(): boolean {
    return this.trip.reservedBy.map(entry => entry.user).includes(this.authService.userRaw.uid);
  }

  get reservationCount(): number {
    const data = this.trip.reservedBy.find(entry => {
      return entry.user === this.authService.userRaw.uid;
    });

    return data ? data.count : 0;
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.loadTrip();

    // Init comment form
    this.form = this.builder.group({
      comment: this.comment
    });
  }

  async onSubmit(): Promise<void> {
    this.trip.comments.push(this.form.value.comment);
    await this.tripsService.updateComments(this.trip);
    this.loadTrip();
  }

  loadTrip(): void {
    this.trip$ = this.tripsService.show(this.id);
    this.trip$.subscribe(data => {
      this.trip = Trip.fromInterface(data.data());
      this.trip.id = this.id;
    });
  }
}
