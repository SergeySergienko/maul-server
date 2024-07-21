export interface PostTeamMemberDto {
  name: string;
  position: string;
  file: Express.Multer.File;
}

export interface PostEventDto {
  date: string;
  title: string;
  description: string;
  location: string;
  teamPlace?: string;
  files?: Express.Multer.File[];
  coverPhoto?: string;
}

export interface GetParamsDto {
  id: string;
}

export interface GetQueryDto {
  limit?: string;
  sort?: 'asc' | 'desc';
  [key: string]: any;
}
