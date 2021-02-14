import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { GroupEntity } from '@/entities';
import { IMailingOptions } from '@/interfaces';
import { escapeLike } from '@/utils';

import { CreateGroupDto, UpdateGroupDto, GroupDto, SearchGroupDto, FilterGroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepo: Repository<GroupEntity>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  create({ name }: CreateGroupDto) {
    const rawGroup = this.groupRepo.create({
      name,
    });

    return this.groupRepo.save(rawGroup);
  }

  search(text: string = ''): Promise<SearchGroupDto[]> {
    return this.groupRepo.find({
      take: 10,
      select: ['id', 'name'],
      where: {
        ...text && {name: ILike(`%${escapeLike(text)}%`)},
      }
    });
  }

  findAll(page: number = 1, perPage: number = 20, {
    name,
  }: FilterGroupDto): Promise<[GroupDto[], number]> {
    return this.groupRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
      where: {
        ...name && {name: ILike(`%${escapeLike(name)}%`)},
      },
    });
  }

  findOne(id: number, relations = []) {
    return this.groupRepo.findOne(id, {
      relations,
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<GroupDto> {
    const oldGroup = await this.groupRepo.findOne(id);

    if (!oldGroup) throw new NotFoundException('Group not found');

    const saved = await this.groupRepo.save({
      id,
      ...updateGroupDto,
    });

    return {
      ...oldGroup,
      ...saved,
    };
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
    const group = await this.findOne(id, ['users']);

    if (!group) throw new NotFoundException('Group not found');

    if (this.configService.get('MAIL', 'true') === 'false') return;

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
