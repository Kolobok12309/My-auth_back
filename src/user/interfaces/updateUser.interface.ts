import { Roles } from './user.interface';

export class IUpdateUser {
  email: string;

  role?: Roles;
}
