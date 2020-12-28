import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from '@/user/interfaces';

import { RolesGuard, JwtGuard } from '../guards';

export const Auth = (roles: Roles[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
