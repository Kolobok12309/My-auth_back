import {
  Length,
  IsString,
  IsEmail,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  PASS_MIN_LENGTH
} from '@/user/user.consts';

import { ICreateUser } from '@/user/interfaces';

export class SignUpDto implements ICreateUser {
  @IsString()
  @Length(LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH)
  @ApiProperty({
    minLength: LOGIN_MIN_LENGTH,
    maxLength: LOGIN_MAX_LENGTH,
  })
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(PASS_MIN_LENGTH)
  @ApiProperty({
    minLength: PASS_MIN_LENGTH
  })
  password: string;
}
