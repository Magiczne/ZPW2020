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

  it('should emit on tripRated', () => {
    component.trip = new Trip();
    component.trip.id = 'test';

    component.rated.subscribe(({ id, rating }: { id: string, rating: number }) => {
      expect(id).toBe('test');
      expect(rating).toBe(5);
    });

    component.onTripRated(5);
  });

  it('should emit on onRemoveButtonClicked', () => {
    component.trip = new Trip();
    component.trip.id = 'test';

    component.removed.subscribe((id: string) => {
      expect(id).toBe('test');
    });
    component.onRemoveButtonClicked();
  });

  it('should emit on onReserveButtonClicked', () => {
    component.trip = new Trip();
    component.trip.id = 'test';

    component.reserved.subscribe((id: string) => {
      expect(id).toBe('test');
    });
    component.onReserveButtonClicked();
  });

  it('should emit on onUndoReserveButtonClicked', () => {
    component.trip = new Trip();
    component.trip.id = 'test';

    component.unreserved.subscribe((id: string) => {
      expect(id).toBe('test');
    });
    component.onUndoReserveButtonClicked();
  });
});
