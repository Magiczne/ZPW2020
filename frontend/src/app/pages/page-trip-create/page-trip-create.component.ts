import { Component } from '@angular/core';

import { TripInterface } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-trip-create',
  templateUrl: './page-trip-create.component.html',
  styleUrls: ['./page-trip-create.component.scss']
})
export class PageTripCreateComponent {
  constructor(private tripsService: TripsService, private toastrService: ToastrService) { }

  onTripSaved(data: TripInterface): void {
    this.tripsService.create(data)
      .then(() => {
        this.toastrService.show('Trip saved successfully');
      })
      .catch(() => {
        this.toastrService.show('An error occurred');
      });
  }
}
