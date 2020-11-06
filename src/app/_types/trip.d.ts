interface Trip {
  id: number;
  currentPeopleCount: number;

  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  price: number;
  maxPeopleCount: number;
  description: string;
  photoUrl: string;
}

export { Trip };
