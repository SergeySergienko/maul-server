import { PositionModel, StatusModel } from '../../models';

export type TeamMemberInputDTO = {
  userId: string;
  name: string;
  position: keyof typeof PositionModel;
  photo: Express.Multer.File;
  slogan: string;
};

export type TeamMemberOutputDTO = {
  id: string;
  userId: string;
  name: string;
  position: keyof typeof PositionModel;
  photo: string;
  slogan: string;
  status: keyof typeof StatusModel;
  createdAt: Date;
  updatedAt?: Date;
};

export type TeamMemberStatusDTO = {
  id: string;
  status: keyof typeof StatusModel;
};

export type TeamMemberUpdateDTO = {
  id: string;
  name?: string;
  position?: keyof typeof PositionModel;
  photo?: Express.Multer.File;
  slogan?: string;
};

export type TeamMemberUpdateBdDTO = Omit<TeamMemberUpdateDTO, 'photo'> & {
  photo?: string;
};

export type TeamMemberFindDTO = {
  id: string;
  userId: string;
  name: string;
};

export type TeamMembersFindDTO = {
  limit?: string;
  sort?: 'asc' | 'desc';
  status?: keyof typeof StatusModel;
};
