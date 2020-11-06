import { Trip as TripInterface } from '../_types/trip';

class Trip implements TripInterface {
  static lastId = 0;

  id: number;
  currentPeopleCount: number;

  description: string;
  destination: string;
  endDate: Date;
  maxPeopleCount: number;
  name: string;
  photoUrl: string;
  price: number;
  rating: number;
  startDate: Date;

  constructor(id: number) {
    this.id = id;
    if (id > Trip.lastId) {
      Trip.lastId = id;
    }

    this.description = `Description ${id}`;
    this.destination = `Destination ${id}`;
    this.name = `Name ${id}`;
    this.photoUrl = 'https://via.placeholder.com/200x200';

    this.startDate = new Date();
    this.endDate = new Date();

    this.maxPeopleCount = id;
    this.currentPeopleCount = 0;

    this.price = 100 + id;

    const rating = localStorage.getItem(`trip-${this.id}-rating`);
    this.rating = rating ? parseInt(rating, 10) : 0;
  }

  static fromInterface(data: TripInterface): Trip {
    const trip = new Trip(Trip.lastId + 1);

    trip.description = data.description;
    trip.destination = data.destination;
    trip.endDate = data.endDate;
    trip.maxPeopleCount = data.maxPeopleCount;
    trip.name = data.name;
    trip.photoUrl = data.photoUrl;
    trip.price = data.price;
    trip.rating = data.rating;
    trip.startDate = data.startDate;

    return trip;
  }

  get isEmpty(): boolean {
    return this.currentPeopleCount === 0;
  }

  get isFull(): boolean {
    return this.currentPeopleCount >= this.maxPeopleCount;
  }

  get lowAvailablePlaces(): boolean {
    return this.maxPeopleCount - this.currentPeopleCount < 2;
  }

  reserve(): void {
    if (this.currentPeopleCount < this.maxPeopleCount) {
      this.currentPeopleCount++;
    }
  }

  setRating(rating: number): void {
    this.rating = rating;
    localStorage.setItem(`trip-${this.id}-rating`, rating.toString());
  }

  undoReserve(): void {
    if (this.currentPeopleCount > 0) {
      this.currentPeopleCount--;
    }
  }
}

export { Trip, TripInterface };
