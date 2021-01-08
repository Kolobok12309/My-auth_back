/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';

import { IUser, Roles } from '../interfaces';

export class UserDto implements IUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  groupId: number;

  @ApiProperty({
    description: 'User role',
    enum: [Roles.Admin, Roles.Director, Roles.User],
  })
  role: Roles;

  @ApiProperty({
    description: 'Date of creating user',
  })
  createdAt: Date;
}

export class AdditionalUserInfo {
  @ApiProperty({
    description: 'Otp secret token',
  })
  otp: string;
}
