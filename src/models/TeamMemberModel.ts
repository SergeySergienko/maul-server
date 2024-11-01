export interface TeamMemberModel {
  userId: string;
  name: string;
  position: keyof typeof PositionModel;
  photo: string;
  slogan: string;
  createdAt: Date;
  updatedAt?: Date;
  status?: keyof typeof StatusModel;
}

export enum StatusModel {
  CANDIDATE,
  MEMBER,
}

export enum PositionModel {
  UNIVERSAL,
  LIBERO,
  SETTER,
  HITTER,
}
