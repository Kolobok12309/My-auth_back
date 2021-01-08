import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '@/user';

import { IGroup } from '../interfaces';

export class GroupDto implements IGroup {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  users: UserDto[];
}
