import { FilterTripsPipe, TripFilters } from './filter-trips.pipe';
import { Trip } from '../models/trip';

function getTrips(): Array<Trip> {
  const trip1 = new Trip();
  const trip2 = new Trip();
  const trip3 = new Trip();

  trip1.name = 'Magic Trip';
  trip1.startDate = new Date(2021, 1, 10);
  trip1.price = 2000;
  trip1.ratingVotes = [
    { user: '1', vote: 3 },
    { user: '2', vote: 3 },
  ];

  trip2.name = 'Test';
  trip2.startDate = new Date(2021, 1, 1);
  trip2.price = 525;
  trip2.ratingVotes = [
    { user: '3', vote: 4 },
    { user: '4', vote: 5 },
  ];

  trip3.name = 'Magic Trip 2';
  trip3.startDate = new Date(2021, 1, 1);
  trip3.price = 400;
  trip3.ratingVotes = [
    { user: '1', vote: 3 },
    { user: '4', vote: 4 },
  ];

  return [
    trip1, trip2, trip3
  ];
}

function getDefaultFilters(): TripFilters {
  return {
    date: { min: undefined, max: undefined },
    name: '',
    price: { min: 0, max: 2000 },
    rating: { min: 0, max: 5 }
  };
}

describe('FilterTripsPipe', () => {
  const data: Array<Trip> = getTrips();
  let pipe: FilterTripsPipe;
  let filters: TripFilters;

  beforeEach(() => {
    pipe = new FilterTripsPipe();
    filters = getDefaultFilters();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not filter by dates when date is undefined', () => {
    const filtered = pipe.transform(data, filters);

    expect(filtered.length).toBe(3);
  });

  it('should filter by date when present', () => {
    filters.date.min = new Date(2021, 1, 1);

    const filtered = pipe.transform(data, filters);

    expect(filtered.length).toBe(2);
  });

  it('should filter by name when present', () => {
    filters.name = 'Test';

    const filtered = pipe.transform(data, filters);

    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Test');
  });

  it('should filter by price range when present', () => {
    filters.price.min = 500;
    filters.price.max = 550;

    const filtered = pipe.transform(data, filters);

    expect(filtered.length).toBe(1);
    expect(filtered[0].price).toBe(525);
  });

  it('should filter by rating range when present', () => {
    filters.rating.min = 3;
    filters.rating.max = 4;

    const filtered = pipe.transform(data, filters);

    expect(filtered.length).toBe(1);
    expect(filtered[0].rating).toBe(3.5);
  });

  it('should filter by multiple filters at once', () => {
    filters.name = 'Magic Trip';
    filters.rating.min = 3.25;
    filters.rating.max = 5;

    const filtered = pipe.transform(data, filters);

    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Magic Trip 2');
    expect(filtered[0].rating).toBe(3.5);
  });
});
