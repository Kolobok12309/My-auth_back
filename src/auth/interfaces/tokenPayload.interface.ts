import { Roles } from '@/user/interfaces';

export interface ITokenPayload {
  id: number;
  role: Roles;
  username: string;
  type: 'access';
}

export interface IRefreshTokenPayload {
  id: number;
  type: 'refresh';
}
