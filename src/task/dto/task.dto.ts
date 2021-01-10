import { ApiProperty } from '@nestjs/swagger';

import { FileEntity, GroupEntity, UserEntity } from '@/entities';

import { FileDto } from '@/files';
import { GroupDto } from '@/group/dto';
import { UserDto } from '@/user';

import { ITask, TaskStatus } from '../interfaces';

export class TaskDto implements ITask {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [FileDto] })
  files: FileEntity[];

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty({ type: [GroupDto] })
  group: GroupEntity;

  @ApiProperty({ required: false, type: UserDto })
  user?: UserEntity;

  @ApiProperty({ required: false })
  deadline?: Date;

  @ApiProperty({ required: false, type: UserDto })
  createdBy?: UserEntity;

  @ApiProperty()
  createdAt: Date;
}
