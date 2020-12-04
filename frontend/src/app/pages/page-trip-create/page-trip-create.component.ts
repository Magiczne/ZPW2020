import { Component } from '@angular/core';

import { TripInterface } from '../../models/trip';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-page-trip-create',
  templateUrl: './page-trip-create.component.html',
  styleUrls: ['./page-trip-create.component.scss']
})
export class PageTripCreateComponent {
  constructor(private tripsService: TripsService) { }

  onTripSaved(data: TripInterface): void {
    console.log(data);

    this.tripsService.create(data)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
}
