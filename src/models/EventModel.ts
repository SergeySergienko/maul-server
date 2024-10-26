export interface EventModel {
  date: string; // yyyy-mm-dd
  title: string;
  description: string;
  location: string;
  photos: string[];
  teamPlace?: string;
  coverPhoto?: string;
  createdAt: Date;
  updatedAt?: Date;
  protected?: boolean;
}
