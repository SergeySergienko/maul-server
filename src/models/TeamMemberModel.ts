export interface TeamMemberModel {
  userId: string;
  name: string;
  position: keyof typeof PositionModel;
  photo: string;
  slogan: string;
  createdAt: Date;
  updatedAt?: Date;
  status?: keyof typeof Status;
}

export enum Status {
  CANDIDATE,
  MEMBER,
}

export enum PositionModel {
  UNIVERSAL,
  LIBERO,
  SETTER,
  HITTER,
}
