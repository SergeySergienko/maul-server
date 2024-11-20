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
};

export type UserUpdateDTO = {
  id: string;
  role?: Exclude<keyof typeof RoleModel, 'OWNER'>;
  activationToken?: string;
};

export type UserFindDTO = {
  id: string;
  email: string;
  activationToken: string;
};

export type UsersFindDTO = {
  limit?: string;
  sort?: 'asc' | 'desc';
  role?: keyof typeof RoleModel;
};
