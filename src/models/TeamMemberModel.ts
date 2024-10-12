export interface TeamMemberModel {
  userId: string;
  name: string;
  position: keyof typeof PositionModel;
  photo: string;
  slogan: string;
  isActivated: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export enum PositionModel {
  UNIVERSAL,
  LIBERO,
  SETTER,
  HITTER,
}
