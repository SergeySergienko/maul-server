export type PostEventDTO = {
  date: string;
  title: string;
  description: string;
  location: string;
  files?: Express.Multer.File[];
  teamPlace?: string;
  coverPhoto?: string;
};
