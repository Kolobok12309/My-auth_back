import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '@/user';

import { IFile } from '../interfaces';

export class FileDto implements IFile {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false, type: UserDto })
  user?: UserDto;

  @ApiProperty({ required: false })
  userId?: number;
}
