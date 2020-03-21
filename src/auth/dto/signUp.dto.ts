import {
  Length,
  IsString,
} from 'class-validator';

import { LOGIN_MIN_LENGTH, PASS_MIN_LENGTH } from '@/user/user.consts';

import { ApiProperty } from '@nestjs/swagger';

import { ISignUp } from '../interfaces';

export class SignUpDto implements ISignUp {
  @IsString()
  @Length(LOGIN_MIN_LENGTH)
  @ApiProperty({
    minLength: LOGIN_MIN_LENGTH,
  })
  username: string;

  @IsString()
  @Length(PASS_MIN_LENGTH)
  @ApiProperty({
    minLength: PASS_MIN_LENGTH
  })
  password: string;
}
