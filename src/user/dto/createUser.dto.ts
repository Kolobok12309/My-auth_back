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
  @ApiProperty({
    description: 'Username for new user',
  })
  username: string;

  @IsString()
  @Length(PASS_MIN_LENGTH)
  @ApiProperty({
    description: 'Password for new user'
  })
  password: string;

  @IsOptional()
  @IsNumber()
  @Min(Roles.Root)
  @Max(Roles.User)
  @ApiProperty({
    required: false,
    description: 'Role for new user',
    default: Roles.User,
  })
  role?: Roles;
}
