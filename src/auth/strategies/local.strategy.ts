import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserDto } from '@/user/dto';

import { AuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
