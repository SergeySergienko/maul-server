import { RoleModel } from '../../models';

export type UserInputDTO = {
  email: string;
  password: string;
};

export type UserOutputDTO = {
  id: string;
  email: string;
  role: keyof typeof RoleModel;
  createdAt: Date;
  updatedAt?: Date;
  activationToken?: string;
};

export type UserUpdateDTO = {
  id: string;
  role?: keyof typeof RoleModel;
  activationToken?: string;
};

export type UserFindDTO = {
  id: string;
  email: string;
  activationToken: string;
};
