import {
  Length,
  IsNumber,
  Min,
  Max,
  IsString,
} from 'class-validator';

import User, { Roles } from './users.entity';

export class CreateUsersDto {
  @IsString()
  @Length(5)
  username: string;

  @IsString()
  @Length(10)
  password: string;

  @IsNumber()
  @Min(0)
  @Max(3)
  role: Roles;
}
