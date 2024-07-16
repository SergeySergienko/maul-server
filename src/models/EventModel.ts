export interface EventModel {
  date: string; // yyyy-mm-dd
  title: string;
  description: string;
  location: string;
  teamPlace: string;
  photos: string[];
  coverPhoto?: string;
}
