import { promisify } from 'util';

import { compare } from 'bcrypt';

import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { UserDto } from '@/user/dto';

import { ISignUp, ISignIn } from './interfaces';

const asyncCompare = promisify(compare);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser({
    username,
    password: inPassword,
  }: ISignIn): Promise<UserDto | null> {
    try {
      const user = await this.userService.findByLogin(username);

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

  async signIn({ username, password }: ISignIn): Promise<UserDto | null> {
    const user = await this.validateUser({ username, password });

    if (!user) throw new ForbiddenException('Неправильный логин или пароль');

    return user;
  }

  async signUp({ username, password }: ISignUp): Promise<UserDto> {
    return this.userService.create({ username, password });
  }
}
