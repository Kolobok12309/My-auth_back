import { Roles } from '@/user/interfaces';

export interface ITokenPayload {
  sub: number;
  role: Roles;
  username: string;
  type: 'refresh' | 'access' | 'cookie';
}
