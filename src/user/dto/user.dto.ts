/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line import/no-cycle
import { GroupDto } from '@/group/dto';
import { GroupEntity } from '@/entities';

import { IUser, Roles } from '../interfaces';

export class UserDto implements IUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, type: GroupDto })
  group?: GroupEntity;

  @ApiProperty({ required: false })
  groupId?: number;

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
