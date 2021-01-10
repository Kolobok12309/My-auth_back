import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity, TaskEntity, UserEntity } from '@/entities';

import { CreateTaskDto, UpdateTaskDto, TaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  create(createTaskDto: CreateTaskDto, userId: number): Promise<TaskEntity> {
    const { fileIds, ...dto } = createTaskDto;

    const files = fileIds.map(id => new FileEntity(id));
    const createdBy = new UserEntity(userId);

    return this.taskRepo.save({
      ...dto,
      files,
      createdBy,
    });
  }

  findAll(page: number = 1, perPage: number = 20): Promise<[TaskDto[], number]> {
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

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
