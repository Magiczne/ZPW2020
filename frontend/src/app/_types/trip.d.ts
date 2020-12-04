interface Trip {
  id: string;
  currentPeopleCount: number;

  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  price: number;
  rating: number;
  maxPeopleCount: number;
  description: string;
  photoUrl: string;
}

export { Trip };
