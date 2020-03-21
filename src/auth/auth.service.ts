import { promisify } from 'util';

import { hash, compare } from 'bcrypt';

import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { User } from '@/user/entities';

import { ISignUp, ISignIn } from './interfaces';

const asyncCompare = promisify(compare);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) { }

  async signIn({ username, password }: ISignIn): Promise<User> {
    const findedUser = await this.userService.findByLogin(username);

    const isPassRight = await asyncCompare(password, findedUser.password);

    if (isPassRight) return findedUser;
    throw new ForbiddenException('Неправильный логин или пароль');
  }

  async signUp({ username, password }: ISignUp): Promise<User> {
    return this.userService.create({ username, password });
  }
}
