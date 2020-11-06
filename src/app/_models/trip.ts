import { Trip as TripInterface } from '../_types/trip';

class Trip implements TripInterface {
  id: number;
  currentPeopleCount: number;

  description: string;
  destination: string;
  endDate: Date;
  maxPeopleCount: number;
  name: string;
  photoUrl: string;
  price: number;
  startDate: Date;

  constructor(id: number) {
    this.id = id;
    this.description = `Description ${id}`;
    this.destination = `Destination ${id}`;
    this.name = `Name ${id}`;
    this.photoUrl = 'https://via.placeholder.com/200x200';

    this.startDate = new Date();
    this.endDate = new Date();

    this.maxPeopleCount = id;
    this.currentPeopleCount = 0;

    this.price = 100 + id;
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

  undoReserve(): void {
    if (this.currentPeopleCount > 0) {
      this.currentPeopleCount--;
    }
  }
}

export { Trip, TripInterface };
