import { PositionModel, TeamRoleModel } from '../../models';

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
  createdAt: Date;
  updatedAt?: Date;
  teamRole?: keyof typeof TeamRoleModel;
};

export type TeamMemberUpdateDTO = {
  id: string;
  name?: string;
  position?: keyof typeof PositionModel;
  photo?: Express.Multer.File;
  slogan?: string;
  teamRole?: keyof typeof TeamRoleModel;
};

export type TeamMemberUpdateBdDTO = Omit<TeamMemberUpdateDTO, 'photo'> & {
  photo?: string;
};

export type TeamMemberFindDTO = {
  id: string;
  userId: string;
  name: string;
};
