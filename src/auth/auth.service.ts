import { promisify } from 'util';

import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { UserService } from '@/user/user.service';
import { UserDto } from '@/user/dto';

import { ISignUp, ISignIn } from './interfaces';

const asyncCompare = promisify(compare);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

  async signIn(user: UserDto) {
    const payload = { username: user.username, sub: user.id };

    const access_token = this.jwtService.sign({ ...payload, type: 'access' });
    const refresh_token = this.jwtService.sign({ ...payload, type: 'refresh' }, { expiresIn: '7d' });
    const cookie_token = this.jwtService.sign({ ...payload, type: 'cookie' });

    return {
      access_token,
      refresh_token,
      cookie_token,
    };
  }

  async signUp({ username, password }: ISignUp): Promise<UserDto> {
    return this.userService.create({ username, password });
  }
}
