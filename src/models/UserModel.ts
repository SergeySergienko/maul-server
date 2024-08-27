export interface UserModel {
  email: string;
  password: string;
  role: keyof typeof RoleModel;
  isActivated: boolean;
  activationToken?: string;
}

export interface UserInputModel {
  email: string;
  password: string;
}

export interface UserOutputModel {
  id: string;
  email: string;
  role: keyof typeof RoleModel;
  isActivated: boolean;
  activationToken?: string;
}

export interface UserUpdateModel {
  id: string;
  role: keyof typeof RoleModel;
}

export enum RoleModel {
  USER,
  MEMBER,
  ADMIN,
  OWNER,
}
