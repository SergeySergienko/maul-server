export interface UserModel {
  email: string;
  password: string;
  role: keyof typeof RoleModel;
  createdAt: Date;
  updatedAt?: Date;
  activationToken?: string;
}

export enum RoleModel {
  USER,
  ADMIN,
  OWNER,
}
