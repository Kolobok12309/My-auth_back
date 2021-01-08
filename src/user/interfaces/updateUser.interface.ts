import { Roles } from './user.interface';

export class IUpdateUser {
  email?: string;

  groupId?: number;

  role?: Roles;
}
