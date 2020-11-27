import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TripFilters } from '../../pipes/filter-trips.pipe';

@Component({
  selector: 'app-trip-filters',
  templateUrl: './trip-filters.component.html',
  styleUrls: ['./trip-filters.component.scss']
})
export class TripFiltersComponent implements OnInit {
  @Input() maxPrice = 0;
  @Output() filtersChanged = new EventEmitter<TripFilters>();

  form: FormGroup;

  priceMin = new FormControl(0, [
    Validators.min(0),
    Validators.required
  ]);
  priceMax = new FormControl(Infinity, [
    Validators.min(0),
    Validators.required
  ]);

  dateMin = new FormControl('', [
    Validators.required
  ]);
  dateMax = new FormControl('', [
    Validators.required
  ]);

  ratingMin = new FormControl(0, [
    Validators.min(0),
    Validators.max(5),
    Validators.required
  ]);
  ratingMax = new FormControl(5, [
    Validators.min(0),
    Validators.max(5),
    Validators.required
  ]);

  tripName = new FormControl('', [
    Validators.min(0),
    Validators.required
  ]);

  constructor(private builder: FormBuilder) {}

  parseFilters(): TripFilters {
    const invalidDate = [ '', 'dd.mm.rrrr' ];
    const filters = {
      date: {
        min: invalidDate.includes(this.dateMin.value) ? undefined : new Date(Date.parse(this.dateMin.value)),
        max: invalidDate.includes(this.dateMax.value) ? undefined : new Date(Date.parse(this.dateMax.value))
      },
      name: this.tripName.value,
      price: {
        min: this.priceMin.value,
        max: this.priceMax.value
      },
      rating: {
        min: this.ratingMin.value,
        max: this.ratingMax.value
      }
    };

    return filters;
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      priceMin: this.priceMin,
      priceMax: this.priceMax,

      dateMin: this.dateMin,
      dateMax: this.dateMax,

      ratingMin: this.ratingMin,
      ratingMax: this.ratingMin,

      tripName: this.tripName
    });

    this.priceMax.setValue(this.maxPrice);
    this.filtersChanged.emit(this.parseFilters());

    this.form.valueChanges.subscribe(() => {
      this.filtersChanged.emit(this.parseFilters());
    });
  }
}
