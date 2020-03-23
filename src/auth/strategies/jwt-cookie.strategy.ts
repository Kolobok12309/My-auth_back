import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';

const jwtFromCookieExtractor = (cookieName = 'jwt') => (req: Request) =>
  (req && req.cookies && req.cookies[cookieName]) || null;

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, 'jwt_cookie') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: jwtFromCookieExtractor('jwt'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secret',
    });
  }

  async validate({ username, sub, type }: any) {
    if (type !== 'cookie') throw new UnauthorizedException();

    return { id: sub, username, type };
  }
}
