import { Roles } from '@/user';

export interface ITokenPayload {
  id: number;
  role: Roles;
  username: string;
  type: 'refresh' | 'access';
}
