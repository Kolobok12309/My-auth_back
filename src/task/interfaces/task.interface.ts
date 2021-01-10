import { FileEntity, UserEntity } from '@/entities';

import { TaskStatus } from './taskStatus.interface';

export interface ITask {
  id: number;

  title: string;

  description: string;

  files: FileEntity[];

  status: TaskStatus;

  deadline: Date;

  createdBy: UserEntity;

  createdAt: Date;
}
