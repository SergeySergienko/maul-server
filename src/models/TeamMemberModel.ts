export interface TeamMemberModel {
  userId: string;
  name: string;
  position: keyof typeof PositionModel;
  photo: string;
  slogan: string;
  status: keyof typeof StatusModel;
  createdAt: Date;
  updatedAt?: Date;
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
