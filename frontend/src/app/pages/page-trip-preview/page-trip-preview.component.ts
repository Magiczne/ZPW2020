import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-page-trip-preview',
  templateUrl: './page-trip-preview.component.html',
  styleUrls: ['./page-trip-preview.component.scss']
})
export class PageTripPreviewComponent implements OnInit {
  constructor(private route: ActivatedRoute, private tripsService: TripsService) { }

  id = 0;
  trip: Trip;

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
    });

    this.trip = await this.tripsService.show(this.id);
  }
}
