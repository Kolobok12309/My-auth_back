import {
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Roles, IUpdateUser } from '../interfaces';

export class UpdateUserDto implements IUpdateUser {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  groupId?: number;

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
