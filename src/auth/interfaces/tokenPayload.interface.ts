import { Roles } from '@/user/interfaces';

export interface ITokenPayload {
  id: number;
  role: Roles;
  username: string;
  type: 'refresh' | 'access' | 'cookie';
}
