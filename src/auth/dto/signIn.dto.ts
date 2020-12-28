import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ISignIn } from '../interfaces';

export class SignInDto implements ISignIn {
  @IsString()
  @ApiProperty()
  login: string;

  @IsString()
  @ApiProperty()
  password: string;
}
