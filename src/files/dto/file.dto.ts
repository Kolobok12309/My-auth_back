import { ApiProperty } from '@nestjs/swagger';

import { IFile } from '../interfaces';

export class FileDto implements IFile {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: number;
}
