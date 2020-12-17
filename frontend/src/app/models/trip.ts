import { Trip as TripInterface } from '../_types/trip';

class Trip implements TripInterface {
  id: string;

  description: string;
  destination: string;
  endDate: Date;
  maxPeopleCount: number;
  name: string;
  photoUrl: string;
  price = 0;
  startDate: Date;

  comments: Array<string> = [];
  ratingVotes: Array<{ user: string, vote: number }> = [];
  reservedBy: Array<{ user: string, count: number }> = [];
  gallery: Array<string> = [];

  tmpPeopleCount = 0;

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
    trip.startDate = data.startDate;

    trip.ratingVotes = data.ratingVotes;
    trip.comments = data.comments;
    trip.reservedBy = data.reservedBy;
    trip.gallery = data.gallery;

    return trip;
  }

  get rating(): number {
    if (this.ratingVotes.length === 0) {
      return 0;
    }

    return this.ratingVotes.reduce((acc, data) => {
      return acc + data.vote;
    }, 0) / this.ratingVotes.length;
  }

  get currentPeopleCount(): number {
    return this.reservedBy.reduce((acc, data) => {
      return acc += data.count;
    }, 0) + this.tmpPeopleCount;
  }

  get isEmpty(): boolean {
    return this.tmpPeopleCount === 0;
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
