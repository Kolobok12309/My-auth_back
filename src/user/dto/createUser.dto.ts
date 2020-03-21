import {
  Length,
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

import { Roles, ICreateUser } from '../interfaces';
import { LOGIN_MIN_LENGTH, PASS_MIN_LENGTH } from '../user.consts';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @Length(LOGIN_MIN_LENGTH)
  username: string;

  @IsString()
  @Length(PASS_MIN_LENGTH)
  password: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(Roles.User)
  role?: Roles;
}
