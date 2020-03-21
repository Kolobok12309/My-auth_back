import {
  Length,
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Roles, ICreateUser } from '../interfaces';
import { LOGIN_MIN_LENGTH, PASS_MIN_LENGTH } from '../user.consts';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @Length(LOGIN_MIN_LENGTH)
  @ApiProperty()
  username: string;

  @IsString()
  @Length(PASS_MIN_LENGTH)
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(Roles.User)
  @ApiProperty({ required: false })
  role?: Roles;
}
