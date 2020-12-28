import { promisify } from 'util';

import { compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { UserService } from '@/user/user.service';
import { UserDto } from '@/user/dto';

import { ISignIn } from '../interfaces';

const asyncCompare = promisify(compare);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async validateUser({
    login,
    password: inPassword,
  }: ISignIn): Promise<UserDto | null> {
    try {
      const user = await this.userService.findByLogin(login);

      const isPassRight = await asyncCompare(inPassword, user.password);

      if (isPassRight) {
        const { password, ...result } = user;

        return result;
      }

      return null;
    } catch (err) {
      return null;
    }
  }
}
