import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase';

import { Trip, TripInterface } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-page-trip-edit',
  templateUrl: './page-trip-edit.component.html',
  styleUrls: ['./page-trip-edit.component.scss']
})
export class PageTripEditComponent implements OnInit {
  constructor(private builder: FormBuilder,
              private route: ActivatedRoute,
              private tripsService: TripsService,
              private toastrService: ToastrService) {}

  id = '';
  trip: Trip;
  trip$ = new Observable<firebase.firestore.DocumentSnapshot<TripInterface>>();

  form: FormGroup;

  name = new FormControl('', Validators.required);
  destination = new FormControl('', Validators.required);
  startDate = new FormControl('', Validators.required);
  endDate = new FormControl('', Validators.required);
  maxPeopleCount = new FormControl(0, Validators.required);
  description = new FormControl('', Validators.required);
  photoUrl = new FormControl('', Validators.required);
  price = new FormControl(0, Validators.required);

  get tripId(): string {
    return this.trip ? this.trip.id : '';
  }

  async ngOnInit(): Promise<void> {
    this.form = this.builder.group({
      name: this.name,
      destination: this.destination,
      startDate: this.startDate,
      endDate: this.endDate,
      maxPeopleCount: this.maxPeopleCount,
      description: this.description,
      photoUrl: this.photoUrl,
      price: this.price
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.loadTrip();
    });
  }

  onTripSaved(): void {
    const data = {
      id: this.id,
      ...this.form.value
    };

    this.tripsService.update(data)
      .then(() => {
        this.toastrService.show('Trip saved successfully');
      })
      .catch(() => {
        this.toastrService.show('An error occurred');
      });
  }

  loadTrip(): void {
    this.trip$ = this.tripsService.show(this.id);
    this.trip$.subscribe(data => {
      this.trip = Trip.fromInterface(data.data());
      this.trip.id = this.id;

      this.form.patchValue(this.trip);
    });
  }
}
