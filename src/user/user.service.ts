import { promisify } from 'util';

import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';

import { Repository } from 'typeorm';

import User from './user.entity';
import { RegisterUserDto, SignInUserDto } from './user.dto';

import { SALT_ROUNDS } from './user.consts';

const asyncHash = promisify(hash);
const asyncCompare = promisify(compare);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async signIn({ username, password }: SignInUserDto): Promise<User> {
    const findedUser = await this.userRepo.findOne({ username });

    const isPassRight = await asyncCompare(password, findedUser.password);

    if (isPassRight) return findedUser;
    throw new ForbiddenException('Неправильный логин или пароль');
  }

  async register({ username, password }: RegisterUserDto): Promise<User> {
    const hashedPass = await asyncHash(password, SALT_ROUNDS);

    const user = {
      password: hashedPass,
      username,
    };

    const { generatedMaps } = await this.userRepo.insert(user);

    return this.userRepo.merge(new User(), user, generatedMaps[0]);
  }
}
