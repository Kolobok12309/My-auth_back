import { Roles } from './user.interface';

export interface ICreateUser {
  username: string;

  email: string;

  password: string;

  role?: Roles;
}
