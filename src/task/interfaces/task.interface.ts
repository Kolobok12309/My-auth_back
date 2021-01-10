import { FileEntity, GroupEntity, UserEntity } from '@/entities';

import { TaskStatus } from './taskStatus.interface';

export interface ITask {
  id: number;

  title: string;

  description: string;

  files: FileEntity[];

  status: TaskStatus;

  group: GroupEntity;

  user?: UserEntity;

  deadline?: Date;

  createdBy?: UserEntity;

  createdAt: Date;
}
