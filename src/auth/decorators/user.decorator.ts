import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ITokenUser } from '../interfaces';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext): ITokenUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
