import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Roles, IUpdateUser } from '@/user/interfaces';

export class UpdateUserDto implements IUpdateUser {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsNumber()
  @Min(Roles.Admin)
  @Max(Roles.User)
  @ApiProperty({
    required: false,
    description: 'Role for new user',
    default: Roles.User,
  })
  role?: Roles;
}
