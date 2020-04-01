import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from '@/user/interfaces';

import { RolesGuard, JwtAuthGuard, JwtGuard } from '../guards';

export const Auth = (roles: Roles[], { strict = false } = {}) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(strict ? JwtGuard : JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
