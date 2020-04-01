import {
  ExecutionContext,
  Injectable,
  CanActivate,
  RequestMethod,
} from '@nestjs/common';
import { METHOD_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport';

import { JwtGuard } from './jwt.guard';

const MixinGuard = AuthGuard(['jwt_cookie', 'jwt']);

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext) {
    const method = this.reflector.get<RequestMethod>(
      METHOD_METADATA,
      context.getHandler(),
    );

    let authGuard: CanActivate;

    switch (method) {
      case RequestMethod.GET:
        authGuard = new MixinGuard();
        break;
      default:
        authGuard = new JwtGuard();
        break;
    }

    return authGuard.canActivate(context);
  }
}
