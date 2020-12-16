interface Trip {
  id: string;

  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  price: number;
  maxPeopleCount: number;
  description: string;
  photoUrl: string;

  ratingVotes: Array<{ user: string, vote: number }>;
  gallery: Array<string>;
  comments: Array<string>;
  reservedBy: Array<{ user: string, count: number }>;
}

export { Trip };
