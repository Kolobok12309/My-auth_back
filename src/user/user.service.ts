import { promisify } from 'util';

import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SALT_ROUNDS } from './user.consts';
import { User } from './entities';
import { ICreateUser, Roles } from './interfaces';

const asyncHash = promisify(hash);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findByLogin(username: string): Promise<User> {
    return this.userRepo.findOne({ username });
  }

  async create({ username, password, role = Roles.User }: ICreateUser): Promise<User> {
    const hashedPass = await asyncHash(password, SALT_ROUNDS);
    const user: ICreateUser = {
      username,
      role,
      password: hashedPass,
    };

    const { generatedMaps } = await this.userRepo.insert(user);

    const result = this.userRepo.merge(new User(), user, generatedMaps[0]);

    return result;
  }
}
