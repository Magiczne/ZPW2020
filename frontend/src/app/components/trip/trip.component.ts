import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {
  @Input() isHighest: boolean;
  @Input() isLowest: boolean;
  @Input() trip: Trip;

  @Output() removed = new EventEmitter<string>();
  @Output() rated = new EventEmitter<{ id: string, rating: number }>();
  @Output() reserved = new EventEmitter<string>();
  @Output() unreserved = new EventEmitter<string>();

  constructor(public authService: AuthService) {}

  get userReservedThisTrip(): boolean {
    if (this.authService.userRaw) {
      return this.trip.reservedBy.map(entry => entry.user).includes(this.authService.userRaw.uid);
    }

    return false;
  }

  // region Custom event handlers

  onTripRated(rating: number): void {
    const data = {
      id: this.trip.id,
      rating
    };

    this.rated.emit(data);
  }

  // endregion

  // region Button click handlers

  onRemoveButtonClicked(): void {
    this.removed.emit(this.trip.id);
  }

  onReserveButtonClicked(): void {
    this.trip.reserve();

    this.reserved.emit(this.trip.id);
  }

  onUndoReserveButtonClicked(): void {
    this.trip.undoReserve();

    this.unreserved.emit(this.trip.id);
  }

  // endregion
}
