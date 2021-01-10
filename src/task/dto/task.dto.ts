import { ApiProperty } from '@nestjs/swagger';

import { FileEntity, UserEntity } from '@/entities';

import { ITask, TaskStatus } from '../interfaces';

export class TaskDto implements ITask {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [FileEntity] })
  files: FileEntity[];

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty({ required: false })
  deadline: Date;

  @ApiProperty()
  createdBy: UserEntity;

  @ApiProperty()
  createdAt: Date;
}
