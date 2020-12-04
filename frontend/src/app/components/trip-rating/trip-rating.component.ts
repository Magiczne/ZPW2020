import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.scss']
})
export class TripRatingComponent {
  range = Array(5).fill(0).map((_, i) => i);

  @Input() currentRating = 0;
  @Output() rated = new EventEmitter<number>();

  setRating(rating: number): void {
    this.currentRating = rating;

    this.rated.emit(this.currentRating);
  }
}
