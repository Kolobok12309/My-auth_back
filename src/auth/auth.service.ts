import { promisify } from 'util';

import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { UserService } from '@/user/user.service';
import { UserDto } from '@/user/dto';

import { ISignUp, ISignIn, ITokenUser } from './interfaces';

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

  async signIn(user: ITokenUser) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    const accessToken = this.jwtService.sign({ ...payload, type: 'access' });
    const refreshToken = this.jwtService.sign({ sub: user.id, type: 'refresh' }, { expiresIn: '7d' });
    const cookieToken = this.jwtService.sign({ ...payload, type: 'cookie' });

    return {
      accessToken,
      refreshToken,
      cookieToken,
    };
  }



  async signUp({ username, password }: ISignUp): Promise<UserDto> {
    return this.userService.create({ username, password });
  }
}
