export const enum Roles {
  Admin,
  Director,
  User,
}

export interface IUser {
  id?: number;

  username?: string;

  email?: string;

  password?: string;

  role?: Roles;

  groupId?: number;

  createdAt?: Date;
}
