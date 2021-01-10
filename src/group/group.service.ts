import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

import { GroupEntity } from '@/entities';
import { IMailingOptions } from '@/interfaces';

import { CreateGroupDto, UpdateGroupDto, GroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepo: Repository<GroupEntity>,
    private readonly mailerService: MailerService,
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

  async update(id: number, { name }: UpdateGroupDto): Promise<GroupDto> {
    const oldGroup = await this.groupRepo.findOne(id);

    if (!oldGroup) throw new NotFoundException('Group not found');

    return this.groupRepo.save({
      id,
      name,
    });
  }

  async remove(id: number) {
    const { affected } = await this.groupRepo.delete(id);

    if (!affected) throw new NotFoundException('Group not found');

    return true;
  }

  async mailing(id: number, {
    template,
    subject,
    context = {},
  }: IMailingOptions) {
    const group = await this.findOne(id);

    if (!group) throw new NotFoundException('Group not found');

    await Promise.all(group.users.map(user =>
      this
        .mailerService
        .sendMail({
          to: user.email,
          subject,
          template,
          context: {
            user,
            ...context,
          },
        })
        .catch(err => {
          console.error(err);

          throw new InternalServerErrorException('Error while group mailing');
        })
    ));
  }
}
