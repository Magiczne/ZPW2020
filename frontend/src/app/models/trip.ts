import { Trip as TripInterface } from '../_types/trip';

class Trip implements TripInterface {
  id: string;

  description: string;
  destination: string;
  endDate: Date;
  maxPeopleCount: number;
  name: string;
  photoUrl: string;
  price: number;
  rating: number;
  startDate: Date;

  comments: Array<string>;
  reservedBy: Array<{ user: string, count: number }>;

  tmpPeopleCount: number = 0;

  static fromInterface(data: TripInterface): Trip {
    const trip = new Trip();

    trip.id = data.id;
    trip.description = data.description;
    trip.destination = data.destination;
    trip.endDate = data.endDate;
    trip.maxPeopleCount = data.maxPeopleCount;
    trip.name = data.name;
    trip.photoUrl = data.photoUrl;
    trip.price = data.price;
    trip.rating = data.rating;
    trip.startDate = data.startDate;

    trip.comments = data.comments;
    trip.reservedBy = data.reservedBy;

    return trip;
  }

  get currentPeopleCount(): number {
    return this.reservedBy.reduce((acc, data) => {
      return acc += data.count;
    }, 0) + this.tmpPeopleCount;
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
      this.tmpPeopleCount++;
    }
  }

  undoReserve(): void {
    if (this.tmpPeopleCount > 0) {
      this.tmpPeopleCount--;
    }
  }
}

export { Trip, TripInterface };
