export const enum Roles {
  Admin,
  Director,
  User,
}

export interface IUser {
  id?: number;

  username?: string;

  password?: string;

  role?: Roles;

  createdAt?: Date;
}
