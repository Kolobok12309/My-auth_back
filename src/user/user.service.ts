import { promisify } from 'util';

import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from '@/entities';

import { SALT_ROUNDS } from './user.consts';
import { ICreateUser, Roles } from './interfaces';
import { UserDto } from './dto';

const asyncHash = promisify(hash);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  findAll(page: number = 1, perPage: number = 20): Promise<[UserDto[], number]> {
    return this.userRepo.findAndCount({
      take: perPage,
      skip: perPage * (page - 1),
    });
  }

  async findById(id: number): Promise<UserDto> {
    return this.userRepo.findOne(id, {
      relations: ['tokens'],
    });
  }

  async findByLogin(username: string): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: {
        username,
      },
      select: ['password', 'username', 'role', 'id', 'createdAt'],
    });
  }

  async create({ username, password, role = Roles.User }: ICreateUser): Promise<UserDto> {
    const hashedPass = await asyncHash(password, SALT_ROUNDS);

    const { generatedMaps } = await this.userRepo.insert({
      username,
      role,
      password: hashedPass,
    });

    return {
      username,
      role,
      ...generatedMaps[0],
    } as UserDto;
  }
}
