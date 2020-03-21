import { Roles } from './user.interface';

export interface ICreateUser {
  username: string;

  password: string;

  role?: Roles;
}
