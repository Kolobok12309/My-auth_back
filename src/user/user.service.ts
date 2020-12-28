import { promisify } from 'util';

import { authenticator } from 'otplib';
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

  async isUsernameAvailable(username: string): Promise<boolean> {
    return !(await this.userRepo.findOne({
      where: {
        username,
      }
    }));
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    return !(await this.userRepo.findOne({
      where: {
        email,
      }
    }));
  }

  async findById(id: number): Promise<UserDto> {
    return this.userRepo.findOne(id, {
      relations: ['tokens'],
    });
  }

  async findByLogin(login: string): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: [
        { username: login },
        { email: login },
      ],
      select: ['password', 'username', 'role', 'email', 'id', 'createdAt'],
    });
  }

  async create({ email, username, password, role = Roles.User }: ICreateUser): Promise<UserDto> {
    const hashedPass = await asyncHash(password, SALT_ROUNDS);
    const otpSecret = authenticator.generateSecret();

    const { generatedMaps } = await this.userRepo.insert({
      username,
      role,
      email,
      password: hashedPass,
      otp: otpSecret,
    });

    return {
      username,
      role,
      email,
      otp: otpSecret,
      ...generatedMaps[0],
    } as UserDto;
  }
}
