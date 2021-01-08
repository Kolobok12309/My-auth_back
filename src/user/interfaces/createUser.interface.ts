import { Roles } from './user.interface';

export interface ICreateUser {
  username: string;

  email: string;

  groupId?: number;

  password: string;

  role?: Roles;
}
