interface Trip {
  id: string;

  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  price: number;
  rating: number;
  maxPeopleCount: number;
  description: string;
  photoUrl: string;

  comments: Array<string>;
  reservedBy: Array<{ user: string, count: number }>;
}

export { Trip };
