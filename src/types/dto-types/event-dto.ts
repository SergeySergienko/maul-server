export type EventInputDTO = {
  date: string;
  title: string;
  description: string;
  location: string;
  photos: Express.Multer.File[];
  teamPlace?: string;
  coverPhoto?: string;
};

export type EventOutputDTO = {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  photos: string[];
  teamPlace?: string;
  coverPhoto?: string;
};
