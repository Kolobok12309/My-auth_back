export const enum Roles {
  Root,
  Admin,
  Editor,
  User,
}

export interface IUser {
  id?: number;

  username?: string;

  password?: string;

  role?: Roles;

  createdAt?: Date;
}
