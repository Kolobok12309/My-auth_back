import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

const PG_DUPLICATION_CODE = '23505';

@Catch()
export class AllTypeormExceptionsFilter extends BaseExceptionFilter {
  catch(err: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (err instanceof QueryFailedError && (err as any).code === PG_DUPLICATION_CODE) {
      const status = HttpStatus.BAD_REQUEST;

      response
        .status(status)
        .json({
          statusCode: status,
          message: `Duplication error ${(err as any).detail}`
        });
    } else {
      super.catch(err, host);
    }
  }
}
