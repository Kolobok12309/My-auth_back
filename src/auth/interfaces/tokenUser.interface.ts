import { Roles } from '@/user';

export interface ITokenUser {
  id: number;
  role: Roles;
  username: string;
}
