export interface TeamMemberModel {
  userId: string;
  name: string;
  position: keyof typeof PositionModel;
  photo: string;
  slogan: string;
  isActivated: boolean;
  createdAt: Date;
  updatedAt?: Date;
  teamRole?: keyof typeof TeamRoleModel;
}

export enum TeamRoleModel {
  CANDIDATE,
  MEMBER,
}

export enum PositionModel {
  UNIVERSAL,
  LIBERO,
  SETTER,
  HITTER,
}
