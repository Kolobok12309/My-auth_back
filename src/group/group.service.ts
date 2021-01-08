import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GroupEntity } from '@/entities';

import { CreateGroupDto, UpdateGroupDto, GroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepo: Repository<GroupEntity>
  ) {}

  create({ name }: CreateGroupDto) {
    const rawGroup = this.groupRepo.create({
      name,
    });

    return this.groupRepo.save(rawGroup);
  }

  findAll(page: number = 1, perPage: number = 20): Promise<[GroupDto[], number]> {
    return this.groupRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  findOne(id: number) {
    return this.groupRepo.findOne(id, {
      relations: ['users'],
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
