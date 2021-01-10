import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripComponent } from './trip.component';
import {Trip} from '../../models/trip';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;

    component.isHighest = true;
    component.isLowest = false;
    component.trip = new Trip();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
