import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IGroup } from '../interfaces';

export class CreateGroupDto implements Partial<IGroup> {
  @IsString()
  @ApiProperty({
    description: 'Name of group',
  })
  name: string;
}
