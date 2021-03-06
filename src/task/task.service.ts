import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { FileEntity, TaskEntity } from '@/entities';
import { escapeLike } from '@/utils';

import { CreateTaskDto, FilterDto, UpdateTaskDto } from './dto';

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

  findAll(
    page: number = 1,
    perPage: number = 20,
    { title, status, userId, groupId }: FilterDto = {},
  ): Promise<[TaskEntity[], number]> {

    return this.taskRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
      where: {
        ...(status !== undefined) && {status},
        ...userId && {userId},
        ...groupId && {groupId},
        ...title && {title: ILike(`%${escapeLike(title)}%`)}
      },
    });
  }

  findOne(id: number) {
    return this.taskRepo.findOne(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { fileIds = [], ...dto } = updateTaskDto;

    const payload: Partial<TaskEntity> = {
      id,
      ...dto,
    };

    if (fileIds)
      payload.files = fileIds.map(fileId => new FileEntity(fileId));

    await this.taskRepo.save(payload);

    return this.findOne(id);
  }

  async delete(id: number) {
    const { affected } = await this.taskRepo.delete(id);

    if (!affected) throw new NotFoundException('User not found');

    return true;
  }
}
