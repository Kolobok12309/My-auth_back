import { Roles } from '@/user/interfaces';

export interface ITokenUser {
  id: number;
  role: Roles;
  username: string;
}
