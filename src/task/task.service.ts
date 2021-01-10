import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity, TaskEntity, UserEntity, GroupEntity } from '@/entities';

import { CreateTaskDto, UpdateTaskDto, TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  create(createTaskDto: CreateTaskDto, createdById: number): Promise<TaskEntity> {
    const { fileIds, groupId, userId, ...dto } = createTaskDto;

    const files = fileIds.map(id => new FileEntity(id));
    const createdBy = new UserEntity(createdById);
    const group = new GroupEntity(groupId);
    const user = userId && new UserEntity(userId) || null;

    return this.taskRepo.save({
      ...dto,
      files,
      createdBy,
      group,
      user,
    });
  }

  findAll(page: number = 1, perPage: number = 20): Promise<[TaskEntity[], number]> {
    return this.taskRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async delete(id: number) {
    const { affected } = await this.taskRepo.delete(id);

    if (!affected) throw new NotFoundException('User not found');

    return true;
  }
}
