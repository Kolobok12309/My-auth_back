import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ITokenPayload, ITokenUser } from '../interfaces';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt_refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secret',
    });
  }

  async validate({ sub, type, ...other }: ITokenPayload): Promise<ITokenUser> {
    if (type !== 'refresh') throw new UnauthorizedException();

    return { id: sub, ...other };
  }
}
