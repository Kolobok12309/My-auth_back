import { ApiProperty } from '@nestjs/swagger';

import { IUser, Roles } from '../interfaces';

export class UserDto implements IUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty({
    description: 'User role',
  })
  role: Roles;

  @ApiProperty({
    description: 'Date of creating user',
  })
  createdAt: Date;
}