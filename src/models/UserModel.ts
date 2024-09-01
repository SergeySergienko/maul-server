interface BaseUserModel {
  id: string;
  email: string;
  password: string;
  role?: keyof typeof RoleModel;
  activationToken?: string;
}

export interface UserModel extends Omit<BaseUserModel, 'id'> {}

export interface UserInputModel {
  email: string;
  password: string;
}

export interface UserOutputModel extends Omit<BaseUserModel, 'password'> {}

export interface UserUpdateModel
  extends Omit<BaseUserModel, keyof UserInputModel> {}

export enum RoleModel {
  USER,
  MEMBER,
  ADMIN,
  OWNER,
}
