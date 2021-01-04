import { ApiProperty } from '@nestjs/swagger';

import { IFile } from '@/files/interfaces';

export class FileDto implements IFile {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: number;
}
