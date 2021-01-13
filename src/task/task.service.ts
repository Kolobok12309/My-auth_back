import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity, TaskEntity } from '@/entities';

import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto, createdById: number): Promise<TaskEntity> {
    const { fileIds = [], ...dto } = createTaskDto;

    const files = fileIds.map(id => new FileEntity(id));

    const { id } = await this.taskRepo.save({
      ...dto,
      createdById,
      files,
    });

    return this.taskRepo.findOne(id);
  }

  findAll(page: number = 1, perPage: number = 20): Promise<[TaskEntity[], number]> {
    return this.taskRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  findOne(id: number) {
    return this.taskRepo.findOne(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const { fileIds = [], ...dto } = updateTaskDto;

    const payload: Partial<TaskEntity> = {
      id,
      ...dto,
    };

    if (fileIds)
      payload.files = fileIds.map(fileId => new FileEntity(fileId));

    return this.taskRepo.save(payload);
  }

  async delete(id: number) {
    const { affected } = await this.taskRepo.delete(id);

    if (!affected) throw new NotFoundException('User not found');

    return true;
  }
}
